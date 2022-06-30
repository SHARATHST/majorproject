import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { Fragment } from "react";

// Routing
import StudentprivateRoute from "./routing/student.PrivateRoute";
import TeacherprivateRoute from "./routing/teacheer.privateroute";
import AdminprivateRoute from "./routing/admin.PrivateRoute";

// Screens
import StudentprivateScreen from "./components/privatescreens/stdentPrivateScreen";
import TeacherprivateScreen from "./components/privatescreens/teacherprivatescreen";
import AdminprivateScreen from "./components/privatescreens/adminPrivatescreen";

import Studentlogin from "./components/login/student.login";
import Teacherlogin from "./components/login/teacher.login";

import NoPage from "./components/NoPage";
import Logo   from "./components/logo";
import Main   from "./components/main.component"
import Admin   from "./components/login/admin.login"

import Subjectedit from "./components/admin/subject"
import Teacheredit from "./components/admin/teacher.edit"
import Studentedit from "./components/admin/student.edit"

import Studentsub from "./components/student/student.subject.db"
import Teachersub from "./components/teacher/teacher.subject.db"

import Teacherstudent from "./components/teacher/teacher.student";

const App = () => {
  return (
   <BrowserRouter> 
      <Logo />
    <Routes>
        
        <Fragment>
        
          <Route exact path="/" element={<Main />} />
          <Route exact path="/adminlogin" element ={<Admin/>}/>
          <Route exact path="/studentlogin" element={<Studentlogin />} />
          <Route exact path="/teacherlogin" element={<Teacherlogin />} />
          <Route element={<StudentprivateRoute />}>
          <Route path="/studentlogin/studentdashboard" element={<StudentprivateScreen />} />
          </Route>
          <Route element={<TeacherprivateRoute />}>
          <Route path="/teacherlogin/teacherdashboard" element={<TeacherprivateScreen />} />
          </Route>
          
          <Route element={<AdminprivateRoute />}>
          <Route path="/adminlogin/admindashboard" element={<AdminprivateScreen />} />
          </Route>

          <Route element={<AdminprivateRoute />}>
          <Route exact path="/adminlogin/admindashboard/subjectedit" element={<Subjectedit />} />
          </Route>

          <Route element={<AdminprivateRoute />}>
          <Route exact path="/teacherlogin/teacherdashboard/subteacher" element={<Teachersub />} />
          </Route>

          <Route element={<AdminprivateRoute />}>
          <Route exact path="/teacherlogin/teacherdashboard/subteacher/teacherstudent" element={<Teacherstudent/>} />
          </Route>
          

          <Route element={<AdminprivateRoute />}>
          <Route exact path="/studentlogin/studentdashboard/substudent" element={<Studentsub />} />
          </Route>


          <Route element={<AdminprivateRoute />}>
          <Route exact path="/adminlogin/admindashboard/subjectedit/teacheredit" element={<Teacheredit />} />
          </Route>

          <Route element={<AdminprivateRoute />}>
          <Route exact path="/adminlogin/admindashboard/subjectedit/studentedit" element={<Studentedit />} />
          </Route>
          
        
          <Route exact path="*"   element={<NoPage />} />
          
          </Fragment>
    </Routes>
    
    </BrowserRouter> 
  );
};

export default App;
