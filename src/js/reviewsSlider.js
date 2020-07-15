var shownItemClass = 'reviews__item_show';

var slider = document.querySelector('.reviews__slider');
var reviewsToggles = document.querySelectorAll('.reviews__toggle');
var reviewsToggleBack = reviewsToggles[0];
var reviewsToggleNext = reviewsToggles[1];
var reviewsList = document.querySelectorAll('.reviews__item');
var reviewsListLength = reviewsList.length;
var currentItemNumber = 0;

document.addEventListener('DOMContentLoaded', function () {
    if (!slider) {
        return;
    }

    reviewsToggleNext.addEventListener('click', toggleNextHandler);
    reviewsToggleBack.addEventListener('click', toggleBackHandler);

    checkAndDisableToggles();
});

function checkAndDisableToggle(shouldEnable, toggle) {
    if (shouldEnable) {
        return enableToggle(toggle);
    }

    disableToggle(toggle);
}

function checkAndDisableToggles() {
    var shouldEnableToggleNext = nextItemExists();
    var shouldEnableToggleBack = prevItemExists();

    checkAndDisableToggle(shouldEnableToggleNext, reviewsToggleNext);
    checkAndDisableToggle(shouldEnableToggleBack, reviewsToggleBack);
}

function nextItemExists() {
    return currentItemNumber < reviewsListLength - 1;
}

function prevItemExists() {
    return currentItemNumber > 0;
}

function toggleNextHandler() {
    if (nextItemExists()) {
        currentItemNumber++;

        changeItem(reviewsList[currentItemNumber-1], reviewsList[currentItemNumber]);

        checkAndDisableToggles();
    }
}

function toggleBackHandler() {
    if (prevItemExists()) {
        currentItemNumber--;

        changeItem(reviewsList[currentItemNumber+1], reviewsList[currentItemNumber]);

        checkAndDisableToggles();
    }
}

// TODO: use it for blocking appropriate toggles
function disableToggle(toggle) {
    toggle.setAttribute('disabled', 'disabled');
}

function enableToggle(toggle) {
    toggle.removeAttribute('disabled');
}

function changeItem(prevItem, nextItem) {
    var prevOpacity = 1;
    var nextOpacity = 0;

    var timer = setInterval(function() {
        if (prevOpacity > 0) {
            prevOpacity = +(prevOpacity - 0.07).toFixed(2);
            prevItem.style.opacity = prevOpacity;
        }

        if (prevOpacity <= 0) {
            prevOpacity = 0;
            prevItem.style.opacity = prevOpacity;
            prevItem.classList.remove(shownItemClass);

            nextItem.style.opacity = nextOpacity;
            nextItem.classList.add(shownItemClass);

            if (nextOpacity < 1) {
                nextOpacity = +(nextOpacity + 0.07).toFixed(2);                
            }

            if (nextOpacity >= 1) {
                nextOpacity = 1;
                nextItem.style.opacity = nextOpacity;

                clearInterval(timer);
            }

            return;
        }
    }, 20);
}
