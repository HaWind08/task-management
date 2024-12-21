const express = require("express");
const router = express.Router();

const Task = require("../../../models/task.model");

router.get("/", async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    }).select("title status timeStart timeFinish");

    res.json(tasks);
});

router.get("/detail/:id", async (req, res) => {
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
});

module.exports = router;