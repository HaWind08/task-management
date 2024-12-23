const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status
    };

    // pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    };
    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    );

    // sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    };

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
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