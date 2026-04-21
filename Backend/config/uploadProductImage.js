const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "uploads", "products");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || "").toLowerCase();
        const baseName = path
            .basename(file.originalname || "product-image", ext)
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

        cb(null, `${Date.now()}-${baseName || "product-image"}${ext}`);
    },
});

function fileFilter(_req, file, cb) {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
        return cb(null, true);
    }

    return cb(new Error("Chi cho phep tai len file anh"));
}

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
