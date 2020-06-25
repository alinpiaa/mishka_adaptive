var addToCartModal = document.querySelector('.modal_add-to-cart');
var addToCartTriggers = document.querySelectorAll('.modal_add-to-cart-trigger');

function setAddToCartListener() {
    for (var i=0; i<addToCartTriggers.length; i++) {
        addToCartTriggers[i].addEventListener('click', function(e) {
            e.preventDefault();
            return openModal(addToCartModal);
        });
    }
}

function closeModal(modal) {
    modal.classList.remove('modal_show');
}

function openModal(modal) {
    modal.classList.add('modal_show');
}

function handleKeyEvent(e) {
    var key = 'Escape';
    var deprecatedKeyCode = 27;
    var isEscape = false;

    if (e.key && (e.key === key)) {
        isEscape = true;
    } else {
        isEscape = !!(e.keyCode && (e.keyCode === deprecatedKeyCode)); 
    }

    isEscape && processEscape(e);
}

function handleMouseEvent(e) {
    if (!(e.target.classList.contains('modal'))) {
        return;
    }
    
    return closeModal(e.target);
}

function processEscape(e) {
    var openedModal = document.querySelector('.modal.modal_show');

    if (openedModal) {
        e.preventDefault();
        closeModal(openedModal);
    }
}

function setListeners() {
    window.addEventListener('keydown', handleKeyEvent);

    document.body.addEventListener('click', function(e) {
        handleMouseEvent(e);
    });

    setAddToCartListener();
}

setListeners();

