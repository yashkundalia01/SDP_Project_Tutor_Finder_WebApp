import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Student from "./Container/Student";
import Tutor from "./Container/Tutor";
import StudentWelcome from "./Components/Welcome/Student/StudentWelcome";
import TutorWelcome from "./Components/Welcome/Tutor/TutorWelcome";
import Welcome from "./Components/Welcome/Welcome";
import Rate from "./Components/Dashboard/Tutor/Rate";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/student/welcome' component={StudentWelcome} />
        <Route exact path='/tutor/welcome' component={TutorWelcome} />
        <section className='container'>
          <Switch>
            <Route path='/student' component={Student} />
            <Route path='/tutor' component={Tutor} />
            <Route path='/rate' component={Rate} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
