import React, { Component } from 'react';
import logo from '../logo.svg';
import { Navbar, NavbarBrand, Jumbotron } from "reactstrap";

class Header extends Component{
    render(){
        return(
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/"><img src={logo} className="App-logo" alt="logo" /> Restaurant Confusion</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restaurant Confusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;