import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClass, fetchClasses, deleteClassByID, fetchClassByClassScheduleID, updateClassScheduleByID, fetchClassesByTeacherCode } from "../../api/classesAPI";
import { formatTimeToString } from '../../utils/commonFunctions';

const initialState = {
    classes: [],
    teacherClasses: [],
    count: 0,
    teacherClassesCount: 0,
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

export const getClassesByTeacherCode = createAsyncThunk(
    'classes/getClassesByTeacherCode',
    async (listData) => {
        console.log("Get teachers");
        const classesData = await fetchClassesByTeacherCode(listData);
        return classesData;
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
            .addCase(getClassesByTeacherCode.fulfilled, (state, action) => {
                state.teacherClasses = action.payload.classes.map((item) => {
                    return {
                        class_name: item.class_name,
                        class_code: item.class_code,
                        class_day: item.class_day,
                        class_time: formatTimeToString(item.class_time)
                    }
                });
                state.teacherClassesCount = action.payload.count;
            });
    }
});

export const { addsClass } = classesSlice.actions;
export default classesSlice.reducer;