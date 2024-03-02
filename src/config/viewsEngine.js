const path= require('path');
const express = require('express');
const configViewEngine =(app) =>{
    // config template engine
app.set('views', './src/views')
app.set('view engine', 'ejs')
    // config static files
const path = require('path')
app.use( express.static(path.join('./src', 'public')))
}
 module.exports = configViewEngine;