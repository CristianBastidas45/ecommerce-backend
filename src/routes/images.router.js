const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWt = require('../utils/verifyJWT')

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(verifyJWt, getAll)
    .post(verifyJWt,upload.single('image'), create)

imageRouter.route('/images/:id')
    .delete(verifyJWt,remove)


module.exports = imageRouter;