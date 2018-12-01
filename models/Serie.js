var mongoose = require('mongosee');
let Serie = new mongoose.Schema({
    id:String,
    nombre: String,
    genero:String,
    capitulos:String
});

