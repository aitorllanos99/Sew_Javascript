"use strict";
class Mapper {
    constructor() {
        this.map = new Map();
        this.init();
    }

    init() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.display.bind(this),this.errores.bind(this));
        } else {
            alert("Map not found");
        }
    }

    errores(error) {
        alert('Error: ' + error.code + ' ' + error.message);
    }

    display() {
        const localizacion = {
            lat: 43.362114,
            lng: -5.847994
        };
        const map = new google.maps.Map($('main')[0],
            {
                zoom: 17,
                center: localizacion
            }
        );
        const marker = new google.maps.Marker({
            position: localizacion,
            map: map
        });
    }
}

const mapa = new Mapper();