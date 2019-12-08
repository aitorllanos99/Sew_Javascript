'use strict';

class KmlMapper {
    constructor() {
    }

    init() {
        const file = this.files = document.getElementById('files').files[0];
        if (file.name.includes('.kml')) {
            const reader = new FileReader();
            reader.onload = () => {
                const map = new google.maps.Map(document.getElementById('mapSection'), {
                    zoom: 12,
                });
                const geoXml = new geoXML3.parser({map: map});
                geoXml.parseKmlString(reader.result);
            };
            reader.readAsText(file);
        } else {
            alert("An error stopped the app: check the file");
        }
    }
}

const map = new KmlMapper();
