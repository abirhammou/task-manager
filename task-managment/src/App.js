import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Mainlayout from './Components/MainLayout/Mainlayout';
import AllTasks from './Components/AllTasks/AllTasks';
import ImportantTasks from './Components/ImportantTasks/ImportantTasks';
import IncompleteTasks from './Components/IncompleteTasks/IncompleteTasks';
import CompleteTasks from './Components/CompleteTasks/CompleteTasks';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">

      <ToastContainer
        position="top-right"      
        autoClose={5000}           
        newestOnTop={true}       
        closeButton={true}        
      />

        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Mainlayout />}>
          <Route path="all" element={<AllTasks />} />
          <Route path="important" element={<ImportantTasks />} />
          <Route path="incomplete" element={<IncompleteTasks />} />
          <Route path="complete" element={<CompleteTasks />} />
          <Route index element={<AllTasks />} />
        </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
