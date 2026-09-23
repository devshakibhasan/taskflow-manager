import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Search, X } from "../components/Icons";

const API_BASE = import.meta.env.VITE_API_URL || "";
const CLEAN_BASE = API_BASE.replace(/\/+$/, "");
const API_URL = CLEAN_BASE
    ? (CLEAN_BASE.endsWith("/tasks") ? CLEAN_BASE : `${CLEAN_BASE}/tasks`)
    : (typeof window !== "undefined" && window.location.hostname.includes("netlify.app")
        ? "/.netlify/functions/api/tasks"
        : "/tasks");

/**
 * TaskFlow Manager - Home Page Dashboard
 * Manages central application state with useState and passes data via props.
 */
const Home = () => {
    // State Management (Part A, Req 4)
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("pending");
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTab, setFilterTab] = useState("all"); // 'all' | 'pending' | 'completed'

    // Fetch all tasks from backend API (Part B, GET /tasks)
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setTasks(data.tasks || []);
        } catch (error) {
            console.error("Fetch tasks error:", error);
            const msg = error.response?.data?.message || error.message || "Failed to load tasks";
            toast.error(msg);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Reset Form state
    const resetForm = () => {
        setTaskName("");
        setTaskStatus("pending");
        setEditingTask(null);
    };

    // Handle Form Submit (Add via POST /tasks or Update via PUT /tasks/:id)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = taskName.trim();
        if (!trimmed) {
            toast.error("Please enter a task title");
            return;
        }

        setLoading(true);

        try {
            if (editingTask) {
                const targetId = editingTask.id || editingTask._id;
                const { data } = await axios.put(`${API_URL}/${targetId}`, {
                    title: trimmed,
                    status: taskStatus,
                });

                const updated = data.task || data.newTask;
                setTasks((prev) =>
                    prev.map((t) => ((t.id || t._id) === targetId ? updated : t))
                );
                toast.success("Task updated successfully!");
            } else {
                const { data } = await axios.post(API_URL, {
                    title: trimmed,
                });

                const created = data.newTask || data.task;
                setTasks((prev) => [created, ...prev]);
                toast.success("Task created successfully!");
            }
            resetForm();
        } catch (error) {
            console.error("Submit task error:", error);
            const msg = error.response?.data?.message || error.message || "Operation failed";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // Start editing a task
    const handleStartEdit = (task) => {
        setEditingTask(task);
        setTaskName(task.title || task.name || "");
        setTaskStatus(task.status === "completed" || task.isComplete === "yes" ? "completed" : "pending");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete a task (DELETE /tasks/:id)
    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks((prev) => prev.filter((t) => (t.id || t._id) !== taskId));
            if (editingTask && (editingTask.id || editingTask._id) === taskId) {
                resetForm();
            }
            toast.success("Task deleted");
        } catch (error) {
            console.error("Delete task error:", error);
            const msg = error.response?.data?.message || error.message || "Failed to delete task";
            toast.error(msg);
        }
    };

    // Toggle task completion status (PUT /tasks/:id)
    const handleToggleStatus = async (task) => {
        const isDone = task.status === "completed" || task.isComplete === "yes";
        const nextStatus = isDone ? "pending" : "completed";
        const taskId = task.id || task._id;

        try {
            const { data } = await axios.put(`${API_URL}/${taskId}`, {
                status: nextStatus,
            });

            const updated = data.task;
            setTasks((prev) =>
                prev.map((t) => ((t.id || t._id) === taskId ? (updated || { ...t, status: nextStatus, isComplete: nextStatus === "completed" ? "yes" : "no" }) : t))
            );

            if (nextStatus === "completed") {
                toast.success("Task completed!");
            } else {
                toast.info("Task marked active");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            const msg = error.response?.data?.message || error.message || "Failed to update status";
            toast.error(msg);
        }
    };

    // Computed Statistics
    const totalCount = tasks.length;
    const completedCount = tasks.filter(
        (t) => t.status === "completed" || t.isComplete === "yes"
    ).length;
    const pendingCount = totalCount - completedCount;
    const progressRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    // Filtered & Searched Tasks (Memoized)
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const title = (task.title || task.name || "").toLowerCase();
            const matchesSearch = title.includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;

            const isDone = task.status === "completed" || task.isComplete === "yes";
            if (filterTab === "pending") return !isDone;
            if (filterTab === "completed") return isDone;
            return true;
        });
    }, [tasks, searchQuery, filterTab]);

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
            {/* Header & Minimal Stats Summary */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                            TaskFlow Manager
                        </h1>
                        <p className="mt-1 text-xs text-zinc-500">
                            {totalCount === 0
                                ? "No daily tasks yet"
                                : `${pendingCount} pending · ${completedCount} completed (${progressRate}%)`}
                        </p>
                    </div>

                    {totalCount > 0 && (
                        <div className="text-xs font-medium text-zinc-500 sm:text-right">
                            <span>{completedCount}</span>
                            <span className="text-zinc-400"> / </span>
                            <span>{totalCount} done</span>
                        </div>
                    )}
                </div>

                {/* Progress Indicator */}
                {totalCount > 0 && (
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-200">
                        <div
                            className="h-full bg-zinc-900 transition-all duration-300 ease-out"
                            style={{ width: `${progressRate}%` }}
                        />
                    </div>
                )}
            </div>

            {/* TaskForm Component (Part A, Req 3) - receives props */}
            <TaskForm
                onSubmit={handleSubmit}
                taskName={taskName}
                setTaskName={setTaskName}
                taskStatus={taskStatus}
                setTaskStatus={setTaskStatus}
                editingTask={editingTask}
                onCancelEdit={resetForm}
                loading={loading}
            />

            {/* Filter Pills & Search Bar Toolbar */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Filter Pills */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setFilterTab("all")}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                            filterTab === "all"
                                ? "bg-zinc-900 text-white shadow-xs"
                                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                    >
                        All ({totalCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("pending")}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                            filterTab === "pending"
                                ? "bg-zinc-900 text-white shadow-xs"
                                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                    >
                        Pending ({pendingCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("completed")}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                            filterTab === "completed"
                                ? "bg-zinc-900 text-white shadow-xs"
                                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                    >
                        Done ({completedCount})
                    </button>
                </div>

                {/* Minimal Search Bar */}
                <div className="relative w-full sm:w-56">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-8 pr-7 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </div>

            {/* TaskList Component (Part A, Req 3) - receives props */}
            <TaskList
                tasks={filteredTasks}
                onToggle={handleToggleStatus}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
                filterTab={filterTab}
                searchQuery={searchQuery}
                onResetFilters={() => {
                    setSearchQuery("");
                    setFilterTab("all");
                }}
            />

            {/* Toast Container for user notifications */}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                theme="light"
            />
        </div>
    );
};

export default Home;