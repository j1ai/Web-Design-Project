var express = require('express')
const router = express.Router()
const request = require('request')





// define the home page route
router.get('/add', function(req, res) {
    res.send('Home page')
})


router.get('/about', function(req, res) {
    res.send('About')
})

router.get('/textbook', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/textbooks?limit=2&' + 'key=' + API_KEY, function(err, _res, body) {
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
