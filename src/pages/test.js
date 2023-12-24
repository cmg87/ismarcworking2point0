import React from "react";

const TestPage = () => {
  const handleDownload = () => {
    // Create a dummy file URL
    const fileUrl = "https://example.com/path/to/file.pdf";

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.pdf";

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger the click event on the link
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default TestPage;
