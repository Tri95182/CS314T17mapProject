//From Zybooks Browser File IO
export function downloadFile(fileText, fileName, fileType) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}