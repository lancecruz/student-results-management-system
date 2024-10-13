import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StudentLogin from './pages/login/StudentLogin';
import TeacherLogin from './pages/login/TeacherLogin';
import Dashboard from './pages/dashboard/Dashboard';
import Root from './components/root/Root';
import Classes from './pages/classes/Classes';
import MyClasses from './pages/myClasses/MyClasses';
import AddClass from './pages/classes/AddClass';
import EditClass from './pages/classes/EditClass';
import TeacherClasses from './pages/classes/TeacherClasses';
import StudentClasses from './pages/classes/StudentClasses';
import Students from './pages/students/Students';
import AddStudent from './pages/students/AddStudent';
import Login from './pages/login/Login';

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
                    path: '/classes/teacher/:code',
                    element: <TeacherClasses />
                },
                {
                    path: '/classes/student/:code',
                    element: <StudentClasses />
                },
                {
                    path: '/classes/add',
                    element: <AddClass />
                },
                {
                    path: '/classes/edit/:id',
                    element: <EditClass />
                },
                {
                    path: '/students',
                    element: <Students />
                },
                {
                    path: '/students/add',
                    element: <AddStudent />
                }
            ]
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/login/student',
            element: <StudentLogin />
        },
        {
            path: '/login/teacher',
            element: <TeacherLogin />
        },
        {
            path: '/login/admin',
            element: <StudentLogin />
        }
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
