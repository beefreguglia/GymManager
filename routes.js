const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res){

    return res.redirect('/instructors')

})

routes.get('/instructors', function(req, res){

    return res.render("instructors/index")

})

routes.get('/instructors/create', function(req, res){

    return res.render("instructors/create")

})

routes.post('/instructors', instructors.post)

//Verbos HTTP 
//GET = Receber RESOURCE
//POST = Criar ou salvar um novo RESOURCE com dados enviados
//PUT = Atualizar um RESOURCE em um dado enviado 
//DELETE = Deletar RESOURCE existente

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.get('/members', function(req, res){

    return res.send("members")

})

module.exports = routes