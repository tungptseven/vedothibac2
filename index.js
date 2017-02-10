/**
 * Created by techmaster on 2/10/17.
 */
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require("body-parser");
const plotly = require('plotly')('tungpt7', 'nMEIrgmKOzhOs7WjNBdw');
const fs = require('fs');
const math = require('./math/hambac2');
const path = require('path');


//Cấu hình nunjucks
nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express: app,
  watch: true
});


app.use('/public', express.static('public'));


// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));


// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});


app.post('/', (req, res) => {
  try {
    [a, b, c] = [parseFloat(req.body.a), parseFloat(req.body.b), parseFloat(req.body.c)];
    renderChart(a, b, c);
    res.render('index.html');
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, () => {
  console.log('Web app listens at port 8080');
});

function renderChart(a, b, c) {
  let x_seriesy_series;
  try {
    [x_series, y_series] = math.gendata(a, b, c);
  } catch (err) {
    throw new Error('failed to generate data series');
  }

  let trace = {
    x: x_series,
    y: y_series,
    type: "scatter"
  };

  let figure = {'data': [trace]};

  let imgOpts = {
    format: 'png',
    width: 1000,
    height: 500
  };


  plotly.getImage(figure, imgOpts, function (error, imageStream) {
    if (error) return console.log(error);

    let filePath = __dirname.concat('/public/1.png');

    let fileStream = fs.createWriteStream(filePath);
    imageStream.pipe(fileStream);
  });
}