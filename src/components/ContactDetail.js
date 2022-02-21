import React from 'react'
import user from "../images/user.png";
import {Link} from "react-router-dom";
import index1 from "../images/user.png";
import { useNavigate ,useLocation} from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history =  useNavigate();
    
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};



const ContactDetail = (props) => {
  const location=useLocation()
  /* console.log(location.state ) */
    const form=location.state.contact; 
   /*  console.log("hi") */
    const {id,name,email}=form;
  /*   console.log(form.email) */
    
   
   return (  
 
 <div className="main">
 <div className="ui card centered">
 <div className="image">
 <img src={index1} alt="index1"/>
 
 </div>

 <div className="content">
    <div className="header">{name}</div>
    <div className="description">{email}</div>
 </div>
 
 </div>
 <div className="center-div">
 <Link to="/">
 <button className="ui button blue center">back to contact list</button>
 </Link>
 </div>
 </div>
  )
}


export default withRouter(ContactDetail)
