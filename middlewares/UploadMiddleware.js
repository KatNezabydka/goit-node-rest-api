// import multer from 'multer';
// import {resolve} from "node:path";
// import HttpError from "../helpers/HttpError.js";
//
// const tempDir = resolve("temp");
//
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, tempDir);
//     },
//     filename: (req, file, callback) => {
//         const filename = `${Date.now()}_${file.originalname}`
//         callback(null, filename);
//     }
// });
//
// export const upload = multer({storage});

import multer from 'multer';
import { resolve } from 'node:path';

const tempDir = resolve('temp');

class UploadMiddleware {
    constructor() {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, tempDir);
            },
            filename: (req, file, callback) => {
                const filename = `${Date.now()}_${file.originalname}`;
                callback(null, filename);
            }
        });

        this.upload = multer({ storage });
    }
}

export default new UploadMiddleware();