const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const asyncHandler = require("express-async-handler");
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

const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid comment."),
  handleValidationErrors,
];

//GET SONG
router.get("/", async (req, res, next) => {
  let { page, size } = req.query;
  let pagination = {};
  if (!page || !size) {
    let allSongs = await Song.findAll();
    return res.json({ allSongs });
  }
  if (req.query) {
    page = parseInt(page);
    size = parseInt(size);
    if (
      Number.isInteger(page) &&
      Number.isInteger(size) &&
      page > 0 &&
      page <= 10 &&
      size > 0 &&
      size <= 20
    ) {
      (pagination.limit = size), (pagination.offset = size * (page - 1));
    } else if (!(page === 0 && size === 0)) {
      const err = new Error();
      err.status = 404;
      err.title = "Page or Size not integer";
      err.message = "Page and Size must be a number greater than or equal to 0";
      err.errors = [
        "Page and Size must be a number greater than or equal to 0",
      ];

      return next(err);
    }
  }
  let allSongs = await Song.findAll({
    ...pagination,
  });

  return res.json({ allSongs, page, size });
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
        as: "Artist",
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
router.put("/:songId", singleMulterUpload("audioFile"),  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { title, description, albumId } = req.body;
    const userId = req.user.id;
    const audioFile = await singlePublicFileUpload(req.file);
    let album;
    console.log(title, "*** TEST FOR SONG TITLE ***");
    
    if (albumId) {
      album = await Album.findByPk(albumId);
    }

    let songId = req.params.songId;

    let currentSong = await Song.findOne({where:{id: songId}});

  if (!currentSong) {
    //title, status, errors(array), message
    const err = new Error();
    err.status = 404;
    err.title = "songId does not exist";
    err.message = "Song could not be found";
    err.errors = ["Song not found"];

    return next(err);
  }

  currentSong.update({
      title: title,
      description: description,
      url: audioFile,
      previewImage: album.previewImage,
      albumId: albumId,
      userId: userId,
  });
  await currentSong.save();

  const editedSong = await Song.findByPk(req.params.songId);
  res.json(editedSong);

}));

//CREATE A SONG FOR AN ALBUM
router.post(
  "/",
  singleMulterUpload("audioFile"),
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { title, description, albumId } = req.body;
    const userId = req.user.id;
    let album;
    console.log(title, "*** TEST FOR SONG TITLE ***");
    if (albumId) {
      album = await Album.findByPk(albumId);
    }
console.log(album, "**** ALBUM IN THE  BACK END FOR SONG ****")
    const audioFile = await singlePublicFileUpload(req.file);
    console.log(title, "*** TESTERR 2 ***");

    const newSong = await Song.create({
      title: title,
      description: description,
      url: audioFile,
      previewImage: album.previewImage,
      albumId: albumId,
      userId: userId,
    });
    console.log(newSong, "NEW SONG IN BACKENDD *****");
    res.status(201);
    return res.json({ newSong });
  })
);

//CREATE A COMMENT
router.post(
  "/:songId/comments",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    const { body } = req.body;
    const songId = req.params.songId;
    const userId = req.user.id;
    const username = req.user.username;
    const song = await Song.findByPk(req.params.songId);

    if (!song || songId === null) {
      const err = new Error();
      err.status = 404;
      err.title = "songId does not exist";
      err.message = "Song could not be found";
      err.errors = ["Song not found"];

      return next(err);
    }

    const newComment = await song.createComment({
      body: body,
      userId,
      username,
    });

    res.json(newComment);
  }
);

//Get A COMMENT
router.get("/:songId/comments", async (req, res, next) => {
  const songId = req.params.songId;

  const song = await Song.findByPk(songId);

  if (!song || songId === null) {
    const err = new Error();
    err.status = 404;
    err.title = "songId does not exist";
    err.message = "Song could not be found";
    err.errors = ["Song not found"];

    return next(err);
  }

  const songComments = await Comment.findAll({
    where: { songId },
    include: [
      {
        model: User,
        // attributes: ["id", "username"],
      },
    ],
  });
  res.json(songComments);
});

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
