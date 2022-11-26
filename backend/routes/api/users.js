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

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// router.post('/', async (req, res) => {
//       const {  firstName, lastName, email, username, password } = req.body;
//       const user = await User.signup({ firstName, lastName, email, username, , password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user: user
//       });
//     }
//   );

//GET DETAILS of  USER BY ID
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  if (userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      const err = new Error();
      err.status = 404;
      err.title = "user does not exist";
      err.message = "User could not be found";
      err.errors = ["User not found"];

      return next(err);
    }
  }

  const totalSongs = await Song.count({ where: { userId: userId } });
  const totalAlbums = await Album.count({ where: { userId: userId } });
  const Artist = await User.findByPk(userId);

  res.json({
    Artist,
    totalSongs,
    totalAlbums,
  });
});

// GET ALL SONGS BY USER ID
router.get("/:userId/songs", requireAuth, async (req, res, next) => {
  const userId = req.params.userId;

  if (userId) {
    //title, status, errors(array), message
    const user = await User.findByPk(userId);

    if (!user) {
      const err = new Error();
      err.status = 404;
      err.title = "user does not exist";
      err.message = "User could not be found";
      err.errors = ["User not found"];

      return next(err);
    }
  }

  const userSongs = await Song.findAll({ where: { userId: userId } });

  res.json(userSongs);
});

//GET ALL ALBUMS FROM A USER(ARTIST) BY ID
router.get("/:userId/albums", requireAuth, async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    //title, status, errors(array), message
    const err = new Error();
    err.status = 404;
    err.title = "user does not exist";
    err.message = "User could not be found";
    err.errors = ["User not found"];

    return next(err);
  }

  const userAlbums = await Album.findAll({ where: { userId: userId } });

  res.json(userAlbums);
});

//GET ALL PLAYLISTS BY USER ID
router.get("/:userId/playlists", requireAuth, async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    //title, status, errors(array), message
    const err = new Error();
    err.status = 404;
    err.title = "user does not exist";
    err.message = "User could not be found";
    err.errors = ["User not found"];

    return next(err);
  }

  const userPlaylists = await Playlist.findAll({ where: { userId: userId } });

  return res.json(userPlaylists);
});

//NEW USER SIGN Up?
router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  const existUsers = await User.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });

  if (existUsers) {
    const err = new Error();
    err.status = 403;
    err.title = "user email or username not unique";
    err.message = "user email or username already exists";
    err.errors = ["user email or username already exists"];

    return next(err);
  }
  const newUser = await User.signup({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  await setTokenCookie(res, newUser);

  return res.json(newUser);
});

// router.post("/", validateSignup, async (req, res) => {
//   const { email, password, username } = req.body;
//   const user = await User.signup({
//     email,
//     username,
//     password,
//     firstName,
//     lastName,
//   });

//   await setTokenCookie(res, user);

//   return res.json({
//     user: user,
//   });
// });

module.exports = router;
