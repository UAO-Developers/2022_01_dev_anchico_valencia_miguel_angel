function cambiarColor(nivel, nombre){

    if(nivel < 3){
        $("#" + nombre).css('background-color', 'red');
    }else {
        if(nivel >= 3 && nivel <= 4){
            $("#" + nombre).css('background-color', 'yellow');
        } else {
            $("#" + nombre).css('background-color', 'green');
        }
    }
    
}

function mostrar(){
    let url = "http://gateway.marvel.com/v1/public/characters?apikey=d019b4b65785690c06b59af2e9e41407&ts=99999&hash=d96f0dae9dd5534f04d91865a041224f";
    $.get(url, function(data, status){
        let personajes = data.data.results;
        let html = '<div class="container-fluid row">';
        personajes.forEach(element => {
            console.log(element);
            html += '<div class="col-4 contenedor"><img src="' + element.thumbnail.path +"."+ element.thumbnail.extension + '"/> <div class="nombre"><p>' + element.name + " </p></div></div>";
        });
        $("#contenido").html(html += '</div>');
    });
}

function ocultar(id){
    let html = "";

    $("#" + id).html(html);
}

function geografia(){
    let url = "https://raw.githubusercontent.com/finiterank/mapa-colombia-js/master/colombia-municipios.json";


    fetch(url).then(response => {
        return response.json().then(data => {
            let html = "";
            i = 0;
            departamentos = data.objects.depts.geometries;
            municipios = data.objects.mpios.geometries;

            departamentos.forEach(element => {
                console.log(element);
                i++;
                html += '<tr><th scope="row">' + i + '</th> <td>' + element.properties.dpt + '</td></tr>';
            });

            $("#departamentos").html(html);

            html = "";
            i = 0;
            municipios.forEach(element => {
                console.log(element);
                i++;
                html += '<tr><th scope="row">' + i + '</th> <td>' + element.properties.name + '</td> <td>' + element.properties.dpt + '</td></tr>';

            });

            $("#municipios").html(html);
        });
    });
}

$(document).ready(function(){

    fetch("../personajes.json").then(response => {
        return response.json().then(data => {
            let html = "";
            i = 0;

            data.Personajes.forEach(element => {
                console.log(element);
                i++;
                html += '<tr id="' + element.nombre + '" onclick="cambiarColor(' + element.nivel + ', ' + "'" + element.nombre + "'" +')"><th scope="row">' + i + '</th> <td>' + element.nombre + '</td> <td>' + element.apellido + '</td> <td>' + element.nivel + '</td> </tr>';

            });

            $("#personajes").append(html);
        });
    });

});
