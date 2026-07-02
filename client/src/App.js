import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = "69f30caaa96bceeb7813c7c0";

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/tasks/${userId}`
      );

      const data = await res.json();

      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          userId,
        }),
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // TOGGLE TASK
  const toggleTask = async (task) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-[#111827] border-r border-gray-800 p-8 flex flex-col">
        
        <h1 className="text-3xl font-bold mb-12 tracking-tight">
          TodoIt
        </h1>

        <div className="space-y-3">
          <div className="bg-blue-500/20 text-blue-400 px-4 py-3 rounded-xl">
            All Tasks
          </div>

          <div className="text-gray-400 px-4 py-3 hover:bg-gray-800 rounded-xl transition cursor-pointer">
            Pending
          </div>

          <div className="text-gray-400 px-4 py-3 hover:bg-gray-800 rounded-xl transition cursor-pointer">
            Completed
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-[1px] rounded-2xl">
            <div className="bg-[#111827] rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-2">
                Productivity
              </p>

              <h2 className="text-2xl font-bold">
                {tasks.length} Tasks
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 overflow-auto">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My Tasks
            </h1>

            <p className="text-gray-400">
              Manage your daily workflow
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              className="bg-[#1e293b] border border-gray-700 px-5 py-3 rounded-2xl outline-none w-80 focus:border-blue-500"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl font-semibold transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">Total Tasks</p>

            <h2 className="text-4xl font-bold">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">Completed</p>

            <h2 className="text-4xl font-bold text-green-400">
              {tasks.filter((t) => t.completed).length}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">Pending</p>

            <h2 className="text-4xl font-bold text-yellow-400">
              {tasks.filter((t) => !t.completed).length}
            </h2>
          </div>
        </div>

        {/* TASK SECTION */}
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Task List
            </h2>

            <p className="text-gray-400">
              {tasks.length} items
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500 py-10">
              Loading...
            </p>
          )}

          {/* EMPTY */}
          {!loading && tasks.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-3">
                No Tasks Yet
              </h2>

              <p className="text-gray-500">
                Add your first task to get started
              </p>
            </div>
          )}

          {/* TASKS */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-[#1e293b] border border-gray-700 rounded-2xl p-5 flex justify-between items-center hover:border-blue-500 transition"
              >
                
                <div
                  onClick={() => toggleTask(task)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      task.completed
                        ? "bg-green-400 border-green-400"
                        : "border-gray-500"
                    }`}
                  ></div>

                  <p
                    className={`text-lg ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;