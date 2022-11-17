const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    let allSongs = await Song.findAll()
    return res.json(allSongs)
});

router.get('/:songId', async (req, res) => {
    let song = await Song.findByPk(req.params.songId)
    return res.json(song)
});

module.exports = router