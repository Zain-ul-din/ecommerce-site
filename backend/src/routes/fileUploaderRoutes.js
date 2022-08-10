import { Router } from "express";
import { multerUpload } from "../middlewares/customMiddleWare.js";
import fs from "fs";

export const fileUploaderRouter = Router();

const uploadSingleFile = multerUpload.single("image_upload");

fileUploaderRouter
  .get("/:img", (req, res) => {
    const path = `${process.cwd()}/static/images/${req.params.img}`;
    res.sendFile(path, (err) => {
      if (err) res.send("#");
    });
  })
  .post("/", (req, res) => {
    uploadSingleFile(req, res, (err) => {
      if (err)
        return res.status(400).send({ status: "fail", error: err.message });
      else
        res.send({
          status: "success",
          data: req.file === undefined ? null : req.file.filename,
        });
    });
  })
  .delete("/:img", (req, res) => {
    let error = null;
    try {
      fs.unlinkSync(`${process.cwd()}/static/images/${req.params.img}`);
    } catch (err) {
      error = err;
    }

    if (error) res.send({ status: "fail", data: {} });
    else res.send({ status: "success", data: {} });
  });
