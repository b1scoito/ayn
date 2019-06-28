$(document).ready(function () {
    $('select').formSelect();
    $('.tabs').tabs();
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
    var elem = document.getElementById("server-address");
    elem.onmousemove = e => {
        var leave = () => {
            elem.removeEventListener("mouseleave", leave);
            box.style.display = "none";
        };
        var box = document.getElementById('hover-box');
        box.style.left = e.clientX + 10 + "px";
        box.style.top = e.clientY + 10 + "px";
        box.style.display = "block";
        setTimeout(() => elem.addEventListener("mouseleave", leave), 0);
    };
});

$("#btn-send").click(() => {
    var elem = document.getElementById("mc-versions");
    var instance = M.FormSelect.getInstance(elem);
    M.toast({html: instance.dropdown.dropdownEl.getElementsByClassName("selected")[0].textContent})
})
require('./renderer.js'); // didn't need that lopol