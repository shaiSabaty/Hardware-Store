const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const app = express();
const keys = require('./Api/config/keys');


const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const PORT = 4500;
app.use(bodyParser.urlencoded({
  extended: true
}));
var cors = require('cors');
// app.us(bodyParser.urlencoded({extended:false}));
// app.use("view engine","ejs");
app.use(cors());
app.listen(PORT,
  console.log("server run in port "+ PORT));
app.use(bodyParser.json());
app.use("/images",express.static(path.join("Api/images")));
mongoose.connect(keys.mongodb.dbURI
 , {useNewUrlParser: true}).then(console.log("connect succes to mongo"));

// const path = require('path');
const product = require('./Api/Products');

app.use("/product",product);

const country = require('./Api/Countries');

app.use("/country",country);

const city = require('./Api/Cities');

app.use("/city",city);


// const countries = require('./Api/Countries');

// app.use("/cities",countries);

const cpu = require('./Api/Cpus');

app.use("/cpu",cpu);

const user = require('./Api/Users');

app.use("/user",user);

const category = require('./Api/Category');

app.use("/category",category);


const comment = require('./Api/Comments');

app.use("/comment",comment);

const order = require('./Api/Orders');

app.use("/orders",order);



//  app.engine('handlebars',exphbs());
//   app.set('view engine','handlebars');

  app.use(bodyParser.urlencoded({extended:false}));
  

 app.use('./Api/public',express.static(path.join(__dirname,'public')));


 app.use(bodyParser.urlencoded({
  extended: true
}));