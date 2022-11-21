const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, PLaylistSong } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



router.post('/', requireAuth, async (req, res) => {
    const { name, previewImage } = req.body

    const playlist = await Playlist.create( name, previewImage)

    res.status(201)
    res.json(playlist)
})


module.exports = router;
