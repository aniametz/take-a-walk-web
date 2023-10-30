import * as Joi from "joi";

export const schema = Joi.object({
  Username: Joi.string().required(),
  Email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  Password: Joi.string()
    .min(10)
    .regex(/[A-Z]+[0-9]+[!@#$%^&*]+/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least one upper case letter, one number and one special character: !@#$%^&*",
    }),
  "Confirm Password": Joi.any().valid(Joi.ref("Password")).required().messages({
    "any.only": "Passwords must match",
  }),
}).required();

export const schemaOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};
