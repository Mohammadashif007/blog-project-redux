// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloudinaryUpload } from "./cloudinary.config";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryUpload,
//   params: {
//     public_id: (req, file) => {
//       const fileName = file.originalname
//         .toLocaleLowerCase()
//         .replace(/\s+/g, "-") //!empty space remove replace with dash
//         .replace(/\./g, "-") //! remove dote with dash
//         .replace(/[^a-zA-Z0-9]/g, ""); //! remove non alfa numeric characters

//       const extension = file.originalname.split(".").pop();
//       const uniqueFilename =
//         Math.random().toString(36).substring(2) +
//         "-" +
//         Date.now() +
//         "-" +
//         fileName +
//         "." +
//         extension;
//       return uniqueFilename;
//     },
//   },
// });

// export const multerUpload = multer({ storage: storage });

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const fileName = file.originalname
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .replace(/[^a-zA-z0-9]/g, "");

      const extension = file.originalname.split(".").pop();
      const uniqueFilename =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;
      return uniqueFilename;
    },
  },
});

export const multerUpload = multer({ storage: storage });
