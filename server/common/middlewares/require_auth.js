const {NotAuthorizedError} = require("../errors/not-authorized-error");
export const requireAuth = (req, res, next) => {
    if (!req.user) {
        throw new NotAuthorizedError();
    }
    next();
};