import { Component } from "react";
import logo from './logo.svg';
import { Navbar, NavbarBrand } from "reactstrap";
import './App.css';
import Menu from './components/MenuComponent';

class App extends Component {
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <NavbarBrand href="/"><img src={logo} className="App-logo" alt="logo" /> Restaurant Confusion</NavbarBrand>
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default App;