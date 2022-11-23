const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  User,
  Song,
  Album,
  Playlist,
  Comment,
  PlaylistSong,
} = require("../../db/models");
const { Op } = require("sequelize");



const validateSong = [
    check("title")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a valid song title."),
    check("url")
      .exists({ checkFalsy: true })
      .withMessage("Please provide song audio"),
    handleValidationErrors,
  ];



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
   0
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
router.post("/", requireAuth, validateSong, async (req, res, next) => {
    const { title, description, url, previewImage, albumId } = req.body;
    const userId = req.user.id
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
        userId
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

//Get A COMMENT
  router.get('/:songId/comments', async (req, res, next) => {
   const songId = req.params.songId

   const song = await Song.findByPk(songId);

       if (!song || songId === null) {
         const err = new Error();
         err.status = 404;
         err.title = "songId does not exist";
         err.message = "Song could not be found";
         err.errors = ["Song not found"];

         return next(err);
       }

const songComments = await Comment.findAll( { where: {songId: songId},
    include: [
        {
          model: User,
          attributes: ["id", "username"],
        }
      ],

})
console.log('song')
res.json(songComments)
  })



//DELETE A SONG

router.delete("/:songId", requireAuth, async (req, res, next) => {
    const songId = req.params.songId;
    const userId = req.params.id;
    const { body } = req.body;

    if (songId) {
      const song = await Song.findByPk(songId, {
        where: { userId: userId },
      });

      if (!song) {
        const err = new Error();
        err.status = 404;
        err.title = "songId does not exist";
        err.message = "song could not be found";
        err.errors = ["song not found"];

        return next(err);
      }

      await song.destroy();
    }

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
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
