//Declarando oque o servidor vai usar
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

//Declarando o servidor express
const server = express()


//Declarando Middlewares
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)

//Configurando view engine
server.set("view engine", "njk")

nunjucks.configure("views", {
    
    express: server,
    autoescape: false,
    noCache: true

})

server.listen(5000, function(){

    console.log('Server is Running')

})

//netstat -putan | grep $porta para achar o processo utilizando a porta