import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {

    const navigate = useNavigate();
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [temp, setTemp] = useState();

    console.log(todos);
    console.log(completedTasks);

    useEffect(() => {

        if(localStorage.getItem("token") == null){
            navigate("/login");
        }
        getTodos();
        getCompletedTasks();
    }, []);

    const handleAddTask = async(e) => {
        e.preventDefault();
        
        // if (task.trim() !== '') {
        //     setTodos([...todos, task]);
        //     setTask('');
        // }

        await fetch(`http://localhost:3000/createTask?task_name=${encodeURIComponent(task)}&id=${encodeURIComponent(localStorage.getItem("token"))}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        await getTodos();
        await getCompletedTasks();
        setTask('');

    };

    const getCompletedTasks = async () => {
        await fetch(`http://localhost:3000/getTasks?id=${localStorage.getItem("token")}&type=1`)
            .then(response => response.json())
            .then(data => {
                // Ensure data is an array
                setCompletedTasks(data.tasks);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching completed tasks:', error);
                // setCompletedTasks([]);
            });
    };

    const getTodos = async () => {
        await fetch(`http://localhost:3000/getTasks?id=${localStorage.getItem("token")}`)
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

    const handleCompleteTask = async (index) => {


        await fetch(`http://localhost:3000/updateTask?task_id=${index}&completed=1&id=${localStorage.getItem("token")}`, {
            method: 'PATCH'
        });

        // const completedTask = todos[index];
        // setCompletedTasks([...completedTasks, completedTask]);
        // setTodos(todos.filter((_, i) => i !== index));
        await getTodos();
        await getCompletedTasks();

        // setTimeout(() => {
        //     alert("One Reward Recieved");
        // }, 300);
        
    };

    const handleDeleteTask = async (index) => {

        await fetch(`http://localhost:3000/deleteTask?id=${index}`, {
            method: 'DELETE'
        });

        await getTodos();
        await getCompletedTasks();

        // setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        // setTodos(todos.filter((_, i) => i !== index));
    };

    // const DeleteTask = (index) => {
    //     setTodos(todos.filter((_, i) => i !== index));
    // }

    return (
        <div className="h-screen bg-gray-100 flex flex-col p-24 items-center ">
            <div className="flex flex-grow justify-around w-full items-center">
                {/* Left side for completed tasks */}
                <div className="w-2/5 h-4/5 bg-white shadow-md rounded-lg p-4 mr-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
                    <div className="flex-grow">
                        {completedTasks != null &&completedTasks.length >= 0 ? 
                        (
                            <ul>
                                {completedTasks.map((task) => (
                                    <li key={task.id} className="flex justify-between items-center m-2 bg-gray-100 p-2 rounded-md">
                                        <p>{task.name}</p>
                                        <div>
                                            <button onClick={() => handleDeleteTask(task.id)} className="text-xs text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ):(
                            <p className="text-gray-500">No completed tasks yet.</p>
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
                                        className="flex justify-between items-center m-2 bg-gray-100 p-2 rounded-md"
                                    >
                                        {task.name}
                                        <div>
                                        <button onClick={() => handleCompleteTask(task.id)} className="text-xs text-white bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">
                                            Complete
                                            </button>
                                            <button onClick={() => handleDeleteTask(task.id)} className="text-xs text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600">
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
