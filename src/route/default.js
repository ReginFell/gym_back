module.exports = (app) =>{
app.use((req, res) => {
    let error = new Error();
    error.error_code = 404;
    error.name = "Не найдено";
    res.status(404).send(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: 'Something went terribly wrong!'});
});
}