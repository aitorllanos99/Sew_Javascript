"use strict";
class Meteo {
    constructor(){
        this.apikey = "c1fd90ee0f3543a5738c9e07fd41d2db";
        this.ciudad = "Oviedo";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("h2").text(JSON.stringify(datos, null, 2));

                var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>País: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";

                let div = $("div");
                div.append(stringDatos);
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }
    verJSON(){
        this.cargarDatos();
        this.ciudad = "New York";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos();

        this.ciudad = "London";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos();

        this.ciudad = "Amsterdam";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos();

        this.ciudad = "Montreal";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos();
        $("button").attr("disabled","disabled");
    }
}
var meteo = new Meteo();