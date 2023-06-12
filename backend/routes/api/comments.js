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

//CREATE A COMMENT
router.post("/", requireAuth, async (req, res, next) => {
  const { body } = req.body;
  const songId = req.params.songId;
  const userId = req.user.id;
  const song = await Comment.findByPk(req.params.songId);

  if (!song || songId === null) {
    const err = new Error();
    err.status = 404;
    err.title = "songId does not exist";
    err.message = "Song could not be found";
    err.errors = ["Song not found"];

    return next(err);
  }

  const newComment = await song.createComment({ body: body, userId });

  res.json(newComment);
});

//GET ALL COMMENTs

router.get("/", async (req, res, next) => {
  let comments = await Comment.findAll({
    include: [
      {
        model: User,
        // attributes: ["id", "username"],
      },
    ],
  });

  res.json(comments);
});

//GET A COMMENT
// router.get("/:commentId", async (req, res, next) => {
//   const comment = await Comment.findOne({
//     where: {
//       id: req.params.commentId
//     }
//   })
// })

//EDIT A COMMENT
router.put("/:commentId", requireAuth, async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.params.id;
  const { body } = req.body;

  if (commentId) {
    const comment = await Comment.findByPk(commentId, {
      where: { userId: userId },
    });

    if (!comment || commentId === null) {
      const err = new Error();
      err.status = 404;
      err.title = "commentId does not exist";
      err.message = "comment could not be found";
      err.errors = ["comment not found"];

      return next(err);
    }

    comment.set({
      userId,
      body: body,
    });

    await comment.save();
  }

  const editedComment = await Comment.findByPk(commentId);

  res.json(editedComment);
});

//DELETE A COMMENT
router.delete("/:commentId", requireAuth, async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.params.id;
  const { body } = req.body;

  if (commentId) {
    const comment = await Comment.findByPk(commentId, {
      where: { userId: userId },
    });

    if (!comment) {
      const err = new Error();
      err.status = 404;
      err.title = "commentId does not exist";
      err.message = "comment could not be found";
      err.errors = ["comment not found"];

      return next(err);
    }

    await Comment.destroy({
      where: { id: commentId }, // specific records to delete
    });
  }

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
