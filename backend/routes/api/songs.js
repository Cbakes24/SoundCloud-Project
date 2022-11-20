const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  User,
  Song,
  Album,
  PLaylist,
  Comment,
  PLaylistSong,
} = require("../../db/models");
const { Op } = require("sequelize");

//GET SONG
router.get("/", async (req, res) => {
  let allSongs = await Song.findAll();
  return res.json(allSongs);
});

//GET SONG BY ID
router.get("/:songId(\\d+)", async (req, res, next) => {
  const song = await Song.findOne({
    where: {
      id: req.params.songId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "previewImage", "username"],
      },
      { model: Album, attributes: ["id", "previewImage", "title"] },
    ],
  });

  if (!song) {
    //title, status, errors(array), message
    const err = new Error();
    err.status = 404;
    err.title = "songId does not exist";
    err.message = "Song could not be found";
    err.errors = ["Song not found"];

    return next(err);
  }
  return res.json(song);
});


//GET ALL SONGS BY CURRENT USER

router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const allUserSongs = await Song.findAll({ where: { userId: userId } });

  return res.json(allUserSongs);
});


//EDIT A SONG
router.put("/:songId", requireAuth, async (req, res, next) => {
    const { title, description, url, previewImage } = req.body;
    const song = await Song.findByPk(req.params.songId);
    if (!song) {
        //title, status, errors(array), message
        const err = new Error();
        err.status = 404;
        err.title = "songId does not exist";
        err.message = "Song could not be found";
        err.errors = ["Song not found"];

        return next(err);
    }

    song.set({
        title: title,
        description: description,
        url: url,
        previewImage: previewImage,
    });
    await song.save();

    const editedSong = await Song.findByPk(req.params.songId);
    res.json(editedSong);
});



//CREATE A SONG FOR AN ALBUM
router.post("/", requireAuth, async (req, res, next) => {
    const { title, description, url, previewImage, albumId } = req.body;

    if (albumId) {
        const album = await Album.findByPk(albumId);

        if (!album) {
            //title, status, errors(array), message
            const err = new Error();
            err.status = 404;
            err.title = "albumId does not exist";
            err.message = "Album not found";
            err.errors = ["Album not found"];

            return next(err);
        }
    }
    const newSong = await Song.create({
        title,
        description,
        url,
        previewImage,
        albumId,
    });
    res.status(201);
    res.json(newSong);
});


//CREATE A COMMENT
router.post("/:songId/comments", requireAuth, async (req, res, next) => {
    const { body } = req.body;
    const songId = req.params.songId

    const song = await Song.findByPk(req.params.songId);

    if (!song || songId === null) {
      const err = new Error();
      err.status = 404;
      err.title = "songId does not exist";
      err.message = "Song could not be found";
      err.errors = ["Song not found"];

      return next(err);
    }

    const newComment = await song.createComment({ body: body });

    res.json(newComment);
  });

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

            module.exports = router;
