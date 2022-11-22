const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, PLaylistSong } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



router.post('/', requireAuth, async (req, res, next) => {
    const { name, previewImage } = req.body
    const userId = req.user.id

    if (!name) {
        //title, status, errors(array), message
        const err = new Error();
        err.status = 400;
        err.title = "Playlist No Name";
        err.message = "Playlist needs a name";
        err.errors = ["Playlist needs a name"];

        return next(err);
      }

    const newPlaylist = await Playlist.create(
        {
          userId,
          name: name,
          previewImage: previewImage,
        },
      );

    res.status(201)
    res.json(newPlaylist)
})


module.exports = router;
