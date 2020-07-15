
document.addEventListener('DOMContentLoaded', function () {
    var menu = document.querySelector('.menu');
    var menuButton = document.querySelector('.menu__btn');

    menu.classList.remove('menu_no-js');
    document.body.classList.remove('no-js');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('menu_opened');
    });
});
