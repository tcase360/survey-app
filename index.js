let express = require('express');
let app = express();

let port = process.env.PORT || 8000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

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
