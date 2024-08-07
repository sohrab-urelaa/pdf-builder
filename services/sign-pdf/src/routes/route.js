const { Router } = require("express");
const controller = require("../controller/controller");
const router = Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
    "/sign-pdf",
    upload.fields([
        { name: "pdfFile", maxCount: 1 },
        { name: "certificate", maxCount: 1 },
    ]),
    controller.signPDF
);

router.post(
    "/check-signature",
    upload.single("pdfFile"),
    controller.checkSignature
);
module.exports = router;
