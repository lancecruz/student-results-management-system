import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "../../api/teachersAPI";

let initialState = {
    teachers: []
}

export const getAllTeachers = createAsyncThunk(
    'teachers/getTeachers',
    async () => {
        const data = await fetchTeachers();
        return data;
    }
);

export const teachersSlice = createSlice ({
    name: 'teachers',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeachers.fulfilled, (state, action) => {
                state.teachers = action.payload;
                console.log(state);
            })
    }
});

//Export reducer actions
//export const {  } = teachersSlice.actions;
export default teachersSlice.reducer;