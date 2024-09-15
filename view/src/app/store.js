import { configureStore } from '@reduxjs/toolkit'
import classesReducer from '../features/classes/classesSlice';
import teachersReducer from '../features/teachers/teachersSlice';

export default configureStore({
    reducer: {
        classes: classesReducer,
        teachers: teachersReducer
    }
});