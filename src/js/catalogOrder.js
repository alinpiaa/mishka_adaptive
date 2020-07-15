document.addEventListener('DOMContentLoaded', function () {
    var catalogOrderButton = document.querySelector('.catalog__order-button');

    if (!catalogOrderButton) {
        return;
    }

    catalogOrderButton.addEventListener('click', function() {
        location.href = 'form.html';
    });
});