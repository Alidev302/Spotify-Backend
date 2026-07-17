const imagekit = require("@imagekit/nodejs");

const imagekitInstance = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadImage(file) {
    try {
        const result = await imagekitInstance.files.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname,
        });
        return result;
    } catch (error) {
        throw new Error("Image upload failed");
    }
}

module.exports = uploadImage;