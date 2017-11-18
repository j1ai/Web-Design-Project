var express = require('express');
var app = express();
var router = require('./routes/route')

const PORT = process.env.PORT || 3000;


app.use('/site', router)

app.set("view engine", "ejs");



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
