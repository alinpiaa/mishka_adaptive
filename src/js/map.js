document.addEventListener('DOMContentLoaded', function () {
    var mapJS = document.querySelector('#map');

    if (!mapJS) {
        console.error('A container for Yandex Maps was not attached.');

        return;
    }

    var mapStatic = document.querySelector('.contacts__map_no-js');    
    var hiddenClass = 'contacts__map_hidden';
  
    try {
        ymaps.ready(init); // eslint-disable-line no-undef
    } catch (e) {
        console.error('Yandex Maps script is not connected.');
        
        return;
    }

    mapJS.classList.remove(hiddenClass);
    mapStatic.classList.add(hiddenClass);
  
    var map;
  
    function init() {
        map = new ymaps.Map('map', { // eslint-disable-line no-undef
            center: [59.9387165, 30.32318739999995],
            zoom: 18,
            controls: []
        });
        
        var placemark = new ymaps.Placemark([59.9387165, 30.32304739999995], {}, { // eslint-disable-line no-undef
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-map-pin.svg',
            iconImageSize: [67, 100]
        });

        map.geoObjects.add(placemark);
    }
});
  