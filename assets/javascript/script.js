function veryImportant(cb) {
    var input = '';
    var key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
        input += ('' + e.keyCode);
        if (input === key) {
            return cb();
        }
        if (!key.indexOf(input)) return;
        input = ('' + e.keyCode);
    });
}

var audio = new Audio('assets/sounds/secret.mp3');

//  This will prevent functions from running before all scripts are loaded
$(document).ready(function () {
    $('.modal').modal();
    veryImportant(function () {
        // $('#very-important-modal').modal('open')
        audio.play();
    });
});
