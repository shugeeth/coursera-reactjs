import { Component } from "react";
import './Main.css';
import './HeaderComponent';
import './FooterComponent';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      // selectedDish: null
    }
  }

  // onDishSelect(dishId){
  //   this.setState({
  //       selectedDish: dishId
  //   });
  // }

  render(){
    const HomePage = () => {
      return(
        <Home />
      );
    }
    return (
      <div>
        <Header />
        <div  className="container">
            {/* <Menu dishes={this.state.dishes} 
                dishClick={(dishId) => this.onDishSelect(dishId)} />
            <DishDetail dish = { this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] } /> */}
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={ () => <Menu dishes={this.state.dishes}/> } />
              <Redirect to="/home" />
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;