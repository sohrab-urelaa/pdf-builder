export const downloadPdf = async (submitted_template) => {
    try {
        const name = `${submitted_template?.parent_template?.title}-${submitted_template?.user?.name}`;
        // Fetch the PDF file
        const response = await fetch(submitted_template.templated_pdf_link);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement("a");
        a.href = url;
        a.download = name; // Set the desired file name
        document.body.appendChild(a);
        a.click();

        // Clean up the URL object and remove the link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error downloading the PDF", error);
    }
};
