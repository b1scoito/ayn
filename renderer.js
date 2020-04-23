const {
    remote,
    ipcRenderer
} = require('electron');
document.getElementById('select-dir').addEventListener('click', (event) => {
    ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
    document.getElementById('file-accs').innerHTML = path;
})
document.onreadystatechange = () => {
    if (document.readyState == "complete") init();
}

function init() {
    let window = remote.getCurrentWindow();
    const minButton = document.getElementById('min-button'),
        closeButton = document.getElementById('close-button');

    minButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.minimize();
    });

    closeButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.close();
    });
}