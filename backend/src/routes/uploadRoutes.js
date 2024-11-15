const express = require('express');
const router = express.Router();
const uploads = require('../controllers/uploadController');
// const user = require('../controllers/usersImageController');
// const uploads_Internship = require('../controllers/internshipCourseImageController');

// Route to get uploaded images
router.get('/uploads', uploads.getImages);
// router.get('/uploads_Internship',uploads_Internship.getImages);
// router.get('/users', user.getImages);

module.exports = router;