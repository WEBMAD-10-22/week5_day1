const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

const SALT_ROUNDS = 10;

// ---- GET ----
router.get('/create', (req, res) => {
  res.render('auth/create');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/user', (req, res) => {
  const user = req.session.user;
  console.log(req.session);
  res.render('user/index', user);
})


// ---- POST ----

router.post('/create', (req, res, next) => {
  const { username, email, password } = req.body;

  // bcrypt
  //   .genSalt(SALT_ROUNDS)
  //   .then((salt) => {
  //     return bcrypt.hash(password, salt);
  //   })
  //   .then((hash1) => {
  //     return UserModel.create({ username, email, password: hash1 });
  //   })
  //   .then((user) => {
  //     res.render('auth/user', user);
  //   })
  //   .catch((err) => next(err));

  // const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  // const hash1 = bcrypt.hashSync(password, salt);

  UserModel.create({ username, email, password })
    .then((user) => {
      console.log(user);
      res.render('auth/user', user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // UserModel.findOne({ email: email })
  UserModel.findOne({ email }).then((user) => {
    if (!user) {
      res.render('auth/login', {
        messageError: 'Email o contraseña incorrectos.',
      });
      return;
    }
    const verifyPass1 = bcrypt.compareSync(password, user.password);

    if (verifyPass1) {
      req.session.user = user;
      // res.render('auth/user', user);
      res.redirect('/auth/user');
    } else {
      res.render('auth/login', {
        messageError: 'Email o contraseña incorrectos.',
      });
    }
  });
});

module.exports = router;
