const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, PLaylist, Comment, PLaylistSong } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');






module.exports = router;
