const multer = require("multer")
const path = require("path")

// where & how to store files on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads") // folder to save into
    },
    filename: (req, file, cb) => {
        // make a unique name: fieldname-timestamp.ext
        const ext = path.extname(file.originalname);
        const unique = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, unique)
    }
})

// only allow image files
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const okExt = allowed.test(path.extname(file.originalname).toLowerCase())

    const okMime = allowed.test(file.mimetype)
    if (okExt && okMime){
        cb(null, true); //accept
    } else {
        cb(new Error("Only image files are allowed"), false) //reject
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024}
})

module.exports = upload;

