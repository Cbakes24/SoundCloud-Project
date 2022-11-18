const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// router.post('/', async (req, res) => {
//       const { email, password, username } = req.body;
//       const user = await User.signup({ email, username, password });

//       await setTokenCookie(res, user);

//       return res.json({
//         user: user
//       });
//     }
//   );

//SIGN UP USER
router.post('/session/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body
  //create or User.createUser

  const newUser = await User.create( {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password})
})


router.get('/user/:userId/songs', async (req, res) => {
const currUser = await User.findOne( { where: { id: req.params.userId } })

const userSongs = await currUser.getSongs()
console.log(userSongs.id)

})

  router.post('/', validateSignup, async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password, firstName, lastName });

      await setTokenCookie(res, user);

      return res.json({
        user: user,
      });
    }
  );


module.exports = router;
