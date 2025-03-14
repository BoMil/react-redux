
// import Redux from "redux";
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0
    },
    reducers: {
        increment: (state) => {
            state.counter++
        },
        decrement: (state) => {
            state.counter--
        },
        setValue: (state, action) => {
            state.counter = action.payload
        }
    }
})

// This actions will be called from the components to update the state
export const actions = counterSlice.actions;

const store = configureStore({
    reducer: counterSlice.reducer,
});

// ! OLD WAY
// const reducerFn = (state = { counter: 0 }, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { counter: state.counter + 1 };
//     case 'DECREMENT':
//       return { counter: state.counter - 1 };
//       case 'SET_VALUE':
//         return { counter: action.value };
//     default:
//       return state;
//   }
// };

// const store = configureStore({
//     reducer: reducerFn,
// });


export default store;
