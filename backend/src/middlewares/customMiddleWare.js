import multer from "multer";
import { v4 as uuidv4 } from "uuid"; // uid for file

// This check makes sure this is a JSON parsing issue, but it might be
// coming from any middleware, not just body-parser:
export const parserErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err)
    return res.sendStatus(400); // Bad request
  next();
};

const whitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
];

// multer middle ware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/images");
  },
  filename: function (req, file, cb) {
    if (!whitelist.includes(file.mimetype))
      return cb(new Error("file is not allowed"));

    const uniqueSuffix = uuidv4() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "IMG" + "_" + uniqueSuffix + "_" + file.originalname);
  },
});

export const multerUpload = multer({ storage: storage });
