import path from "path";
import multer from "multer";
import fs from "fs";

const findImage = async (vacationId: number) => {
  console.log("searching for image in backend...");
  const folderPath = path.join(__dirname, "../public");
  const files = fs.readdirSync(folderPath);
  const image = files.find((file) => file.includes(`${vacationId}_`));

  for (const file of files) {
    if (file.includes(`${vacationId}_`)) {
      return file;
    }
  }
};

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "public");
  },
  filename: async (req: any, file: any, cb: any) => {
    const vacationId = req.params.id;
    const originalName = file.originalname.split(".")[0];
    const ext = path.extname(file.originalname);
    const fileName = `${vacationId}_${originalName}${ext}`;
    cb(null, fileName);
    const existingFile = await findImage(+vacationId);
    if (existingFile) {
      fs.unlinkSync(path.join(__dirname, "../public", existingFile));
      console.log("image file deleted successfully");
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
