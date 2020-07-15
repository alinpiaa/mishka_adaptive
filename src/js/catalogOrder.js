document.addEventListener('DOMContentLoaded', function () {
    var catalogOrderButton = document.querySelector('.catalog__order-button');

    if (!catalogOrderButton) {
        return;
    }

    catalogOrderButton.addEventListener('click', function() {
        window.location.href = 'form.html';
    });
});