import dbClient from "../../db/knex";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {usersTable} from "../../db/tables";
const jwtKey = process.env.JWT_SECRET_KEY;



/**
 * @description - signup controller
 * @param {object} req request object
 * @param {object} res response object
 */
export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let userRecord = await dbClient
      .select("*")
      .from(usersTable)
      .where("email", email);
    if (userRecord.length > 0) {
      let user = userRecord[0];
      let hashedPassword = user.password;
      let passwordIsValid = bcrypt.compareSync(password, hashedPassword);
      if (passwordIsValid) {
        const token = jwt.sign({
          id: user.user_id,
          email: user.email,
          roleId: user.role_id,
        }, jwtKey);
        return res.status(200).json({
          msg: "you are logged in!",
          token,
        });
      } else {
        return res.status(403).json({
          msg: "invalid email or password",
        });
      }
    } else {
      return res.status(403).json({
        msg: "invalid email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "internal server error",
      error: err.message,
    });
  }
};




/**
 * @description - signup controller
 * @param {object} req request object
 * @param {object} res response object
 */
export const signup = async (req, res) => {
  let { email, username, password, role } = req.body;
   role = role || 0;
  try {
    let userRecord = await dbClient
      .select("*")
      .from(usersTable)
      .where("email", email);
    if (userRecord.length === 0) {
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      await dbClient(usersTable).insert({ username, email, password:hashedPassword, role_id: role });
      return res.status(201)
      .json({
          msg: 'account successfully created'
      })
    } else {
        return res.status(403).json({
            msg: "user with specified email exists",
          });
    }
  } catch (err) {
    return res.status(500).json({
        msg: "internal server error",
        error: err.message,
      });
  }
};
