var express = require('express')
const router = express.Router()
const request = require('request')


// define the home page route
router.get('/', function(req, res) {
    res.send('Home page')
})
router.get('/about', function(req, res) {
    res.send('About')
})

router.get('/food', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/food?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/buildings', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/buildings?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/parking', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/transportation/parking?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})


router.use(express.static('public'))


// RESTful Routes

// 404 Error Handler
router.use(function(req, res, next) {
  res.status(404).send('Error 404, Sorry cant find that!');
});

module.exports = router
