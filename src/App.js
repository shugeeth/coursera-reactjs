import { Component } from "react";
import logo from './logo.svg';
import { Navbar, NavbarBrand } from "reactstrap";
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar dark color="primary">
          <NavbarBrand href="/"><img src={logo} className="App-logo" alt="logo" /> Restaurant Confusion</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default App;
