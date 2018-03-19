module.exports = (mongoose, config) => {
mongoose.connect(config.db)
    .then(() => {
        console.log('Database is connected')
    })
    .catch((err) => {
        console.log('Can not connect to the database' + err)
    });
}