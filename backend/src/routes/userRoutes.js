const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/ProfilePhotoUpload')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/',userController.users)
router.get('/',userController.getUsers)
router.put('/user/update/:email', upload.single('profilePhoto'), userController.updateUser);
router.put('/update-password/:phone', userController.updatePassword);
router.get('/:id', userController.getSingleUser);
module.exports = router;
    