const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// const { restoreUser } = require('../../utils/auth.js'); already pulling from the session router I think??
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


  router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
  });

  router.use(restoreUser);

// ...

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
  module.exports = router;
// fetch('/api/test', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ hello: 'world' })
//   }).then(res => res.json()).then(data => console.log(data));

// Replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie.
