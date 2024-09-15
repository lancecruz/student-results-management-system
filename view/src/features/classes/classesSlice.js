import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClass, fetchClasses, deleteClassByID, fetchClassByClassScheduleID, updateClassScheduleByID } from "../../api/classesAPI";

const initialState = {
    classes: [],
    count: 0,
    classSchedule: {}
};

export const getAllClasses = createAsyncThunk(
    "classes/getAllClasses", 
    async (formData) => {
        const { page, offset, itemsPerPage, sortBy } = formData;
        const response = await fetchClasses(page, offset, itemsPerPage, sortBy);

        return response;
    }
);

export const getClassByClassScheduleID = createAsyncThunk(
    'classes/getClassByClassScheduleID',
    async (classScheduleID) => {
        const classData = await fetchClassByClassScheduleID(classScheduleID);
        return classData;
    }
);

export const addClass = createAsyncThunk(
    'classes/createNewClass',
    async (formData) => {
        const { classCode, className } = formData;
        const response = await createClass(formData);
        return response;
    }
);

export const editClassScheduleByID = createAsyncThunk(
    'classes/editClassScheduleByID',
    async (formData) => {
        const response = await updateClassScheduleByID(formData);
        return response;
    }
);

export const deleteByID = createAsyncThunk(
    'classes/deleteByID',
    async (classData) => {
        const { id } = classData;
        console.log(id);
        const response = await deleteClassByID(id);
        return response;
    }
)

export const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        addsClass: (state) => {
            console.log("test?");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllClasses.fulfilled, (state, action) => {
                state.classes = action.payload.classes;
                state.count = action.payload.count;
            })
            .addCase(getClassByClassScheduleID.fulfilled, (state, action) => {
                console.log(action.payload);
                state.classSchedule = action.payload;
            })
            .addCase(deleteByID.fulfilled, (state, action) => {
                
            });
    }
});

export const { addsClass } = classesSlice.actions;
export default classesSlice.reducer;