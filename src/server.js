const express = require('express')
const server = express()
const puppeteer = require('puppeteer')

const PORT_LISTENING = process.env.PORT

// Allow CORS
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.get('/', function (req, res) {

  const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()

    // 2 - Naviguer jusqu'à l'URL cible
    try {
      await page.goto('http://maree.info/93')
    } catch (error) {
      console.log(error)
    }
    // 3 - Récupérer les données
    const result = await page.evaluate(() => {
      return document.querySelector('#Flotteur').getAttribute('data-ht')
    })

    // 4 - Retourner les données (et fermer le navigateur)
    browser.close()
    return result
  }

// Appelle la fonction getData() et affichage les données retournées
  getData().then(value => {
    value = parseFloat(value.replace(/,/g, '.'))
    console.log(value)
    res.send({result: value})
  })
})

server.listen(PORT_LISTENING, function () {
  console.log(`Server run on ${PORT_LISTENING}`)
})