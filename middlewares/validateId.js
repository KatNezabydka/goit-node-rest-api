import { validate as isUUID } from 'uuid';

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid id format" });
    }
    next();
};

export default validateId;