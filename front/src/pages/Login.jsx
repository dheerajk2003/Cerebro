import { Form, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [repeatPassword, setRepeatPassword] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        // let mydata = new FormData(e.target);
        try {
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            let data = await response.json();

            console.log(data.token);

            if(data.token != null){
                localStorage.setItem("token", data.token);
                navigate("/todo")
            }

        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form class="w-2/6 mx-auto bg-white px-48 py-24 shadow-md rounded-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-12">Login</h1>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => handleChange(e)} type="email" id="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input placeholder="password" onChange={(e) => handleChange(e)} type="password" id="password" name="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="flex items-start mb-5">
                    {/* <div class="flex items-center h-5">
                        <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div> */}
                    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not a User? <Link to="/registration" class="text-red-600 hover:underline dark:text-red-700">Register Now</Link></label>
                </div>
                <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Login into account</button>

                

            </form>

        </div>
    )
}