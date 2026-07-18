const jwt = require("jsonwebtoken");

const authartistMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (decode.role !== "artist") {
            return res.status(403).json({ message: 'you are not an artist' });
        }
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const authuserMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (decode.role !== "user") {
            return res.status(403).json({ message: 'you are not a user' });
        }
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authartistMiddleware, authuserMiddleware };