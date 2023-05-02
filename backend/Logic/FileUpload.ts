import path from "path";
import multer from "multer";
import dal_mysql from "../Utils/dal_mysql";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: async (req, file, cb) => {
    const vacationId = req.params.id;
    const originalName = file.originalname.split(".")[0];
    const ext = path.extname(file.originalname);
    const fileName = `${vacationId}_${originalName}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
