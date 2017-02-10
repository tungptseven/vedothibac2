# Hướng dẫn bài vẽ đồ thị bậc 2

### Bài này gồm có 3 bước:
1. Người dùng nhập vào 3 giá trị a, b, c của hàm ```y = f(x) = a.x^2 + b.x + c``` ấn nút submit
2. Tính nghiệm x1 và x2
3. Vẽ đồ thị


### Yêu cầu khi làm bài này cần:
1. Sử dụng pattern SOLID, tách phần tính nghiệm, và sinh dữ liệu ra khỏi phần đồ thị để trong tương
lai nếu đổi thư viện vẽ đồ thị, thì chúng ta chỉ phải chỉnh sửa ít nhất

2. Nếu đã tách được thì sẽ phải kiểm thử được.


# Các bước thực hiện

### Cài đặt các Ndoe module cần thiết
```bash
npm init
npm install --save chai express body-parser nunjucks plotly.js
```

### Tạo một file index.js
```javascript
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require("body-parser");

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

app.listen(8080, () => {
  console.log('Web app listens at port 8080');
});
```
Sau đó chỉnh sửa entry script start ở package.json
```"start": "node index.js"```

### Sử dụng plotly 

### Blocking
Hàm này chạy local từng tác vụ đơn lẻ thì được, chạy trên server lỗi
```javascript
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
```
