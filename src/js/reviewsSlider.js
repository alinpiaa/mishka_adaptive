var shownItemClass = 'reviews__item_show';
var reviewsToggles = document.querySelectorAll('.reviews__toggle');
var reviewsToggleBack = reviewsToggles[0];
var reviewsToggleNext = reviewsToggles[1];
var reviewsList = document.querySelectorAll('.reviews__item');
var reviewsListLength = reviewsList.length;
var currentItemNumber = 0;

function toggleNextHandler() {
    if (currentItemNumber < reviewsListLength - 1) {
        hideItem(reviewsList[currentItemNumber]);
        currentItemNumber++;
        showItem(reviewsList[currentItemNumber]);
    }
}

function toggleBackHandler() {
    if (currentItemNumber > 0) {
        hideItem(reviewsList[currentItemNumber]);
        currentItemNumber--;
        showItem(reviewsList[currentItemNumber]);
    }
}

function showItem(item) {
    item.classList.add(shownItemClass);
}

function hideItem(item) {
    item.classList.remove(shownItemClass);
}

reviewsToggleNext.addEventListener('click', toggleNextHandler);
reviewsToggleBack.addEventListener('click', toggleBackHandler);