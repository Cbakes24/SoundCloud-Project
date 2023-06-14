const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { User, Song, Album, Playlist, Comment, PlaylistSong } = require('../../db/models');
const { Op } = require("sequelize");



router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll()
   return res.json(allAlbums)
});

//GET ALBUMS oF CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {

    const userId = req.user.id
        const allUserAlbums = await Album.findAll( {where: {userId: userId}})

       return res.json(allUserAlbums)
    })
//Get ALBUM DETAILS BASED ON ALBUM ID
router.get('/:albumId', async (req, res, next) => {

    const albumId = req.params.albumId

    const album = await Album.findByPk( albumId, {
        include: [ {
            model: User,
            as: 'Artist',
            attributes:['id', 'previewImage', 'username']
        },
        {model: Song,
            attributes:['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'previewImage']}]
        })


    if(!album) {

        const err = new Error();
        err.status = 404;
        err.title = "album does not exist";
        err.message = "Album could not be found";
        err.errors = ["Album not found"];

        return next(err);

    }
   return res.json(album)
});



//CREATE AN ALBUM
router.post("/create", singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    // console.log("*** REQ IN THE SIGNUP API ***")
    const { title, description, previewImage, userId} = req.body;
    // console.log(req.file, "*** TESTERR 1 ***")
    console.log(title, '*** TEST FOR ALBUM TITLE ***')
    const albumImageUrl = await singlePublicFileUpload(req.file);
    console.log(title, "*** TESTERR 2 ***")


    const newAlbum = await Album.create({
      title,
      description,
      previewImage: albumImageUrl,
      userId
    });
// console.log(user, "*** USER IN APPII ***")
    setTokenCookie(res, newAlbum);
    console.log(newAlbum, "NEW ALBUM IN BACKENDD *****")
    return res.json({
      newAlbum,
    });
  })
);

// router.post('/', requireAuth, async (req, res) => {
//   const { title, description, previewImage } = req.body;
//   const userId = req.user.id
//   const newAlbum = await Album.create(
//     {
//       title: title,
//       description: description,
//       previewImage: previewImage,
//       userId
//     },
//   );

//   if (newAlbum) {
//     res.status(200);
//     return res.json(newAlbum);
//   }
// });

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


//EDIT AN ALBUM
router.put('/:albumId', async (req, res, next) => {
const { title, description, previewImage } = req.body
const album = await Album.findByPk(req.params.albumId)
if (!album) {
    //title, status, errors(array), message
    const err = new Error()
    err.status = 404
    err.title = 'albumId does not exist'
    err.message = 'album could not be found'
    err.errors = ['album not found']

    return next(err)

  }

album.set({
    title: title,
    description: description,
    previewImage: previewImage
});

await album.save();

const editedAlbum = await Album.findByPk(req.params.albumId)
res.json(editedAlbum)
})

//DELETE AN ALBUM
router.delete("/:albumId", requireAuth, async (req, res, next) => {
    const albumId = req.params.albumId;
    const userId = req.params.id;
    const { body } = req.body;

    if (albumId) {
      const album = await Album.findByPk(albumId, {
        where: { userId: userId },
      });

      if (!album) {
        const err = new Error();
        err.status = 404;
        err.title = "albumId does not exist";
        err.message = "album could not be found";
        err.errors = ["album not found"];

        return next(err);
      }

      await album.destroy();
    }

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  });
module.exports = router;
