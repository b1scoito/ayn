$(document).ready(function () {
    const {ipcMain, dialog} = require('electron');
    ipcMain.on('open-file-dialog', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, (files) => {
            if (files){
                event.sender.send('selected-directory', files);
            }
        })
    });
    $('select').formSelect();
    $('#server-address').on('input', function (e) {
        var box = document.getElementById('hover-box');
        var elem = document.getElementById("server-address");
        var host = $('#server-address').val();
        if (host == "") {
            elem.onmousemove = e => {
                var leave = () => {
                    elem.removeEventListener("mouseleave", leave);
                    box.style.display = "none";
                };
                box.style.display = "none";
                elem.removeEventListener("mouseleave", leave);
            };
            return;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        if (validateip(host)) {
            $.get("http://mcapi.us/server/status?ip=" + host, async function (data) {
                if (data.status === "error" || data.online == false) {
                    elem.onmousemove = e => {
                        var leave = () => {
                            elem.removeEventListener("mouseleave", leave);
                            box.style.display = "none";
                        };
                        box.style.display = "none";
                        elem.removeEventListener("mouseleave", leave);
                    };
                    return;
                }
                await sleep(1000);
                console.log(data);
                $("#imgtwerk").attr("src", "https://mcapi.us/server/image?ip=" + host + "&theme=dark&title=Server%20Info")
                elem.onmousemove = e => {
                    var leave = () => {
                        elem.removeEventListener("mouseleave", leave);
                        box.style.display = "none";
                    };
                    $("#hover-box-motd").val = data.motd;
                    box.style.left = e.clientX + 10 + "px";
                    box.style.top = e.clientY + 10 + "px";
                    box.style.display = "block";
                    setTimeout(() => elem.addEventListener("mouseleave", leave), 0);
                };
            });
            return;
        }
    });
    $("#btn-send").click(() => {
        var elem = document.getElementById("mc-versions");
        var instance = M.FormSelect.getInstance(elem);
        M.toast({
            html: `Version: ${instance.dropdown.dropdownEl.getElementsByClassName("selected")[0].textContent} Acc Path: ${document.getElementById("arquivo-contas").files[0].path} Host: ${host} Radio: ${$("input[name='account-type']:checked").val()}`
        })
    })

    function validateip(str) {
        return /^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/gm.test(str);
    }
});
require('./renderer.js');
require('./core/core.js')