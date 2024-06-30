const File = require('../models/File');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

exports.uploadFile = async (req, res) => {
    const { password, expiresAt } = req.body;
    const file = req.file;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const newFile = new File({ 
        filename: file.filename,
        path: file.path,
        password: hashedPassword,
        expiresAt 
    });
    await newFile.save();
    res.json({ message: 'File uploaded successfully', fileId: newFile._id });
};
