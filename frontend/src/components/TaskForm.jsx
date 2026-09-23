import React from "react";
import { Plus, RotateCcw } from "./Icons";

/**
 * TaskForm Component
 * Adds a new task (input + button) or updates an existing task.
 * Receives all data and action handlers via props.
 */
const TaskForm = ({
    onSubmit,
    taskName,
    setTaskName,
    taskStatus,
    setTaskStatus,
    editingTask,
    onCancelEdit,
    loading = false,
}) => {
    return (
        <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-xs transition-shadow focus-within:border-zinc-400">
            {editingTask && (
                <div className="mb-3 flex items-center justify-between border-b border-zinc-100 pb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                        Editing Task
                    </span>
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 transition"
                    >
                        <RotateCcw className="h-3 w-3" />
                        <span>Cancel Edit</span>
                    </button>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder={editingTask ? "Update task title..." : "Add a new task..."}
                        className="flex-1 bg-transparent px-1 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none"
                        autoFocus={!!editingTask}
                    />

                    {!editingTask && (
                        <button
                            type="submit"
                            disabled={loading || !taskName.trim()}
                            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-40"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            <span>{loading ? "Adding..." : "Add Task"}</span>
                        </button>
                    )}
                </div>

                {editingTask && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-zinc-100">
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-500">Status:</label>
                            <select
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                                className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-800 outline-none focus:border-zinc-400"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !taskName.trim()}
                                className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition disabled:opacity-40"
                            >
                                {loading ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TaskForm;
