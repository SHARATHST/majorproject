import React from 'react';
import { Link} from "react-router-dom";

import log from './images/imgs.jpg';
function LOGO() {
  
  return (
    <div>
      <br></br>
        <center><Link to='/'><img src={log}></img></Link>
        <h1>S D M COLLEGE OF ENGINEERING AND TECHNOLOGY, DHARWAD</h1>
        <h2><u>Lab Management System</u></h2>
        </center>
    </div>
  )
  ;
}

export default LOGO;