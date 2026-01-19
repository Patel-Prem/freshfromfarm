import { body, validationResult } from "express-validator";

const validator = {
  userCreationRules: () => {
    return [
      body("first_name")
        .notEmpty()
        .withMessage("First name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
      body("last_name")
        .notEmpty()
        .withMessage("Last name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
      body("mobile_no")
        .notEmpty()
        .withMessage("mobile Number is required")
        .bail()
        .isMobilePhone()
        .withMessage("Invalid mobile Number")
        .bail()
        .isLength({ min: 10, max: 10 })
        .withMessage("mobile number must have 10 digits"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid Email"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("The minimum password length is 6 characters"),
      // Uncomment if you want to validate is_merchant field
      // body("is_merchant")
      //   .isBoolean().withMessage("is_merchant must be a boolean"),
    ];
  },

  userLoginRules: () => {
    return [
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid Email"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("The minimum password length is 6 characters"),
      // Uncomment if you want to validate is_merchant field
      // body("is_merchant")
      //   .isBoolean().withMessage("is_merchant must be a boolean"),
    ];
  },

  produceAddRules: () => {
    return [
      body("name").notEmpty().withMessage("Produce Name is required"),
      body("description")
        .notEmpty()
        .withMessage("Produce Description is required"),
      body("price")
        .notEmpty()
        .withMessage("Produce Price is required")
        .bail()
        .isFloat()
        .withMessage("Produce Price must be a numeric value"),
      body("quantity_unit").notEmpty().withMessage("Quantity Unit is required"),
      body("quantity")
        .notEmpty()
        .withMessage("How many/much item(s) you have instock?")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Minimum quantity is 1"),
    ];
  },

  validateRule: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    console.log("extracted Errors", extractedErrors);
    return res.status(400).json({
      status: 0,
      responseType: "error",
      message: extractedErrors,
    });
  },
};

export default validator;
