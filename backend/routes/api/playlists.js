const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Playlist, Song} = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');
const { Op } = require('sequelize');






module.exports = router;
