const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Song, Album, Playlist, User, Comment } = require('../../db/models');
const { Op } = require('sequelize');




module.exports = router;
 