//const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
//const app = express();
//const port = 13119;

const next = 20;
const url = 'https://www.chileautos.cl/vehiculos/autos?s=';
let linksOk = 0;
let linksError = 0;

const finLinks = (valid) => {

    if ( !valid ){
        console.log("Datos ok: " + linksOk);
        console.log("Datos error: " + linksError);
    }

};

const getDataUrl = async (page) => {

    console.log(page);
    request(url, (error, response, html) => {
        if ( response.statusCode === 200 ){
            let $ = cheerio.load(html);
            $('.listing-item__header a:not(".active")').map( (i, el) => {
                //console.log(el.attribs.href);
            });
            console.log("Fin funcionnnnnn");
            linksOk++;
            finLinks(true);
            return true;
        }else{
            console.log("Error en la web: " + page);
            linksError++;
            finLinks(false);
            return false;
        }
    });

};

const getAllUrl = async () => {

    let valid = true;
    let numPage = 0;
    while ( valid ){
        let urlTemp = url+numPage;
        console.log("Previo entrar a la funcion");
        valid = await getDataUrl(urlTemp);
        console.log(valid);
        console.log("Fin de la funcion");
        numPage=numPage+next;
        //return false;
    }

}

console.log("Inicio de app");
getAllUrl();
/*
app.get('/superonce/:year/:month', (req, res) => {
    let mes = req.params.month.toString().toLowerCase();
    let anio = parseInt(req.params.year);
    let anioMin = 2010;
    let anioMax = new Date().getFullYear();
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    if (anio >= anioMin && anio <= anioMax && meses.indexOf(mes) >= 0) {
        url = `https://www.juegosonce.es/historico-resultados-superonce-${mes}-${anio}`;
        request(url, (error, response, html) => {
            if (!error && response.statusCode === 200) {
                let combinaciones = [];
                combinaciones.push({ "year": anio, "month": mes });
                let $ = cheerio.load(html);
                let num = {};
                $("div.s11 ul").map((iM, vM) => {
                    let data = vM.parent.parent.firstChild.next.children;
                    let fecha = data[0].data.trim() + " " + data[1].firstChild.data.trim() + " " + data[2].next.firstChild.data + " " + data[4].data.split("\n")[1].trim();
                    num.numeros = vM.children.filter(a => a.type === "tag").map(v => parseInt(v.children[0].data));
                    combinaciones.push({ 'fecha': fecha, num });
                });
                res.send(JSON.stringify(combinaciones));
            }
        });
    } else {
        let error = JSON.stringify({ 'error': 400, 'detail': `Comprueba que el año es mayor o igual a ${anioMin} e inferior o igual a ${anioMax} y que el mes es correcto.` });
        res.send(error);
    }

});
app.listen(port);
console.log(`API REST SUPERONCE EN EL PUERTO....${port}`);
*/
const scrap = async() => {
    console.log('Prueba de un scraping');
};