const User = require('@models/mongo/user.model.js');
const UserMySQL = require('@models/mysql/user.model.js');
const { AppError } = require('@middlewares/handle_error.js');

exports.signup = async (req, res, next) => {

  const {email} = req.body;
  const userExist = await User.findOne({email});
    
  if (userExist) {
    return  next(new AppError('E-mail already exists', 400));
  }

  try {
    // create user in mysql
    await UserMySQL.create(req.body);
    // create user in mongo
    const user = await User.create(req.body);
    // response with success
    res.status(201).json({  
      success: true,
      statusCode: 201,
      user
    });
        
  } catch (error) {
    console.log(error);
    next(error);
        
  }
   
};


exports.signin = async (req, res, next) => {

  try {
    const {email, password} = req.body;
    if (!email || !password) {
       
      return  next(new AppError('E-mail and password are required', 400));
    }

    // check user e-mail
    const user = await User.findOne({email});
    if (!user) {
           
      return  next(new AppError('Invalid credentials', 400));
    }

    const user_mysql = await UserMySQL.findOne({ where: { email } });
    if (!user_mysql) {
           
      return  next(new AppError('Invalid credentials in mysql', 400));
    }

    // verify user password in mongo
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
         
      return  next(new AppError('Invalid credentials', 400));
    }

    // verify user password in mysql
    const isPasswordMatched = await user_mysql.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new AppError('Invalid credentials in mysql', 400));
    }

    // generate token in mongo
    generateToken(user, 200, res);
  }
  catch (error) {
    console.log(error);
       
    next(new AppError('Cannot log in, check your credentials', 400));
  }
   
};


const generateToken = async (user, statusCode, res) => {

  const token = await user.jwtGenerateToken();

  const options = { expires: new Date(new Date().getTime() + 5 * 60 * 1000), httpOnly: true };

  res.status(statusCode).cookie('token', token, options).json({success: true, statusCode, token});
};


//LOG OUT USER
exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Logged out'
  });
};


// USESR PROFILE 
exports.userProfile = async (req, res, next) => {
  console.log(req);

  // const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    statusCode: 200,
    user : req.user
  });
};


exports.singleUser = async (req, res, next) => {

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({
      sucess: true,
      statusCode: 200,
      user
    });
        
  } catch (error) {
    next(error);
        
  }
   
};