$(document).ready(function () {
    $('select').formSelect();
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-select'));
});

$("#btn-send").click(() => {
    
})
require('./renderer.js');