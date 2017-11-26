var express = require('express')
const router = express.Router()
const request = require('request')


function myLogger(req, res, next) {
    console.log(Date.now(), 'LOG:', req.method, req.url, req.body)


    // console.log("Raw Cookies: ",req.headers.cookie)
    // console.log("Cookie Parser: ",req.cookies)
    // console.log("Signed Cookies: ",req.signedCookies)
    // if (req.body) {
    //     console.log('LOG:', req.method, req.url, req.body)
    // }
    // res.append('Set-Cookie', 'lastPage='+req.url);
    next()
}

// middleware that is specific to this router
router.use(myLogger)

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
        console.log(res)
        console.log(data)
        res.send(data)
    })
})

router.get('/buildings', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/buildings?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        console.log(res)
        console.log(data)
        res.send(data)
    })
})

router.get('/parking', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/transportation/parking?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        console.log(res)
        console.log(data)
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


const db = (function() {
    let database = {
        'CSC309': {
            id: 'CSC309',
            when: new Date(),
            what: 'Programming on the Web',
            who: 'Gonzalez'
        }
    };

    return { // public interface to the DB layer
        findAll: function() {
            return database
        },
        findOne: function(i) {
            return database[i]
        },
        add: function(r) {
            database[r.id] = r
        },
        remove: function(i) {
            delete database[i]
        }
    };
})();
