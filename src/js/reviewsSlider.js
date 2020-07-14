var shownItemClass = 'reviews__item_show';
var reviewsToggles = document.querySelectorAll('.reviews__toggle');
var reviewsToggleBack = reviewsToggles[0];
var reviewsToggleNext = reviewsToggles[1];
var reviewsList = document.querySelectorAll('.reviews__item');
var reviewsListLength = reviewsList.length;
var currentItemNumber = 0;

function toggleNextHandler() {
    if (currentItemNumber < reviewsListLength - 1) {
        changeItem(reviewsList[currentItemNumber], reviewsList[++currentItemNumber]);
    }
}

function toggleBackHandler() {
    if (currentItemNumber > 0) {
        changeItem(reviewsList[currentItemNumber], reviewsList[--currentItemNumber]);
    }
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

reviewsToggleNext.addEventListener('click', toggleNextHandler);
reviewsToggleBack.addEventListener('click', toggleBackHandler);
