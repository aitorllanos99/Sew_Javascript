"use strict";

class WeatherReciver {
    constructor() {
        this.udm = "&units=metric";
        this.language = "&lang=es";
        this.apikey = "c1fd90ee0f3543a5738c9e07fd41d2db";
    }

    showData() {
        let div = $("#aitor");
        div.empty();
        this.city = "New York";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
        this.city = "Chicago";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
        this.city = "Montreal";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
        this.city = "London";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
        this.city = "Amsterdam";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.city
            + this.udm + this.language + "&APPID=" + this.apikey;
        this.loadData();
    }

    loadData() {
        $.ajax({
            url: this.url,
            method: 'GET',
            dataType: "json",
            success: (jsonRecived) => {
                var map = new Map();
                let div = $("div");
                div.prepend("<p>" + JSON.stringify(jsonRecived, null, 2) + "</p>");
                div.prepend("<h3>Json Values Recived</h3>");
                map.set("City", jsonRecived.name);
                map.set("Country", jsonRecived.sys.country);
                map.set("Latitud", jsonRecived.coord.lat);
                map.set("Temperature", jsonRecived.main.temp + " ºC");
                map.set("Max Temperature", jsonRecived.main.temp_max + " ºC");
                map.set("Min Temperature", jsonRecived.main.temp_min + " ºC");
                map.set("Wind direction", jsonRecived.wind.deg + "º");
                map.set("Wind velocity", jsonRecived.wind.speed + " m/s");
                map.set("Hour", new Date(jsonRecived.dt * 1000).toLocaleTimeString());
                map.set("Date", new Date(jsonRecived.dt * 1000).toLocaleDateString());
                map.set("Sun rises", new Date(jsonRecived.sys.sunrise * 1000).toLocaleTimeString());
                map.set("Sun fades", new Date(jsonRecived.sys.sunset * 1000).toLocaleTimeString());
                map.set("Description", jsonRecived.weather[0].description);
                map.set("Visibility", jsonRecived.visibility + " m");
                map.set("Nubosity", jsonRecived.clouds.all);
                map.set("Pressure", jsonRecived.main.pressure + " milibares");
                map.set("Humidity", jsonRecived.main.humidity + " %");
                div.append("<table>");
                this.createTable(map);
                div.append("</table>");
            },
            error: function () {
                alert("JSon not recived, look console");
            }
        });
    }

    createTable(map) {
        let table = $("table");
        table.append("<th scope=\"col\" id=\"Datos\">Data</th>");
        table.append("<th scope=\"col\" id=\"Contenido\">Content</th>");
        let values = Array.from(map.keys());
        for (let param in values) {
            table.append("<tr>");
            table.append("<td headers=\"column\">" + values[param] + "</td>");
            table.append("<td headers=\"column\">" + map.get(values[param]) + "</td>");
            table.append("</tr>");
        }

    }
}

let weatherGetter = new WeatherReciver();