const {HttpError} = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {
        const keys = Object.keys(req.body);
        if (req.method === "PUT" && keys.length === 0) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        if (req.method === 'PUTCH' && keys.length === 0) {
            return res.status(400).json({ message: "missing field favorite" });
        }
        const { error } = schema.validate(req.body);
        if (error) {
            const missingField = error.details[0].context.key;
         next(HttpError(400, `missing required ${missingField} field`));
        }
        next();
    }
    return func;
}

module.exports = validateBody;
