const express = require('express');

const route = express.Router();

const controller = require('../controller/show');
const passport = require('passport');

route.get('/addshow',passport.checkauth,controller.addshow);

route.post('/insertshow',passport.checkauth,controller.insertshow);

route.get('/viewshow',passport.checkauth,controller.viewshow);

route.get('/delete/:id',passport.checkauth,controller.delete);

route.get('/update/:id',passport.checkauth,controller.update)

module.exports = route;