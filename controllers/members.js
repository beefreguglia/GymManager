const fs = require('fs')
const data = require('../data.json')
const { bloodType, date } = require('../utils')

exports.index = function(req,res){

    

    return res.render("members/index", {members: data.members})

}

exports.create = function (req, res){

    return res.render('members/create')

}

exports.show = function (req, res) {

    const { id } = req.params

    const foundMember = data.members.find(function (member) {

        return member.id == id

    })

    if (!foundMember) {

        return res.send("Member not found")

    }

    const member = {

        //Espalhando o foundMember
        ...foundMember,
        blood: bloodType(foundMember.blood),
        birth: date(foundMember.birth).birthDay
       


    }

    return res.render('members/show', { member })

}

exports.edit = function (req, res) {   

    const { id } = req.params

    const foundMember = data.members.find(function (member) {

        return member.id == id

    })

    if (!foundMember) {

        return res.send("Member not found")

    }

    const member  = {

        ...foundMember,
        birth: date(foundMember.birth).iso

    }

    return res.render('members/edit', {member})

}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {

        if (req.body[key] == "") {

            return res.send('Por favor, preencha todos os campos')

        }

    }

    //Desestruturando o req.body
    let { avatar_url, birth, name, email, gender, blood, weight, height } = req.body

    //Transforma data para ms
    birth = Date.parse(req.body.birth)

    //criando ID
    let id = 1
    const lastMember = data.members[data.members.length-1]

    if(lastMember){

        id = lastMember.id + 1

    }

    //Array vazio, com o push adiciona um objeto no array
    data.members.push({

        id,
        avatar_url,
        name,
        birth,
        email,
        gender,
        blood,
        weight,
        height

    })

    //Criando arquivo de dados passando caminho, transformando o objeto pra json com json.stringfy e a função callback
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) {

            return res.send("Write Error")

        }

        return res.redirect("/members")

    })

    //return res.send(req.body)

}

exports.put = function(req, res){

    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {

        if(id == member.id){

            index = foundIndex
            return true

        }

    })

    if (!foundMember) {

        return res.send("Member not found")

    }

    const member = {

        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write error")

        }

        return res.redirect(`/members/${id}`)

    })

}

exports.delete = function(req, res){

    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){

        return member.id != id

    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write file ERROR!")

        }

        return res.redirect("/members")

    })

}
