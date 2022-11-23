const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Song,
  Album,
  Playlist,
  Comment,
  PlaylistSong,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");


const validatePlaylist = [
    check("name")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a valid playlist name."),
    handleValidationErrors,
  ];



//GET ALL PLAYLISTS BY CURRENT USER
router.get("/current", requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const allUserPlaylists = await Playlist.findAll({ where: { userId: userId } });

    return res.json(allUserPlaylists);
  });


//GET DETAILS oF PLAYLIST BY ID
router.get("/:playlistId", async (req, res, next) => {
  const playlistId = req.params.playlistId;

  if (playlistId) {
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
      const err = new Error();
      err.status = 404;
      err.title = "Playlist No Name";
      err.message = "Playlist needs a name";
      err.errors = ["Playlist needs a name"];

      return next(err);
    }
  }

  const fullPlaylist = await Playlist.findOne({
    where: { Id: playlistId },

    include: [
      {
        model: Song,
        attributes: [
          "id",
          "userId",
          "albumId",
          "title",
          "description",
          "previewImage",
        ],
        through: { attributes: [] },
      },
    ],
  });

  res.json(fullPlaylist);
});

//CREATE A PLAYLIST
router.post("/", requireAuth, async (req, res, next) => {
  const { name, previewImage } = req.body;
  const userId = req.user.id;

  if (!name) {
    const err = new Error();
    err.status = 400;
    err.title = "Playlist No Name";
    err.message = "Playlist needs a name";
    err.errors = ["Playlist needs a name"];

    return next(err);
  }

  const newPlaylist = await Playlist.create({
    userId,
    name: name,
    previewImage: previewImage,
  });

  res.status(201);
  res.json(newPlaylist);
});

//ADD A SONG TO A PLAYLIST
router.post("/:playlistId/songs", requireAuth, async (req, res, next) => {
  const { songId } = req.body;
  const playlistId = req.params.playlistId;

  if (playlistId) {
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
      const err = new Error();
      err.status = 404;
      err.title = "playlistId does not exist";
      err.message = "playlist could not be found";
      err.errors = ["playlist not found"];

      return next(err);
    }
  }

  if (songId) {
    const song = await Song.findByPk(songId);

    if (!song) {
      const err = new Error();
      err.status = 404;
      err.title = "songId does not exist";
      err.message = "Song could not be found";
      err.errors = ["Song not found"];

      return next(err);
    }
  }

  const editedPlaylist = await PlaylistSong.create({
    songId: songId,
    playlistId: playlistId,
  });

  res.json(editedPlaylist);
});


//EDIT a PLAYLIST
router.put('/:playlistId', requireAuth, validatePlaylist, async (req, res, next) => {
const playlistId = req.params.playlistId
const { name,  previewImage } = req.body

if(playlistId) {
const playlist = await Playlist.findByPk(playlistId)

    if(!playlist) {
        const err = new Error();
        err.status = 404;
        err.title = "playlistId does not exist";
        err.message = "playlist could not be found";
        err.errors = ["playlist not found"];

        return next(err);

    }

   await playlist.set({
        name: name,
        previewImage: previewImage
      });

      await playlist.save();
}

const editedPlaylist = await Playlist.findByPk(playlistId)

res.json(editedPlaylist)


//DELETE A PLAYLIST

router.delete("/playlistId", requireAuth, async (req, res, next) => {
    const playlistId = req.params.playlistId;
    const userId = req.params.id;


    if (playlistId) {
      const playlist = await Playlist.findByPk(playlistId, {
        where: { userId: userId },
      });

      if (!playlist) {
        const err = new Error();
        err.status = 404;
        err.title = "playlistId does not exist";
        err.message = "playlist could not be found";
        err.errors = ["playlist not found"];

        return next(err);
      }

      await Playlist.destroy({
        where: { id: playlistId }, // specific records to delete
      });
    }

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  });
})
module.exports = router;
