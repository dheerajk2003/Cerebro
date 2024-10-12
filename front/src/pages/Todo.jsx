import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {

    const navigate = useNavigate();
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    console.log(todos);
    console.log(completedTasks);

    useEffect(() => {

        if(localStorage.getItem("token") == null){
            navigate("/login");
        }
        // getTodos();
        // getCompletedTasks();
    }, []);

    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (task.trim() !== '') {
            setTodos([...todos, task]);
            setTask('');
        }

        fetch(`http://localhost:3000/createTask?task_name=${encodeURIComponent(task)}&id=${encodeURIComponent(localStorage.getItem("token"))}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const getCompletedTasks = () => {
        fetch('http://localhost:3000/getTasks?type=1')
            .then(response => response.json())
            .then(data => {
                // Ensure data is an array
                setCompletedTasks(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error('Error fetching completed tasks:', error);
                setCompletedTasks([]);
            });
    };

    const getTodos = () => {
        fetch('http://localhost:3000/getTasks')
            .then(response => response.json())
            .then(data => {
                // Ensure data is an array
                // setTodos(Array.isArray(data) ? data : []);
                setTodos(data.tasks);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setTodos([]);
            });
    };

    const handleCompleteTask = (index) => {


        fetch(`http://localhost:3000/updateTask?id=${index}&completed=true`, {
            method: 'PUT'
        });

        const completedTask = todos[index];
        setCompletedTasks([...completedTasks, completedTask]);
        setTodos(todos.filter((_, i) => i !== index));
        setTimeout(() => {
            alert("One Reward Recieved");
        }, 300);
    };

    const handleDeleteTask = (index) => {

        fetch(`http://localhost:3000/deleteTask?id=${index}} `, {
            method: 'DELETE'
        });

        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        // setTodos(todos.filter((_, i) => i !== index));
    };

    const DeleteTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    return (
        <div className="h-screen bg-gray-100 flex flex-col p-24 items-center ">
            <div className="flex flex-grow justify-around w-full items-center">
                {/* Left side for completed tasks */}
                <div className="w-2/5 h-4/5 bg-white shadow-md rounded-lg p-4 mr-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
                    <div className="flex-grow">
                        {completedTasks.length === 0 ? (
                            <p className="text-gray-500">No completed tasks yet.</p>
                        ) : (
                            <ul>
                                {completedTasks.map((task) => (
                                    <li key={task.id} className="text-green-600">
                                        {task.name}
                                        <div>
                                            <button onClick={() => handleDeleteTask(task.id)} className="text-xs text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right side for remaining tasks */}
                <div className="w-2/5 h-4/5 bg-white shadow-md rounded-lg p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-2">Remaining Tasks</h2>
                    <div className="flex-grow">
                        {todos != null && todos.length >= 0 ? (
                            
                            <ul>
                                {todos.map((task) => (
                                    <li
                                        key={task.id}
                                        className="flex justify-between items-center mb-2"
                                    >
                                        {task.name}
                                        <div>
                                        <button onClick={() => handleCompleteTask(task.id)} className="text-xs text-white bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">
                                            Complete
                                            </button>
                                            <button onClick={() => DeleteTask(task.id)} className="text-xs text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-500">No tasks remaining.</p>
                    }
                    </div>
                </div>
            </div>
            <form onSubmit={handleAddTask} className="mb-10 flex absolute bottom-0">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="p-4 px-6 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default Todo;
