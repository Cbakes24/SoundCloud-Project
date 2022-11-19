const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Song, Album, User } = require('../../db/models');
const { Op } = require('sequelize');


//GET SONG
router.get('/', async (req, res) => {
    let allSongs = await Song.findAll()
    return res.json(allSongs)
});

//GET SONG BY ID
router.get('/:songId(\\d+)', async (req, res, next) => {

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

        if (!song) {
            //title, status, errors(array), message
            const err = new Error()
            err.status = 404
            err.title = 'songId does not exist'
            err.message = 'Song could not be found'
            err.errors = ['Song not found']

            return next(err)

          }
    return res.json(song)
});

//EDIT A SONG
router.put('/:songId', requireAuth, async (req, res) => {


})



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


//GET ALL SONGS BY CURRENT USER

router.get('/current', requireAuth, async (req, res, next) => {

    const userId = req.user.id
        const allUserSongs = await Song.findAll( {where: {userId: userId}})

       return res.json(allUserSongs)
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
