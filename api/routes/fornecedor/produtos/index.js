const { request } = require('express')

const rota = require('express').Router()

rota.get('/', (request, response) =>{
  response.send(
    JSON.stringify([])
  )
})

module.exports = rota