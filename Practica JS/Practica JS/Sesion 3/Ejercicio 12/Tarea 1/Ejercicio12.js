"use strict";
class Mapper {
    constructor() {
        this.map = new Map();
        this.init();
    }

    init() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.obtener.bind(this));
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

    display() {
        const main = $("main");
        main.append("<table>");
        const keys = Array.from(this.map.keys());
        main.append("<th scope='col' id='datos'>Datos</th>");
        main.append("<th scope='col' id='valor'>Valor</th>");
        for (let param in keys) {
            main.append("<tr>");
            main.append("<td headers='col'>" + keys[param] + "</td>");
            main.append("<td headers='col'>" + this.map.get(keys[param])
                + "</td>");
            main.append("</tr>");
        }
        main.append("</table>");
    }
}

const mapa = new Mapper();