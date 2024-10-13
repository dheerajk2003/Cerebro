import { useState } from 'react';

export default function Test(){
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [questionCount, setQuestionCount] = useState(1);
    const [btnState, setBtnState] = useState(false);

    const [result, setResult] = useState([
        {
            question: 'What is the capital of France?',
            answer: 'Paris',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answer: 'Mars',
            options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
        },
        {
            question: 'What is the largest ocean on Earth?',
            answer: 'Pacific Ocean',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        },
    ]);

    // Handlers to update state based on input changes
    const handleInputOneChange = (e) => setInputOne(e.target.value);
    const handleInputTwoChange = (e) => setInputTwo(e.target.value);

    async function handleSubmit(e){
        e.preventDefault();
        setBtnState(true);

        const response = await fetch('http://localhost:3000/createTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({topic: inputOne, subtopic: inputTwo, token: localStorage.getItem('token'), subject: inputOne, questionCount: questionCount})
        })
        const data = await response.json();
        setResult(data);
        setBtnState(false);

        console.log(data);

    }

    return (
        <div className="flex justify-start items-center gap-5 h-screen bg-gray-100">
            {/* Container for the form */}
            <div className="w-1/3 p-8 bg-white shadow-md rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputOne">
                            Topic
                        </label>
                        <input
                            type="text"
                            id="inputOne"
                            value={inputOne}
                            onChange={handleInputOneChange}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputTwo">
                            Sub Topic
                        </label>
                        <input
                            type="text"
                            id="inputTwo"
                            value={inputTwo}
                            onChange={handleInputTwoChange}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputTwo">
                            Question Count
                        </label>
                        <input
                            type="number"
                            id="count"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            max={5}
                            min={1}
                        />
                    </div> */}
                    <button type="submit" style={{backgroundColor: btnState ? "#ccc" : "#cc0000"}} className="w-full bg-red-700 text-white px-4 py-2 rounded-lg">Submit</button>
                </form>
            </div>
            <div>

            </div>

            {/* Right side - Questions */}
            <div className="w-2/3 h-8/10 p-8 bg-white shadow-md rounded-lg overflow-y-scroll">
                
                { (result.map != null && result.length > 0) ?
                (result.map((item, index) => (
                    <div
                        key={index}
                        className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {item.question}
                        </h3>
                        <div className="mb-4">
                            {item.options.map((option, optionIndex) => (
                                <div
                                    key={optionIndex}
                                    className="flex items-center mb-1"
                                >
                                    <p
                                        type="radio"
                                        name={`question-${index}`}
                                        id={`option-${index}-${optionIndex}`}
                                        className="mr-2"
                                    ></p>
                                    <label
                                        htmlFor={`option-${index}-${optionIndex}`}
                                        className="text-gray-700"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            <strong>Answer:</strong> {item.answer}
                        </p>
                    </div>
                ))): <p>No questions found</p>}
            </div>
        
        </div>
    );
}