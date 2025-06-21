// middlewares/validatePagination.js

import HttpError from "../helpers/HttpError.js";

const validatePagination = (req, res, next) => {
    let { page = 1, limit = 20, favorite } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) {
        return next(HttpError(400, "Invalid page number"));
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
        return next(HttpError(400, "Invalid limit value"));
    }

    if (favorite !== undefined && favorite !== "true" && favorite !== "false") {
        return next(HttpError(400, "Invalid favorite value"));
    }

    req.pagination = {
        page,
        limit,
        offset: (page - 1) * limit,
        favorite: favorite !== undefined ? favorite === "true" : undefined,
    };

    next();
};

export default validatePagination;