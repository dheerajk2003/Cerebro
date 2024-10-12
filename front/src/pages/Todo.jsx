import { useState, useEffect } from "react";


function Todo() {

    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        getTodos();
        getCompletedTasks();
    }, []);

    const handleAddTask = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/createTask`, {
            method: 'POST',
            mode: 'no-cors',
            // body: JSON.stringify({ "task_name" :task })
            body: new URLSearchParams({ task_name: task }).toString(),
        });

        getTodos();
        getCompletedTasks();
        if (task.trim() !== '') {
            setTodos([...todos, task]);
            setTask('');
        }

    };

    const getCompletedTasks = () => {
        fetch('http://localhost:3000/getTasks?type=${1}', {mode: 'no-cors'})
            .then(response => response.json())
            .then(data => {setCompletedTasks(data); console.log(data)});
    };

    const getTodos = () => {
        fetch('http://localhost:3000/getTasks', {mode: 'no-cors'})
            .then(response => response.json())
            .then(data => setTodos(data));
    };

    const handleCompleteTask = (index) => {


        fetch(`http://localhost:3000/updateTask?id=${index}&completed=true`, {
            method: 'PUT'
        });

        const completedTask = todos[index];
        setCompletedTasks([...completedTasks, completedTask]);
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleDeleteTask = (index) => {

        fetch(`http://localhost:3000/deleteTask?id=${index}} `, {
            method: 'DELETE',
            mode: 'no-cors'
        });

        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="h-screen bg-gray-100 flex flex-row justify-around p-4 pt-28 mx-48">
            {/* Left side for input and completed tasks */}
            <div className="w-2/5 flex flex-col items-start">
                {/* Input Form */}


                {/* Completed Tasks */}
                <div className="bg-white shadow-md rounded-lg p-4 w-full mb-4">
                    <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
                    {completedTasks.length === 0 ? (
                        <p className="text-gray-500">No completed tasks yet.</p>
                    ) : (
                        <ul>
                            {completedTasks.map((task, index) => (
                                <li key={index} className="text-green-600 w-full flex justify-between px-12">
                                    <span>{task}</span>
                                    <button className="text-white bg-red-700 font-bold px-2 p- rounded" onClick={() => handleDeleteTask(index)}>X</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="w-2/5 flex flex-col items-start">
                {/* Right side for remaining tasks */}
                <div className="w-full ml-4 bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Remaining Tasks</h2>
                    {todos.length === 0 ? (
                        <p className="text-gray-500">No tasks remaining.</p>
                    ) : (
                        <ul>
                            {todos.map((task, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center mb-2"
                                >
                                    <span>{task}</span>
                                    <span>
                                        <button onClick={() => handleCompleteTask(index)} className="text-xs text-white bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">Complete</button>
                                        <button className="text-white bg-red-700 font-bold px-2 mx-2 rounded" onClick={() => handleDeleteTask(index)}>X</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <form onSubmit={handleAddTask} className="mb-4 flex absolute bottom-0 mx-auto">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default Todo;