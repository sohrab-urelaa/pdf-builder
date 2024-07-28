const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const { pdflibAddPlaceholder } = require("@signpdf/placeholder-pdf-lib");
const signpdf = require("@signpdf/signpdf").default;
const P12Signer = require("@signpdf/signer-p12").P12Signer;
const verifyPdf = require("./src/verify-pdf/index");
// Set up Express and Multer
const app = express();
const upload = multer({ dest: "uploads/" });

function verifyInput(inputData) {
    const {
        certificatePassword,
        reason,
        contactInfo,
        name,
        location,
        pdfFile,
        certificate,
    } = inputData;

    const newError = {};
    if (!reason) {
        newError.reason = "Please enter reason";
    }
    if (!contactInfo) {
        newError.contactInfo = "Please enter contact info";
    }
    if (!name) {
        newError.name = "Please enter contact name";
    }
    // if (!location) {
    //     newError.location = "Please enter location";
    // }
    if (!pdfFile || pdfFile?.length === 0) {
        newError.pdfFile = "Please choose pdf for signing";
    }
    if (!certificate || certificate?.length === 0) {
        newError.certificate = "Please choose certificate for signing";
    }
    return {
        isValid: Object.keys(newError).length === 0,
        errors: newError,
    };
}

// Endpoint to sign a PDF
app.post(
    "/sign-pdf",
    upload.fields([
        { name: "pdfFile", maxCount: 1 },
        { name: "certificate", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { pdfFile, certificate } = req.files;
            const certificatePassword = req.body.password || "";
            const reason = req.body.reason;
            const contactInfo = req.body.contactInfo;
            const name = req.body.name;
            const location = req.body.location;

            const { isValid, errors } = verifyInput({
                pdfFile,
                certificate,
                certificatePassword,
                reason,
                contactInfo,
                name,
                location,
            });

            if (!isValid) {
                return res.status(203).json({
                    success: false,
                    message: "Validation Failed",
                    errors: errors,
                });
            }
            console.log("Data is valid signing pdf");

            // Read the files
            const pdfBuffer = fs.readFileSync(pdfFile[0].path);
            const certificateBuffer = fs.readFileSync(certificate[0].path);

            // Create a signer with the P12 certificate and password
            const signer = new P12Signer(certificateBuffer, {
                passphrase: certificatePassword,
            });

            // Load the document into PDF-LIB
            const pdfDoc = await PDFDocument.load(pdfBuffer);

            // Add a placeholder for a signature
            pdflibAddPlaceholder({
                pdfDoc: pdfDoc,
                reason: reason,
                contactInfo: contactInfo,
                name: name,
                location: location,
            });

            // Get the modified PDFDocument bytes
            const pdfWithPlaceholderBytes = await pdfDoc.save();

            // Sign the document
            const signedPdf = await signpdf.sign(
                pdfWithPlaceholderBytes,
                signer
            );
            console.log("File signed successfully.");
            // Send the signed PDF as a response
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=signed.pdf",
            });
            res.status(200).send(signedPdf);
        } catch (error) {
            console.error("Error signing PDF:", error);
            res.status(500).send("An error occurred while signing the PDF.");
        } finally {
            // Clean up uploaded files
            if (req.files) {
                Object.values(req.files).forEach((fileArray) => {
                    fileArray.forEach((file) => fs.unlinkSync(file.path));
                });
            }
        }
    }
);

app.post("/check-signature", upload.single("pdfFile"), async (req, res) => {
    try {
        // Read the uploaded PDF file
        const pdfBuffer = fs.readFileSync(req.file.path);

        const result = verifyPdf(pdfBuffer);
        res.json({ result, isSigned: true });
    } catch (error) {
        if (error.type === "TYPE_PARSE") {
        }
        res.status(200).json({
            message: "Certification parsing failed",
            isSigned: false,
        });
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
