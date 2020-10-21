exports.createSignUpValidator = (req, res, next) => {
  // email validation
  req.check('email', "provide email address").notEmpty();

  req.check('password', "password must be between 6 to 200 characters").isLength({
    min: 6,
    max: 200
  });

  req.check('name', "name should not be empty").notEmpty();

  // check for error
  const errors = req.validationErrors();
  //if error show first error
  if(errors){
    const firstError = errors.map((error) => error.msg)[0]
    res.status(400).json({
      status: 400,
      error: firstError
    })
  }

  //process run to next MiddleWares
  next();
};



exports.createLoginValidator = (req, res, next) => {
  // email validation
  req.check('email', "provide email address").notEmpty();

  //password validation
  req.check('password', "password should not be empty").notEmpty();

  // check for error
  const errors = req.validationErrors();
  //if error show first error
  if(errors){
    const firstError = errors.map((error) => error.msg)[0]
    res.status(400).json({
      status: 400,
      error: firstError
    })
  }

  //process run to next MiddleWares
  next();
};

exports.createMurderValidator = (req, res, next) => {
  // title validation
  req.check('title', "provide title").notEmpty();

  //president validation
  req.check('president', "provide name of president").notEmpty();

  //year validation
  req.check('year', "provide year which murder happened").notEmpty();

  //imageUrl validation
  req.check('imageUrl', "provide url link of image").notEmpty();

  //description validation
  req.check('description', "provide description details").notEmpty();

  // check for error
  const errors = req.validationErrors();
  //if error show first error
  if(errors){
    const firstError = errors.map((error) => error.msg)[0]
    res.status(400).json({
      status: 400,
      error: firstError
    })
  }

  //process run to next MiddleWares
  next();
};
