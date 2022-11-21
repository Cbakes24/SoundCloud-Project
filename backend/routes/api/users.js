const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Song,
  Album,
  PLaylist,
  Comment,
  PLaylistSong,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

// GET ALL SONGS BY USER ID
router.get("/:userId/songs", requireAuth, async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    //title, status, errors(array), message
    const err = new Error();
    err.status = 404;
    err.title = "user does not exist";
    err.message = "User could not be found";
    err.errors = ["User not found"];

    return next(err);
  }

  const userSongs = await Song.findAll({ where: { userId: userId } });

  res.json(userSongs);
});

//GET ALL ALBUMS FROM A USER
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


//NEW USER SIGN Up?
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const newUser = await User.signup({ username, email, password, firstName, lastName});

  await setTokenCookie(res, newUser);

  return res.json({
    user: newUser,
  });
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
