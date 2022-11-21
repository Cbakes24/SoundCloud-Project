const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Song, Album, PLaylist, Comment, PLaylistSong } = require('../../db/models');
const { Op } = require('sequelize');


router.put('/:commentId', async (req, res, next) => {
    const commentId = req.params.commentId
    const { body } = req.body

    if(commentId){

    const comment = await Comment.findByPk(commentId)

        if(!comment || commentId === null) {
                const err = new Error();
                err.status = 404;
                err.title = "commentId does not exist";
                err.message = "comment could not be found";
                err.errors = ["comment not found"];

                return next(err);

        }

       comment.set({
            body: body
        });

        await comment.save();

    }

    const editedComment = await Comment.findByPk(commentId);

    res.json(editedComment);

})

module.exports = router;
