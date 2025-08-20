// src/components/Todos.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../features/todo/todoSlice";
import AddTodo from "./AddTodo";

function Todos() {

    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState(null);
    const [updateInput, setUpdateInput] = useState("");

    const handleAddTodo = () => {
        if (updateInput.trim() === "") return;
        dispatch(addTodo(updateInput));
        setUpdateInput("");
    };

    const handleUpdateTodo = () => {
        if (updateInput.trim() === "") return;

        dispatch(updateTodo({ id: currentTodoId, newText: updateInput }));

        setIsUpdating(false);
        setCurrentTodoId(null);
        setUpdateInput("");
    };

    const handleEditClick = (todo) => {
        setIsUpdating(true);
        setCurrentTodoId(todo.id);
        setUpdateInput(todo.text);
    };

    return (
        <>
            <AddTodo
                isUpdating={isUpdating}
                handleAddTodo={handleAddTodo}
                handleUpdateTodo={handleUpdateTodo}
                updateInput={updateInput}
                setUpdateInput={setUpdateInput}
            />

            <ul className="mt-4 list-none">
                {todos.map((todo) => (
                    <li
                        className="flex items-center justify-between px-4 py-2 mt-4 rounded bg-zinc-800"
                        key={todo.id}
                    >
                        <div className="text-white">{todo.text}</div>

                        {/* Update Icon */}
                        <button
                            onClick={() => handleEditClick(todo)}
                            className="px-4 py-1 mr-2 text-white bg-blue-500 border-0 rounded focus:outline-none hover:bg-blue-600 text-md"
                        >
                            {/* Pencil Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487a2.25 2.25 0 113.182 3.182L7.5 20.213 3 21l.787-4.5L16.862 4.487z"
                                />
                            </svg>
                        </button>

                        {/* Delete Icon */}
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="px-4 py-1 text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600 text-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;






















// // To display all todos in list;
// // Delte icon is give in list;
// // Update icon also given in list;
// // we need dispatch whenever we performing some action t dispatch that action.



// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeTodo, updateTodo } from "../features/todo/todoSlice";


// function Todos() {

   
//     const todos = useSelector(state => state.todos);
//     const dispatch = useDispatch();
    

//     return (
//         <>
//         <div>Todos</div>
//         {/*
//             todos.map((todo) => (
//                 <li key={todo.id}>
//                     {todo.text}
                    
//                     <button 
//                         name="updateButton"
//                         onClick={() => dispatch(updateTodo({id: todo.id,newTxt: newtext}))}
                        
//                     > 
//                         U
//                     </button>

//                    <button name="removeButton" onClick={() => dispatch(removeTodo(todo.id))}>X</button> {/* here we need to pass the function not the reference since if we pass onClick(dispatch(removeTodo(todo.id)))  then it will delete it even without clicking on button 
//                 </li>
//             ))
//         */}
//         <ul className="list-none">
//             {todos.map((todo) => (
//             <li
//                 className="flex items-center justify-between px-4 py-2 mt-4 rounded bg-zinc-800"
//                 key={todo.id}
//             >
//                 <div className='text-white'>{todo.text}</div>
//                 <button
//                 onClick={() => dispatch(removeTodo(todo.id))}
//                 className="px-4 py-1 text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600 text-md"
//                 >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                 >
//                     <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                     />
//                 </svg>
//                 </button>
//             </li>
//             ))}
//         </ul>

//         </>
//     )

// }

// export default Todos