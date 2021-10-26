'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno

const Controller = require("./controller/controller.class")
const myController = new Controller();

window.addEventListener('load', () => {

  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value

    myController.addProductToStore({ name, price })
  })



 })


