module.exports = (app) => {
var router = app.Router();

router.use('/v1/auth', require('@api/auth')(router));

return router;
}
