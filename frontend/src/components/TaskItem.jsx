import React from "react";
import { Check, Edit3, Trash2 } from "./Icons";

/**
 * TaskItem Component
 * Displays an individual task item with options to complete, edit, and delete.
 * Receives data and callbacks via props.
 */
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
    const isDone = task.status === "completed" || task.isComplete === "yes";
    const taskId = task.id || task._id;
    const taskTitle = task.title || task.name;

    const formattedDate = task.createdAt
        ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
          }).format(new Date(task.createdAt))
        : null;

    return (
        <div
            className={`group flex items-center justify-between gap-3 px-4 py-3 sm:px-5 transition-colors ${
                isDone ? "bg-zinc-50/50" : "hover:bg-zinc-50/60"
            }`}
        >
            {/* Completion Toggle & Title */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
                <button
                    type="button"
                    onClick={() => onToggle(task)}
                    aria-label={isDone ? "Mark as pending" : "Mark as completed"}
                    className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isDone
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-300 hover:border-zinc-500 bg-white"
                    }`}
                >
                    {isDone && <Check className="h-3 w-3" />}
                </button>

                <div className="min-w-0 flex-1">
                    <p
                        className={`text-sm leading-snug break-words transition-colors ${
                            isDone
                                ? "text-zinc-400 line-through"
                                : "text-zinc-800"
                        }`}
                    >
                        {taskTitle}
                    </p>
                    {formattedDate && (
                        <span className="text-[11px] text-zinc-400">
                            {formattedDate}
                        </span>
                    )}
                </div>
            </div>

            {/* Action buttons: Edit and Delete */}
            <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {onEdit && (
                    <button
                        type="button"
                        onClick={() => onEdit(task)}
                        title="Edit task"
                        className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 transition"
                    >
                        <Edit3 className="h-3.5 w-3.5" />
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => onDelete(taskId)}
                    title="Delete task"
                    className="rounded-md p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
