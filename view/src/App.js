import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StudentLogin from './pages/login/studentLogin';
import TeacherLogin from './pages/login/TeacherLogin';
import Dashboard from './pages/dashboard/Dashboard';
import Root from './components/root/Root';
import Classes from './pages/classes/Classes';
import MyClasses from './pages/myClasses/MyClasses';
import AddClass from './pages/classes/AddClass';
import EditClass from './pages/classes/EditClass';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                {
                    path: '/classes',
                    element: <Classes />
                },
                {
                    path: '/classes/:id',
                    element: <MyClasses />
                },
                {
                    path: '/classes/add',
                    element: <AddClass />
                },
                {
                    path: '/classes/edit/:id',
                    element: <EditClass />
                }
            ]
        },
        {
            path: '/login/student',
            element: <StudentLogin />
        },
        {
            path: '/login/teacher',
            element: <TeacherLogin />
        },
    ]);

    return (
        <RouterProvider router={router} />
    );

    // return (
    //     <div className="App">
    //     <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         >
    //         Learn React
    //         </a>
    //     </header>
    //     </div>
    // );
}

export default App;
