import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState = {
    name: 'login',
    error: false
};

export const studentLogin = createAsyncThunk(
    'login/studentLogin',
    async (loginData) => {
        alert(loginData.studentCode);

        try {
            const response = await fetch('http://localhost:9000/login/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            if (response.ok) {
                alert('Login successful!');
                console.log(response);
                const responseData = await response.json();
                console.log(responseData);
            } else {
                return {
                    error: true,
                    status: response.status
                };
            }
        } catch (error) {

        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        doSomething: (state, action) => {
            alert('WOW!');
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(studentLogin.fulfilled, (state, action) => {
                console.log('login done');
                console.log(action);
                console.log(state.name);
                state.error = true;
            })
            .addCase(studentLogin.rejected, (state, action) => {
                console.log('login failed');
            })
    }
});

export const { doSomething } = loginSlice.actions;
export default loginSlice.reducer;