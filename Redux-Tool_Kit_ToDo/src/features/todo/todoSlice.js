// Importing createSlice to create Redux slice and nanoid to generate unique IDs
import { createSlice, nanoid } from "@reduxjs/toolkit";

// ✅ Initial state for the todo slice
// We are storing todos as an array, which is the correct structure
// 🔍 Why not as an object?
// If you store todos as an object instead of an array, you can't easily loop (map) over them in React components to display a list. Redux is usually designed to handle collections (like todo lists) using arrays.

const initialState = {
    todos: [{
        id: 1,
        text: "Hello welcome to my todo app"
    }]
    // ✅ This is correct: todos should be stored as an array.
    // ❌ If you store it as an object like:
    // todos: { id: 1, text: "Hello" }
    // You will lose flexibility to manage multiple items.
};

// ✅ Slice: a bundle that includes state and reducers together
export const todoSlice = createSlice({
    name: "todo", // The name of this slice (required by Redux Toolkit)

    initialState, // Initial state (✅ can be empty like { todos: [] } if you want)

    reducers: {
        // ✅ addTodo Reducer: This will add a new todo item to the state
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), // Generates a unique ID for each todo
                text: action.payload // The new todo text is sent as payload
                // ⚙️ Example: If you dispatch addTodo("Go to gym"), action.payload is "Go to gym"
            };
            state.todos.push(todo); // Push the new todo into the todos array
        },

        // ✅ removeTodo Reducer: This will remove a todo item by its ID
        removeTodo: (state, action) => {
            // Keep only the todos whose ID does not match the payload (ID to delete)
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            // ⚙️ Example: If you dispatch removeTodo(3), it will delete the todo with id 3
        },
        updateTodo: (state, action) => {
            // action.payload: { id, newText }
            const { id, newText } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = newText;
            }
            // dispatch(updateTodo({ id: 1, newText: "Updated Text" }))
        },
        setTodo: (state, action) => {
            // action.payload: new array of todos
            state.todos = action.payload;
            // dispatch(setTodos([{ id: 1, text: "Fresh Todo" }]))
        }

    }
});

// ✅ Exporting the actions to use them in React components
export const { addTodo, removeTodo, updateTodo, setTodo } = todoSlice.actions;

// ✅ Exporting the reducer to use it in the Redux store
export default todoSlice.reducer;





















/*import { createSlice , nanoid} from "@reduxjs/toolkit";

// nanoid to give id's to todos

const initialState = {
    todos: [{
        id:1, 
        text: "Hello welcome my todo app"
    }]
    // what if i store it inside object instead of list.
}
// Slice is bigger version of reducer.
// reducer is functionalitty.
export const todoSlice = createSlice({
    // name property is defined by redux-tool_kit
    name: "todo",
    initialState, // initalising state which will be shown on loaidng of webpage.
    // It is necessary to define initial state ,it could be empty.
    reducers: {
        // state give access to the values in intialstate which could change later.
        // action gives values to perform some action.
        addTodo : (state,action) => {
            const todo = {
                id: nanoid(),
                text: action.payload // payload is an object we could use action.payload.text property to get the message, but here we are sending in only text so we could use it directly.
            }
            state.todos.push(todo); // to push the todo we create in the array.
        },
        removeTodo : (state,action) => {
            state.todos = state.todos.filter((todo) =>  todo.id !== action.payload);
        }

    }
})


// first we export functionality, would be use in components
export const { addTodo , removeTodo }  = todoSlice.actions

// export all reducers
export default todoSlice.reducer*/