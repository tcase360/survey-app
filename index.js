let express = require('express');
let path = require('path');
let app = express();
let ejs = require('ejs');

let port = process.env.PORT || 8000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

ejs.open = '{{';
ejs.close = '}}';

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index', {
      base_url: process.env.MY_APPS_DEV_URL
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
