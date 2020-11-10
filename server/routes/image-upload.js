const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/authMiddleware');
const upload = require('../services/image-upload');


const singleUpload = upload.single('image'); // under this key, send an image

router.post('/image-upload', authMiddleware, async function(req, res, next) {
  try {
    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
      }
      return res.json({'image_url': req.file.location});
    });

  } catch (e) {
    next(e)
  }
});

module.exports = router;
