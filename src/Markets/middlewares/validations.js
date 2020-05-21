import validator from "validator";

/**
 * @description - checks if market information is valid or not.
 */
export const validateMarket = (req, res, next) => {
  const { name, description, address, categoryId, imageUrl } = req.body;
  let errors = [];
  if (!validString(name)) errors.push("name cannot be blank");

  if (!validString(description)) errors.push("description cannot be blank");
  if (!validString(address) || address.length < 5)
    errors.push("please enter a valid address");
  if (!categoryId || !validator.isInt(categoryId))
    errors.push("categoryId  cannot be blank");
  if (!validString(imageUrl)) errors.push("imageUrl cannot be blank");

  if (errors.length > 0) {
    return res.status(400).json({
      msg: "validation errors encountered while creating market",
      errors,
    });
  }
  next();
};

const validString = (string) => {
  let valid = true;
  if (!string || typeof string == null) valid = false;
  if (string && validator.isEmpty(string, {ignore_whitespace:true})) valid = false;
  return valid;
};
