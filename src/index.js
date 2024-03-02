const express = require('express') //commonjs

const configViewEngine = require('./config/viewsEngine')
const webRoutes = require('./router/web');
const morgan = require('morgan')
const app = express() // app express


// config template engine and config static files
configViewEngine(app);


//vd về hàm middleware
const logger = function(req, res, next) {
  console.log('Custom middleware called');
  next();
}
// thiết bị trung gian để có thêm phần body của json movies mới vào và pthuc use này cũng là 1 middleware 
app.use(express.json());
// gọi lại hàm middleware logger
app.use(logger);
// thiết bị trung gian (middleware t3)
app.use(morgan('dev'));

// vd t2 về middleware - trả ngày tháng năm hiện tại nhung trả về bên file movies.json
app.use((req,res,next)=>{
  req.requestedAt =new Date().toISOString();
  // pthuc next này dùng để sau khi hàm middleware này (hoặc các hàm middleware khác cx v) sau khi xử lý request sẽ có thể 
  //chạy qua các hàm middleware khác ngay cả khi ko hoàn thành req và k trả về đc res 
  next();
})


// HTTP logger //khai báo router // using router
app.use('',webRoutes)
// app.listen(port, () => {
//   console.log(`Example app listening on port at http://localhost:${port}`)
// })

module.exports = app


