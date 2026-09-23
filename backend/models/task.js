const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        isComplete: {
            type: String,
            enum: ["yes", "no"],
            default: "no",
        },
    },
    {
        collection: "tasks",
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                ret.title = ret.title || ret.name;
                ret.name = ret.name || ret.title;
                ret.status = ret.status || (ret.isComplete === "yes" ? "completed" : "pending");
                ret.isComplete = ret.isComplete || (ret.status === "completed" ? "yes" : "no");
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                ret.title = ret.title || ret.name;
                ret.name = ret.name || ret.title;
                ret.status = ret.status || (ret.isComplete === "yes" ? "completed" : "pending");
                ret.isComplete = ret.isComplete || (ret.status === "completed" ? "yes" : "no");
                return ret;
            },
        },
    }
);

// Synchronize title/name and status/isComplete before saving
taskSchema.pre("save", function () {
    if (this.title && !this.name) this.name = this.title;
    if (this.name && !this.title) this.title = this.name;
    if (this.status) {
        this.isComplete = this.status === "completed" ? "yes" : "no";
    } else if (this.isComplete) {
        this.status = this.isComplete === "yes" ? "completed" : "pending";
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;