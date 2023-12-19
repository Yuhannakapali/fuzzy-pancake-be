
import express from "express";
import multer from "multer";
// const upload = multer({ dest:"public/upload" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
})
const upload = multer({storage: storage});

const router = express.Router();


router.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({
        success: false
      });
    } else {
      console.log('file received', req.file);
      return res.send({
        success: true
      })
    }
  });
  
  export {router as fileUpload}