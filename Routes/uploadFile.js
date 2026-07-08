const multer = require("multer");
const util = require("util");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
}).single("file");

const fs = require("fs");
const ftpUpload = require("../helpers/ftpUpload");

module.exports = async (req, res) => {
    try {
        await util.promisify(uploadFile)(req, res);
        console.log(req.file);

        if (!req.file) {
            return res.status(400).send({
                message: "Please upload a file."
            });
        }
        console.log("Uploading to FTP...");
        // Upload to GoDaddy FTP
        await ftpUpload(req.file.path, req.file.filename);

        // Delete temporary local file
        fs.unlinkSync(req.file.path);

        res.status(200).send({
            filename: req.file.filename,
            message: "File uploaded successfully."
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Could not upload the file."
        });
    }
};