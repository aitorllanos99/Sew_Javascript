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
        const ubicacion = $('main')[0];
        const apiKey = "&key=AIzaSyBRuNZmiW1zmHrQXXVpFiGjKVopfbA-wNY";
        const url = "https://maps.googleapis.com/maps/api/staticmap?";
        const centro = "center=" + this.map.get('latitude') + "," + this.map.get('longitude');
        const zoom = "&zoom=15";
        const dimension = "&size=800x600";
        const marcador = "&markers=color:red%7Clabel:S%7C" + this.map.get('latitude') + "," + this.map.get('longitude');
        const sensor = "&sensor=false";
        const imagenMapa = url + centro + zoom + dimension + marcador
            + sensor + apiKey;
        ubicacion.innerHTML = "<img src='" + imagenMapa + "'/>";
    }
}

const mapa = new Mapper();