const validation = (schema) => async (req, res, next) => {
    const body = req.body;

    try {
        await schema.validate(body, { abortEarly: false });
        return next();
    } catch (validationError) {
        const errors = validationError.inner.map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({ errors });
    }
};

export default validation;
