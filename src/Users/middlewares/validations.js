import validator from 'validator';

/**
 * @description - checks if email is valid or not.
 * @param {array} errors  - array to contain all validation errors
 * @param {string} email - email to be checked.
 */
const validateEmail = (errors, email) => {
  if (!email) {
    errors.push("email is required");
  }
  if (email && !validator.isEmail(email)) {
    errors.push("Email is invalid");
  }
};



/**
 * @description - checks if password is valid or not
 * @param {array} errors  - array to contain all validation errors
 * @param {string} password - password to be checked.
 */
const validatePassword = (errors, password) => {
  if (!password) {
    errors.push("Password is required");
  }
  if (password && password.length < 6) {
    errors.push("Password must be a minimum of 6 characters");
  }
};




/**
 * @description - validates login.
 * @param {req} req  - request object
 * @param {res} res - response object
 */
export const validateLogin = (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];
  validateEmail(errors, email);
  if(!password) errors.push('password is required');
    if(errors.length > 0 ){
      return res.status(400)
      .json({
        success: false,
        errors
      })
    }
    next();
};





/**
 * @description - validates signup.
 * @param {req} req  - request object
 * @param {res} res - response object
 */
export const validateSignup = (req, res, next) => {
    let { email, password } = req.body;
    let errors = [];
    validateEmail(errors, email);
    validatePassword(errors, password);
      if(errors.length > 0 ){
        return res.status(400)
        .json({
          success: false,
          errors
        })
      }
      next();
  };
  