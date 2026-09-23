import React from "react";
import TaskItem from "./TaskItem";
import { ListTodo } from "./Icons";

/**
 * TaskList Component
 * Displays tasks in a clean list or an empty state.
 * Implements Props to pass data to children (TaskItem).
 */
const TaskList = ({
    tasks,
    onToggle,
    onEdit,
    onDelete,
    filterTab = "all",
    searchQuery = "",
    onResetFilters,
}) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="rounded-xl border border-zinc-200 bg-white py-12 px-4 text-center shadow-xs">
                <ListTodo className="mx-auto h-6 w-6 text-zinc-300 mb-2" />
                <p className="text-sm font-medium text-zinc-700">No tasks found</p>
                <p className="mt-1 text-xs text-zinc-400 max-w-xs mx-auto">
                    {searchQuery
                        ? "No tasks match your search filter."
                        : filterTab !== "all"
                        ? `You have no ${filterTab} tasks.`
                        : "Your task list is empty. Add a task above to get started."}
                </p>
                {(searchQuery || filterTab !== "all") && onResetFilters && (
                    <button
                        onClick={onResetFilters}
                        className="mt-3 text-xs font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
                    >
                        Reset filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-zinc-200 bg-white shadow-xs divide-y divide-zinc-100 overflow-hidden">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id || task._id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
