import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/uploads');

  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpeg`);

  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('img'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;