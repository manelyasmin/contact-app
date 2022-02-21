import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';


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


class AddContact extends React.Component {
     state={
          name:"",
          email:""
      }
     
    add=(e)=>{
      
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "") {
            alert("all the fields are mandatory")
            return
        }
       this.props.addContactHandler(this.state);
     
       this.setState({name:"",email:""});
       console.log(this.props.history)
       this.props.history("/")
     
      
       
    }
  render() {
     
    
    return (
      <div className="ui main">
      <h2>Add contact</h2>
       
      <form className="ui form" onSubmit={this.add} >

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
     
      <button className="ui button blue">add</button>
     
      </form>
 
      </div>
    )
  }
}

export default withRouter(AddContact)