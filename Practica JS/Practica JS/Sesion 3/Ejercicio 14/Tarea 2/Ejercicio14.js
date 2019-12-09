'use strict';

class MapaGeoJSON {
      init() {
        const file = document.getElementById("files").files[0];
        if (file.name.includes('.geoJSON')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: {lat: 43.30, lng: -5.9}
                });
                const json = JSON.parse(reader.result);
                map.data.addGeoJson(json);
            };
            reader.readAsText(file);
        } else {
            alert("Archivo con formato incorrecto");
        }
    }
}

const map = new MapaGeoJSON();
