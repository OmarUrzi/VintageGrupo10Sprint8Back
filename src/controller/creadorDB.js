const path = require('path');
const DB = require('../database/models');
const sequelize = DB.sequelize;
const { Op } = require("sequelize");
const { nextTick } = require('process');



let colorsArray = ["Lavanda",
"Blanco",
"Negro",
"Amarillo",
"Marron",
"Chocolate",
"Verde",
"Rosa",
"Azul",
"Naranja",
"Violeta"]

let categoriesArray = [
"Buzo",
"Remera",
"Pantalon",
"Cartera",
"Zapatilla",
"Calza",
"Top",
"Vestido",
"Traje de baño",
"Medias",
"Campera",
"Pijama",
"Traje",
"Conjunto"
]

let brandsArray = [
"Nike",
"Gucci",
"Adidas",
"Louis Vuitton",
"Cartier",
"Zara",
"H&M",
"Chanel"
]

let sizesArray = [
"XS",
"S",
"M",
"L",
"XL",
"XXL",
"XXXL",
30,
30.5,
31,
31.5,
32,
32.5,
33,
33.5,
34,
34.5,
35,
35.5,
36,
36.5,
37,
37.5,
38,
38.5,
39,
39.5,
40,
40.5,
41,
41.5,
42,
42.5,
43,
43.5,
44
]

async function color (e){
    for(let i = 0 ; i < e.length; i++){
        let colorCreate = await DB.Color.create({
            name:e[i]
        })
    }
};
async function categories (e){
    for(let i = 0 ; i < e.length; i++){
        let colorCreate = await DB.Category.create({
            name: e[i]
        })
    }
};
async function brands (e){
    for(let i = 0 ; i < e.length; i++){
        let colorCreate = await DB.Brand.create({
            name: e[i]
        })
    }
};
async function sizes (e){
    for(let i = 0 ; i < e.length; i++){
        let colorCreate = await DB.Size.create({
            name: e[i]
        })
    }
};

color(colorsArray);

categories(categoriesArray);

brands(brandsArray);

sizes(sizesArray);






