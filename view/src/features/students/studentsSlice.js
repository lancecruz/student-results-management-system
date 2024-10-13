import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStudent } from "../../api/studentsAPI";

const initialState = {};

export const addStudent = createAsyncThunk(
    'students/createStudent',
    async (studentData) => {
        console.log(studentData);
        console.log(studentData.getFullName());
        const results = await createStudent(studentData);
        return results;
    }
);

export const studentsSlice = createSlice({
    name: 'studentsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.fulfilled, (state, action) => {
                
            })
            .addCase(addStudent.rejected, (state, action) => {

            })
    }
});

export const {} = studentsSlice.actions;
export default studentsSlice.reducer;