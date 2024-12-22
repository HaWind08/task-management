const Task = require("../models/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    if(req.query.status) {
        find.status = req.query.status
    };

    const tasks = await Task.find(find).select("title status timeStart timeFinish");

    res.json(tasks);
}

// [GET] /api/v1/tasks/detail
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.findOne({
            _id: id,
            deleted: false
        }).select("title status timeStart timeFinish");

        res.json(tasks);
    } catch (error) {
        res.json("Không tìm thấy!");
    }
}