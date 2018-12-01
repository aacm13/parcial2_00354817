var express = require('express'),
    router = express.Router(),
    serieModel = require('../models/Serie');

router.get('/', function (req, res){
    serieModel.find({}, function(err, series){
        if(err){
            res.status(500);
            res.json({
                status:500,
                err
            });
        }else{
            res.json(series);
        }
    });
});

router.get('/:name',function(req, res){
    if(req.params.name){
        serieModel.findOne({
            nombre:req.params.name
        }, function (err, serie){
            if(err){
                res.status(500);
                res.json({
                    status:500,
                    err
                });
            }else{
                res.json(serie);
            }
        });
    }else{
        res.status(400);
        res.json({
            status:400,
            err: 'Bad Request'
        })
    }
});
router.get('/delete/:name', function(req, res){
    if(req.params.name){
        serieModel.deleteOne({
            nombre:req.params.name
        }, function (err, serie){
            if(err){
                res.status(500);
                res.json({
                    status:500,
                    err
                });
            }else{
                res.json(serie);
            }
        });
    }else{
        res.status(400);
        res.json({
            status:400,
            err: 'Bad Request'
        })
    }
});

router.post('/:name', function(req, res){
    let Serie = new serieModel({
        id: req.body.id,
        nombre: req.body.name,
        genero: req.body.genero,
        capitulos: req.body.capitulos
    })
    Serie.save(function(err){
        if(err){
            res.status(500)
            res.send({err});
        }
        res.send({message:"saved", success:true});
    });
});

router.post('/:id', function(req, res){
    serieModel.findOneAndUpdate({
        id:req.body.id},
        {$set:{nombre:req.body.nombre, 
            genero:req.body.genero, 
            capitulos:req.body.genero
        }},
        function(err){
            if (err){
                res.status(500)
                res.send({err});
            }
            res.send({message: "update" , success:true});
    });
});

module.exports = router;