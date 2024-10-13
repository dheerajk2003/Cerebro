import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const [inputValue, setInputValue] = useState('');
    const [responseValue, setResponseValue] = useState('');
    const [btnState, setBtnState] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // let mydata = new FormData(formData);

            setBtnState(true);

            let response = await fetch('http://localhost:3000/askAI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: inputValue
                })
            })

            let data = await response.json();

            if(data.response != null){
                setResponseValue(data.response);
            }

            console.log(data.token);

            if (response.ok) {
                console.log('Registration successful');
            } else {
                console.error('Registration failed');
            }

            setBtnState(false);

        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="relative h-screen flex flex-col items-center justify-end bg-gray-100">
            {/* Large div above the input */}
            <div className="absolute top-12 w-3/5 h-3/4 bg-white flex items-start justify-center shadow-md rounded-lg mx-48 m-20">
                <p className="text-2xl font-bold text-black mt-10">{(responseValue != null && responseValue != "") ? responseValue : "Hi i am your Ai Asistant how can i help you today."}</p>
            </div>

            {/* Input and submit button at the bottom center */}
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 mb-8 flex items-center justify-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="p-4 px-6 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Enter task"
                />
                <button
                    type="submit"
                    style={{backgroundColor: btnState ? "#ccc" : "#cc0000"}}
                    disabled={btnState}
                    className="p-4 px-6 bg-red-500 text-white rounded-r hover:bg-red-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Notes;
