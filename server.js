var express =       require('express'),
    path =          require('path'),
    bodyParser =    require('body-parser'),
    mongoose =      require('mongoose'),
    db =            require('./models'),
    sequelize =     require('sequelize'),
    config =        require('./config');

//mongodb://127.0.0.1:27017/podcast
mongoose.connect('mongodb://127.0.0.1:27017/dc-redux');

var districtSchema = mongoose.Schema({
  legislator_number: Number,
  legislator_year: String,
  legislator_type: String,
  politician_officetype: String,
  politician_position: String,
  politician_party: String,
  politician_picture: String,
  politician_firstname: String,
  politician_lastname: String,
  address_street: String,
  address_room: String,
  contact_phone: String,
  contact_fax: String,
  contact_email: String,
  contact_links: String,
  district_number: Number,
  neighborhoods: [String],
  politician_committee: [String],
  chamber: String
});
// collection name will get pluralized by mongoose
var District = mongoose.model('District', districtSchema);

var app = express();

app.use(express.static(path.resolve(__dirname, '/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });


app.route('/')
  .get(function (req, res) {
    res.render('index');
  });

app.route('/district')
  .post(function (req, res) {
    var chamber = req.body.chamber;
    var districtNumber = req.body.districtNumber;

    if (!chamber || !districtNumber) {
      return res.status(400).send({ message: 'Chamber and/or District Number missing.'});
    }

    District.findOne({ 'chamber': chamber, 'district_number': districtNumber }, function (err, district) {
      if (err) {
        console.error(err);
      }
      res.json(district);
    });
  });

app.get('/senatecrimequery', function (req, res) {

  db.crime.sequelize.query(
    'SELECT ' +
      '"type", "senateDistrict" AS "district", COUNT("crime"."type") AS "count", ' +
      'to_timestamp(floor((extract("epoch" from date) / 604800 )) * 604800) ' +
    'FROM ' +
      '"crimes" AS "crime" ' +
    'GROUP BY ' +
      '"type", "district", "to_timestamp" ' +
    'ORDER BY ' +
      'to_timestamp'
  )
  .then(function (results) {
    res.json(results);
  });
});

app.get('/housecrimequery', function (req, res) {

  db.crime.sequelize.query(
    'SELECT ' +
      '"type", "houseDistrict" AS "district", COUNT("crime"."type") AS "count", ' +
      'to_timestamp(floor((extract("epoch" from date) / 604800 )) * 604800) ' +
    'FROM ' +
      '"crimes" AS "crime" ' +
    'GROUP BY ' +
      '"type", "district", "to_timestamp" ' +
    'ORDER BY ' +
      'to_timestamp'
  )
  .then(function (results) {
    res.json(results);
  });
});

app.get('/file/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/dist/assets/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(options.root);
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

db.sequelize.sync();

var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'connection error:'));
mongodb.once('open', function () {
  var server = app.listen(3000, function() {
    console.log('Listening to port', 3000);
  });
});