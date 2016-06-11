var express =       require('express'),
    path =          require('path'),
    bodyParser =    require('body-parser'),
    mongoose =      require('mongoose'),
    config =        require('./config');

//mongodb://127.0.0.1:27017/podcast
mongoose.connect('mongodb://localhost/dc-redux');

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

app.use(express.static(path.resolve(__dirname, './dist')));
app.use(bodyParser.urlencoded({extended: false}));

app.route('/')
  .get(function (req, res) {
    res.send('index');
  });

app.route('/district')
  .post(function (req, res) {
    var chamber = req.body.chamber;
    var newDistrict = req.body.newDistrict;

    if (!chamber || !newDistrict) {
      return res.status(400).send({ message: 'Chamber and/or District Number missing.'});
    }

    District.findOne({ 'chamber': chamber, 'district_number': newDistrict }, function (err, district) {
      if (err) {
        console.error(err);
      }
      console.log(district);
      res.json(district);
    });
  });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var server = app.listen(3000, function() {
    console.log('Listening to port', 3000);
  });
});