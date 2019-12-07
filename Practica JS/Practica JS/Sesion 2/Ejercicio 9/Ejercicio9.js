"use strict";

class WeatherReciver {
    constructor() {
        this.udm = "&units=metric";
        this.language = "&lang=es";
        this.apikey = "c1fd90ee0f3543a5738c9e07fd41d2db";
        this.map = new Map();
    }

    showData() {
        let div = $("#aitor");
        this.city = "New York";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
        div.empty();
        div.append("<table>");
        $("table").append("<th scope=\"col\" id=\"parametro\">Parámetro</th>");
        $("table").append("<th scope=\"col\" id=\"valor\">Valor</th>");
        var keys = Array.from(this.map.keys());
        for (var parametro in keys) {
            this.añadirTabla(keys[parametro]);
        }
        div.append("</table>");
        // this.city = "Chicago";
        // this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
        //     + this.udm + this.language + "&APPID=" + this.apikey;
        // this.loadData();
        // div.empty();
        // div.append("<table>");
        // $("table").append("<th scope=\"col\" id=\"parametro\">Parámetro</th>");
        // $("table").append("<th scope=\"col\" id=\"valor\">Valor</th>");
        // var keys = Array.from(this.map.keys());
        // for (var parametro in keys) {
        //     this.añadirTabla(keys[parametro]);
        // }
        // div.append("</table>");
        // this.city = "Montreal";
        // this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
        //     + this.udm + this.language + "&APPID=" + this.apikey;
        // this.loadData();
        // div.empty();
        // div.append("<table>");
        // $("table").append("<th scope=\"col\" id=\"parametro\">Parámetro</th>");
        // $("table").append("<th scope=\"col\" id=\"valor\">Valor</th>");
        // var keys = Array.from(this.map.keys());
        // for (var parametro in keys) {
        //     this.añadirTabla(keys[parametro]);
        // }
        // div.append("</table>");
        // this.city = "London";
        // this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
        //     + this.udm + this.language + "&APPID=" + this.apikey;
        // this.loadData();
        // div.empty();
        // div.append("<table>");
        // $("table").append("<th scope=\"col\" id=\"parametro\">Parámetro</th>");
        // $("table").append("<th scope=\"col\" id=\"valor\">Valor</th>");
        // var keys = Array.from(this.map.keys());
        // for (var parametro in keys) {
        //     this.añadirTabla(keys[parametro]);
        // }
        // div.append("</table>");
        // this.city = "Amsterdam";
        // this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
        //     + this.udm + this.language + "&APPID=" + this.apikey;
        // this.loadData();
        // div.empty();
        // div.append("<table>");
        // $("table").append("<th scope=\"col\" id=\"parametro\">Parámetro</th>");
        // $("table").append("<th scope=\"col\" id=\"valor\">Valor</th>");
        // var keys = Array.from(this.map.keys());
        // for (var parametro in keys) {
        //     this.añadirTabla(keys[parametro]);
        // }
        // div.append("</table>");
    }

    loadData() {
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                div.append("<h3>XML recibido</h3>");
                div.append("<p id='xml'></p>");
                $("#xml").text((new XMLSerializer()).serializeToString(datos));
                tiempo.map.set("Total de Nodos", $('*', datos).length);
                tiempo.map.set("Ciudad", $('city', datos).attr("name"));
                tiempo.map.set("Longitud", $('coord', datos).attr("lon"));
                tiempo.map.set("Latitud", $('coord', datos).attr("lat"));
                tiempo.map.set("País", $('country', datos).text());
                var amanecer = $('sun', datos).attr("rise");
                var minutosZonaHoraria = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970 = Date.parse(amanecer);
                amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                tiempo.map.set("Amanece a las", (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES"));
                var oscurecer = $('sun', datos).attr("set");
                var oscurecerMiliSeg1970 = Date.parse(oscurecer);
                oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                tiempo.map.set("Oscurece a las", (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES"));
                tiempo.map.set("Temperatura", $('temperature', datos).attr("value") + " ºC");
                tiempo.map.set("Temperatura mínima", $('temperature', datos).attr("min") + " ºC");
                tiempo.map.set("Temperatura máxima", $('temperature', datos).attr("max") + " ºC");
                tiempo.map.set("Temperatura (unidades)", $('temperature', datos).attr("unit"));
                tiempo.map.set("Humedad", $('humidity', datos).attr("value") + " " + $('humidity', datos).attr("unit"));
                tiempo.map.set("Presión", $('pressure', datos).attr("value") + " " + $('pressure', datos).attr("unit"));
                tiempo.map.set("Velocidad del viento", $('speed', datos).attr("value") + " m/s");
                tiempo.map.set("Nombre del viento", $('speed', datos).attr("name"));
                tiempo.map.set("Dirección del viento", $('direction', datos).attr("value") + "º");
                tiempo.map.set(">Código del viento", $('direction', datos).attr("code"));
                tiempo.map.set("Nombre del viento", $('direction', datos).attr("name"));
                tiempo.map.set("Nubosidad", $('clouds', datos).attr("value"));
                tiempo.map.set("Nombre nubosidad", $('clouds', datos).attr("name"));
                tiempo.map.set("Visibilidad", $('visibility', datos).attr("value") + " m");
                tiempo.map.set("Precipitación valor", $('precipitation', datos).attr("value"));
                tiempo.map.set("Precipitación modo", $('precipitation', datos).attr("mode"));
                tiempo.map.set("Descripción", $('weather', datos).attr("value"));
                var horaMedida = $('lastupdate', datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                tiempo.map.set("Hora de la medida", (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES"));
                tiempo.map.set("Fecha de la medida", (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES"));
            },
            error: function () {
                alert("JSon not recived, look console");
            }
        });
    }


}

let weatherGetter = new WeatherReciver();