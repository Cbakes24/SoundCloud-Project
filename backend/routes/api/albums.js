const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Song, Album, User } = require("../../db/models");
const { Op } = require("sequelize");



router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll()
   return res.json(allAlbums)
});



router.post('/', requireAuth, async (req, res) => {
  const { title, description, previewImage } = req.body;
  const userId = req.user.id
  const newAlbum = await Album.create(
    {
      title: title,
      description: description,
      previewImage: previewImage,
      userId
    },
  );

  if (newAlbum) {
    res.status(200);
    return res.json(newAlbum);
  }
});



module.exports = router;
