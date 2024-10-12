import React, { useState } from 'react';

function Notes() {
    const [inputValue, setInputValue] = useState('');
    const [responseValue, setResponseValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // let mydata = new FormData(formData);

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

        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="relative h-screen flex flex-col items-center justify-end bg-gray-100">
            {/* Large div above the input */}
            <div className="absolute top-0 w-full h-3/4 bg-gray-300 flex items-start justify-center mx-48 m-24">
                <p className="text-2xl font-bold text-black">{responseValue}</p>
            </div>

            {/* Input and submit button at the bottom center */}
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 mb-8 gap-3 flex items-center justify-center"

                
            >
                <h3 className="text-2xl font-bold text-red-500">Akatsuki Ai</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border rounded-l px-4 py-2"
                    placeholder="Enter task"
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Notes;
