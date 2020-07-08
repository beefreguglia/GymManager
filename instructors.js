const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

//show

exports.show = function (req, res) {

    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {

        return instructor.id == id

    })

    if (!foundInstructor) {

        return res.send("Instructor not found")

    }

    const instructor = {

        //Espalhando o foundInstructor
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)


    }

    return res.render('instructors/show', { instructor })

}

//Funcoes para create

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {

        if (req.body[key] == "") {

            return res.send('Por favor, preencha todos os campos')

        }

    }

    //Desestruturando o req.body
    let { avatar_url, birth, name, services, gender } = req.body

    //Transforma data para ms
    birth = Date.parse(req.body.birth)

    //pega ms de aqora
    const created_at = Date.now()

    //criando ID
    const id = Number(data.instructors.length + 1)

    //Array vazio, com o push adiciona um objeto no array
    data.instructors.push({

        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at

    })

    //Criando arquivo de dados passando caminho, transformando o objeto pra json com json.stringfy e a função callback
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) {

            return res.send("Write Error")

        }

        return res.redirect("/instructors")

    })

    //return res.send(req.body)

}

//Funcoes para update

exports.edit = function (req, res) {

    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {

        return instructor.id == id

    })

    if (!foundInstructor) {

        return res.send("Instructor not found")

    }

    const instructor  = {

        ...foundInstructor,
        birth: date(foundInstructor.birth)

    }

    return res.render('instructors/edit', {instructor})

}

//funcoes para delete