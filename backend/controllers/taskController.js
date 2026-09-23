const mongoose = require("mongoose");
const Task = require("../models/task");
const asyncHandler = require("../middlewares/asyncHandler");

/**
 * Helper to validate MongoDB ObjectId
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Fetch all tasks (sorted by latest first)
 * @route   GET /tasks, GET /api/tasks, GET /api/all-task
 */
const allTask = asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
    });
});

/**
 * @desc    Fetch single task by ID
 * @route   GET /tasks/:id, GET /api/tasks/:id, GET /api/single-task/:id
 */
const getSingleTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid or missing Task ID");
    }

    const task = await Task.findById(id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json({
        success: true,
        task,
    });
});

/**
 * @desc    Create a new task
 * @route   POST /tasks, POST /api/tasks, POST /api/add-task
 */
const addTask = asyncHandler(async (req, res) => {
    const title = (req.body.title || req.body.name || "").trim();

    if (!title) {
        res.status(400);
        throw new Error("Task title is required");
    }

    const status = req.body.status || (req.body.isComplete === "yes" ? "completed" : "pending");
    const isComplete = status === "completed" || req.body.isComplete === "yes" ? "yes" : "no";

    const newTask = await Task.create({
        title,
        name: title,
        status,
        isComplete,
    });

    res.status(201).json({
        success: true,
        newTask,
        task: newTask,
    });
});

/**
 * @desc    Update task details or mark complete
 * @route   PUT /tasks/:id, PUT /api/tasks/:id, PUT /api/update-task/:id
 */
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid or missing Task ID");
    }

    const existingTask = await Task.findById(id);
    if (!existingTask) {
        res.status(404);
        throw new Error("Task not found");
    }

    const updateFields = {};

    // Handle Title / Name
    if (req.body.title !== undefined || req.body.name !== undefined) {
        const title = (req.body.title !== undefined ? req.body.title : req.body.name || "").trim();
        if (!title) {
            res.status(400);
            throw new Error("Task title cannot be empty");
        }
        updateFields.title = title;
        updateFields.name = title;
    }

    // Handle Status / isComplete (Default to completed if PUT called with no body for "mark complete")
    if (req.body.status !== undefined) {
        if (!["pending", "completed"].includes(req.body.status)) {
            res.status(400);
            throw new Error("Status must be either 'pending' or 'completed'");
        }
        updateFields.status = req.body.status;
        updateFields.isComplete = req.body.status === "completed" ? "yes" : "no";
    } else if (req.body.isComplete !== undefined) {
        if (!["yes", "no"].includes(req.body.isComplete)) {
            res.status(400);
            throw new Error("isComplete must be either 'yes' or 'no'");
        }
        updateFields.isComplete = req.body.isComplete;
        updateFields.status = req.body.isComplete === "yes" ? "completed" : "pending";
    } else if (req.body.title === undefined && req.body.name === undefined) {
        // Direct call to PUT /tasks/:id with empty body marks task as completed as per spec standard
        updateFields.status = "completed";
        updateFields.isComplete = "yes";
    }

    const updatedData = await Task.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        task: updatedData,
    });
});

/**
 * @desc    Delete a task
 * @route   DELETE /tasks/:id, DELETE /api/tasks/:id, DELETE /api/delete-task/:id
 */
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid or missing Task ID");
    }

    const deletedData = await Task.findByIdAndDelete(id);

    if (!deletedData) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        task: deletedData,
    });
});

module.exports = {
    allTask,
    getSingleTask,
    addTask,
    updateTask,
    deleteTask,
};