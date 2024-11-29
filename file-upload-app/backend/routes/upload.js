// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/uploadController');
const router = express.Router();

// Set up multer for file upload handling
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
