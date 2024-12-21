const taskRouter = require("./task.router.js");

module.exports = (app) => {
    const version = "/api/v1";

    app.use(version + "/tasks", taskRouter);
}