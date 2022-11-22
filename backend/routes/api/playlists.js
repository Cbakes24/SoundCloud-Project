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

//GET DETAILS oF PLAYLIST BY ID
router.get('/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId

    if(playlistId){

        const playlist = await Playlist.findByPk(playlistId)

        if(!playlist){
            const err = new Error();
            err.status = 404;
            err.title = "Playlist No Name";
            err.message = "Playlist needs a name";
            err.errors = ["Playlist needs a name"];

            return next(err);
          }


        }


        const fullPlaylist = await Playlist.findOne( { where: { Id: playlistId},

      include: [
                {
                model: Song,
                attributes: ["id", 'userId', 'albumId', 'title', 'description',  'previewImage'],
                through: {attributes: []}
                }]
      })


        res.json(fullPlaylist)
    })




//CREATE A PLAYLIST
router.post("/", requireAuth, async (req, res, next) => {
  const { name, previewImage } = req.body;
  const userId = req.user.id;

  if (!name) {
    //title, status, errors(array), message
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
    const playlistId = req.params.playlistId

if(playlistId) {
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

// const playlist = await PlaylistSong.findOne( { where: { playlistId: playlistId} })

const editedPlaylist = await PlaylistSong.create( {
    songId: songId,
    playlistId: playlistId
})

 res.json(editedPlaylist)
});


module.exports = router;
