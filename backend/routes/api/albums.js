const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Song, Album, Playlist, User, Comment } = require('../../db/models');
const { Op } = require("sequelize");



router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll()
   return res.json(allAlbums)
});


//CREATE AN ALBUM
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

//CREATE A SONG FOR AN ALBUM
router.post('/:albumId/songs', requireAuth, async (req, res, next) => {
        const { title, description, url, previewImage } = req.body

        const albumId = req.params.albumId
        if (albumId) {
            const album = await Album.findByPk(albumId)

             if (!album) {
               //title, status, errors(array), message
               const err = new Error()
               err.status = 404
               err.title = 'albumId does not exist'
               err.message = 'Album not found'
               err.errors = ['Album not found']

               return next(err)

             }
            }
            const newSong = await Song.create( {
                title,
                description,
                url,
                previewImage,
                albumId
            })
            res.status(201)
            res.json(newSong)
            })

module.exports = router;
