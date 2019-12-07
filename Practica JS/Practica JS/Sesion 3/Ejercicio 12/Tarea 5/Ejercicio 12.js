"use strict";
class Mapper {
    constructor() {
        this.map = new Map();
        this.init();
    }

    init() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.obtener.bind(this),this.errores.bind(this));
        } else {
            alert("Map not found");
        }
    }

    obtener(posicion) {
        this.map.set('heading', posicion.coords.heading);
        this.map.set('latitude', posicion.coords.latitude);
        this.map.set('longitude', posicion.coords.longitude);
        this.map.set('speed', posicion.coords.speed);
        this.map.set('accuracy', posicion.coords.accuracy);
        this.map.set('altitude', posicion.coords.altitude);
        this.map.set('altitudeAccuracy', posicion.coords.altitudeAccuracy);
        this.display();
    }

    errores(error) {
        alert('Error: ' + error.code + ' ' + error.message);
    }

    display() {
        const localizacion = {
            lat: this.map.get("latitude"),
            lng: this.map.get("longitude")
        };
        const map = new google.maps.Map($('main')[0],
            {
                zoom: 15,
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