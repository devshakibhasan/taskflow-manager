const express = require("express");
const {
    allTask,
    getSingleTask,
    addTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Specification RESTful endpoints (Part B)
router.route("/tasks")
    .get(allTask)
    .post(addTask);

router.route("/tasks/:id")
    .get(getSingleTask)
    .put(updateTask)
    .delete(deleteTask);

// Direct root mapping when mounted on /tasks or /api/tasks
router.route("/")
    .get(allTask)
    .post(addTask);

router.route("/:id")
    .get(getSingleTask)
    .put(updateTask)
    .delete(deleteTask);

// Backwards compatibility endpoints
router.get("/all-task", allTask);
router.post("/add-task", addTask);
router.get("/single-task/:id", getSingleTask);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;