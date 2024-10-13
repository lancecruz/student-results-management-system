import { configureStore } from '@reduxjs/toolkit'
import classesReducer from '../features/classes/classesSlice';
import teachersReducer from '../features/teachers/teachersSlice';
import loginReducer from '../features/login/loginSlice';

export default configureStore({
    reducer: {
        classes: classesReducer,
        teachers: teachersReducer,
        login: loginReducer
    }
});