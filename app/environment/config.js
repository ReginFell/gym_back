module.exports = {
    db: process.env.MONGODB_URI || "mongodb://localhost:27017/gym",
    auth_secret: 'Test JWT Secret'
};