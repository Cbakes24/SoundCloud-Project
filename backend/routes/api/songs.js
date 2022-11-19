const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Song, Album } = require('../../db/models');
const { Op } = require('sequelize');

//GET SONG
router.get('/', async (req, res) => {
    let allSongs = await Song.findAll()
    return res.json(allSongs)
});

//GET SONG BY ID
router.get('/:songId', async (req, res) => {

    const song = await Song.findOne({
        where: {
            id: req.params.songId
        }, 
        include: [ {
            model: User,
            attributes:['id', 'previewImage', 'username']
        }, 
        {model: Album,
            attributes:['id', 'previewImage', 'title']}]
    })
        //{
            // model: Album,
            // attributes:['id', 'previewImage', 'title'],
            // model: User,
            // attributes:['id', 'previewImage', 'username']
        //}
            
        //[Album,{attributes: ['id', 'previewImage', 'title'] } ],
   
    if (!song) {
        res.status(404); thanks
        res.send({ message: 'Song Not Found' })
    }
    return res.json(song)
});

module.exports = router