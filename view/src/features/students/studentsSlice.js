import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const addStudent = createAsyncThunk(
    'students/createStudent',
    async () => {
        console.log("Add Student");
    }
);

export const studentsSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export const {} = studentsSlice.actions;
export default studentsSlice.reducer;