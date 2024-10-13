import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import scroll from '../assets/AkatsukiLogo.png';

function Notes() {
    const [inputValue, setInputValue] = useState('');
    const [responseValue, setResponseValue] = useState('');
    const [btnState, setBtnState] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    async function handleFileChange(e){
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

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
                setResponseValue([...responseValue, data.response]);
            }

            console.log(data.token);

            if (response.ok) {
                console.log('Registration successful');
            } else {
                console.error('Registration failed');
            }

            if(file != null){
                try{
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch('http://localhost:3000/uploadFile', {
                        method: 'POST',
                        body: formData
                    })

                    const data = await response.json();

                    console.log(data);

                    setResponseValue([...responseValue, data.response]);
                }
                catch(error){
                    console.error('Error during file upload:', error);
                }
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
                <div className='w-24 h-12 relative'>
                    <input type="file" onChange={handleFileChange} name="" id="" className='block w-24 h-12 opacity-0 z-10 absolute' placeholder='File'/>
                    <img src={scroll} alt="" className='w-24 h-12 z-0 absolute cursor-pointer hover:shadow-lg'/>
                </div>
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
