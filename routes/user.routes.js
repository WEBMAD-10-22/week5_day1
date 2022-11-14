const isLoggedIn = require('../middleware/isLoggedIn.middleware');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('user/index', req.session.user);
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
})

module.exports = router;