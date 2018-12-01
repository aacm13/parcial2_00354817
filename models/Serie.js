var mongoose = require('mongoose');
let Serie = new mongoose.Schema({
    id:String,
    nombre: String,
    genero:String,
    capitulos:String
});

