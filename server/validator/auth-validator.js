const { z } = require("zod");

// creating an object schema
const registerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .trim()
    .min(3, { message: "Name must be at least of 3" })
    .max(45, { message: "Name must not be more then 45" }),
  phone: z
    .number({
      required_error: "Phone is required!",
    })
    .gte(10000000, { message: "Phone number must be at least 8 digits" })
    .lte(99999999999, {
      message: "Phone number must not be more than 11 digits",
    }),
  email: z
    .string({
      required_error: "email is required!",
    })
    .trim()
    .min(3, { message: "email must be at least of 5" })
    .max(125, { message: "email must not be more then 125" }),
  dateOfBirth: z.string({
    required_error: "dateOfBirth is required!",
  }),
  password: z
    .string({
      required_error: "password is required!",
    })
    .trim()
    .min(8, { message: "password must be at least of 8" }),
});

const loginSchema = z.object({
  email: z.string().optional(),
  phone: z.number().optional(),
  password: z
    .string({
      required_error: "password is required!",
    })
    .trim()
    .min(8, { message: "password must be at least of 8" }),
});
module.exports = { registerSchema, loginSchema };
