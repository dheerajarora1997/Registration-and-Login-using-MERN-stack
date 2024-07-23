const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const err = {
      status: 422,
      message: error.issues,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

module.exports = validate;
