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
        res.status(404);
        res.send({ message: 'Song Not Found' })
    }
    return res.json(song)
});


//CREATE A SONG FOR AN ALBUM
router.post('/', requireAuth, async (req, res, next) => {
    const { title, description, url, previewImage, albumId } = req.body


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



        
//ALT ATTEMPT
    // const album = await Album.findByPk(albumId)
    // if(!album)
    // throw err

    // if (album) {
    //     const newSong = await Album.createSong( {
    //         title,
    //         description,
    //         url,
    //         previewImage,
    //         albumId
    //     })
    //     res.status(201)
    //     res.json(newSong)
    //     } )

// router.post('/', requireAuth, async (req, res) => {
// const { title, description, url, previewImage, albumId } = req.body


// if(albumId !== (Album.findOne( {where: {id: albumId}} )) ){
//     res.status(404);
//     res.send({ message: 'Album Not Found' })
// }


// const newSong = await Song.create( {
//     title,
//     description,
//     url,
//     previewImage,
//     albumId
// })
// res.status(201)
// res.json(newSong)
// } )

//GET ALL SONGS BY CURRENT USER
// router.get('/current', requireAuth)



module.exports = router
