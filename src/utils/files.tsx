export function downloadFile(blob: Blob, fileName: string) {
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = fileName;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    // Remove link from body
    document.body.removeChild(link);
}

export function bufferToBase64(data: ArrayBuffer | SharedArrayBuffer) {
    return 'data:image/png;base64, ' + Buffer.from(data).toString('base64');
}
