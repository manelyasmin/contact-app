import React, { Component } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const location =  useLocation();
    const history=useNavigate();
    
    return (
      <Component
        location={location}
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};


class UpdateContact extends React.Component {
    
   constructor(props) {
    super(props)
    
    const {id,name,email}=props.location.state.contact;   
    this.state={
      id,
      name,
      email
    }
  
   }
    
   update=(e)=>{
      
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "") {
            alert("all the fields are mandatory")
            return
        }
        console.log(this.props);
       this.props.updateContactHandler(this.state);
     
       this.setState({name:"",email:""});
      
       console.log(this.props.history)
       this.props.history("/")
     
      
       
    }
  render() {
     
    
    return (
      <div className="ui main">
      <h2>Add contact</h2>
       
      <form className="ui form" onSubmit={this.update} >

      <div className="field">
      <label>Name</label>
      <input 
        type="text"
        name="name" 
        placeholder="Name" 
        value={this.state.name} 
        onChange={(e)=>
        {this.setState({name:e.target.value})}
        }
      />
      </div>

        <div className="field">
      <label>Email</label>
      <input 
        type="text" 
        name="email" 
        placeholder="email" 
        value={this.state.email}
        onChange={(e)=>{
            this.setState({email:e.target.value})}}/>
      </div>
     
      <button className="ui button blue">update</button>
     
      </form>
 
      </div>
    )
  }
}

export default withRouter(UpdateContact)