"use strict";

class ApiFile {
    constructor() {
        const header = $('#header');
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            header.append("<h2>Este navegador soporta el API File </h2>");
        } else {
            const body = $('#body');
            body.empty();
            header.append("<h2>Este navegador soporta el API File </h2>");
        }
        this.files = [];
    }

    processFiles() {
        this.files = $('#files')[0].files;
        $('#resultado').empty();
        this.showNumberFiles();
        this.calculateSize();
        this.showListFiles();
    }

    showNumberFiles() {
        $("#resultado").append("<p>Ficheros seleccionados: " + this.files.length + "</p>");
    }

    calculateSize() {
        let nBytes = 0;
        for (let i = 0; i < this.files.length; i++) {
            nBytes += this.files[i].size;
        }
        $("#resultado").append("<p>Tamaño total: " + nBytes + " bytes </p>");
    }

    showListFiles() {
        let content = '';
        content += "<h3>Ficheros seleccionados</h3>";
        content += "<ul id='listFile'>";
        for (let i = 0; i < this.files.length; i++) {
            this.showContentFile(this.files[i]);
        }
        content += "</ul>";
        $("#resultado").append(content)
    }

    showContentFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.showDetailsFile(file, reader.result);
        };
        reader.readAsText(file, "UTF-8");
    }

    showDetailsFile(file, content) {
        content = this.convertXML(content);
        let details = "<li>" + file.name;
        details += "<ul>";
        details += "<li>Tamaño: " + file.size + " bytes</li>";
        details += "<li>Tipo: " + file.type + "</li>";
        details += "<li>Ultima modificacion: " + file.lastModifiedDate + "</li>";
        details += "<li>Contenido:<pre>" + content + "</pre></li>";
        details += "</ul>";
        details += "</li>";
        $("#listFile").append(details);
    }

    convertXML(content) {
        content = String(content).replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        return content;
    }
}

const apiFile = new ApiFile();