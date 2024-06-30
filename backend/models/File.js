const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    password: String,
    expiresAt: Date,
});
module.exports = mongoose.model('File', fileSchema);
