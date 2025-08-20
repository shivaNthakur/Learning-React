// src/components/AddTodo.jsx
import React from "react";

function AddTodo({ isUpdating, handleAddTodo, handleUpdateTodo, updateInput, setUpdateInput }) {
    return (
        <div className="flex items-center justify-center mt-4">
            <input
                type="text"
                placeholder="Enter Todo"
                className="p-2 mr-2 border-2 border-gray-300 rounded"
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
            />
            <button
                onClick={() => {
                    if (isUpdating) {
                        handleUpdateTodo();
                    } else {
                        handleAddTodo();
                    }
                }}
                className={`px-4 py-2 text-white rounded ${isUpdating ? 'bg-blue-500' : 'bg-green-500'} hover:opacity-80`}
            >
                {isUpdating ? "Update Todo" : "Add Todo"}
            </button>
        </div>
    );
}

export default AddTodo;



















// import React, {use, useState} from "react";
// import {useDispatch} from "react-redux"; // it is property of react to wireup it with redux.
// import { addTodo } from "../features/todo/todoSlice";

// function AddTodo() {

//     const [input, setInput] = useState('')
//     const dispatch = useDispatch()

//     const addTodoHandler = (e) => {
//         e.preventDefault() // to prevent auto submit 
//         dispatch(addTodo(input)) // useDispatch is use reducers to store value in  store.
//         setInput('') // to empty setInput after todo is added.
//     }

    
//     return (
//         <form   onSubmit={addTodoHandler}
//                 className="mt-12 space-x-3" >
//             <input 
            
//                 type="text" 
//                 value={input}
//                 className="px-3 py-1 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-800 border border-gray-700 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
//                 placeholder="Enter a Todo"
//                 onChange={(e) => setInput(e.target.value)}
                
//             />
//             <button 
//                 type="submit"
//                 className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
//             >
//                 Add Todo
//             </button>
//         </form>
//     )

// }


// export default AddTodo
