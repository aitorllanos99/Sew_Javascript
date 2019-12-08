"use strict";

class MoneyTransform {
    constructor() {
        this.map = new Map();
    }

    showData() {
        let div = $("#print");
        div.empty();
        this.loadData();
    }

    loadData() {
        $.ajax({
            dataType: "json",
            url: 'https://api.exchangeratesapi.io/latest',
            method: 'GET',
            success: (datos) => {
                for (let res in datos.rates) {
                    this.map.set("" + res, datos.rates[res]);
                }
                const printer = $("#print");
                printer.append("<table>");
                this.addTable();
                printer.append("</table>");
            },
            error: function () {
                alert("Money Json was unable to be obtained");
            }
        });
    }

    addTable() {
        const clave = Array.from(this.map.keys());
        let table = $("table");
        table.append("<th scope='col' id='Dato'>Moneda Acronimo</th>");
        table.append("<th scope='col' id='Valor'>Valor</th>");
        for (let param in clave) {
            table.append("<tr>");
            table.append("<td headers='col'>" + clave[param] + "</td>");
            table.append("<td headers='col'>" + this.map.get(clave[param]) + "</td>");
            table.append("</tr>");
        }
    }
}

let money = new MoneyTransform();