const express = require('express');
const router = express.Router();
const moviesController = require('../controller/homeController');

// param middleware
router.param('id',moviesController.checkId);

// Sau khi sử dụng controller
router.get('/trangchu', moviesController.getHomePage);
router.get('/trangcon', moviesController.getTrangCon); 
router.get('/tin-tuc', moviesController.getTrangTinTuc);
router.get('/GetAllMovies',  moviesController.getMovies);
router.post('/CreateMovies', moviesController.validateMovies, moviesController.postMovies);
router.get('/GetMoviesByID/:id',  moviesController.getMoviesId);
router.put('/UpdateMovies/:id',  moviesController.patchMovies);
router.delete('/DeleteMovies/:id',  moviesController.deleteMovies);
module.exports = router; // export default