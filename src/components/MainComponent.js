import { Component } from "react";
import './Main.css';
import './HeaderComponent';
import './FooterComponent';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
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
        <Home dish={this.state.dishes.filter(dish=>dish.featured)[0]} 
          promotion={this.state.promotions.filter(promo=>promo.featured)[0]} 
            leader={this.state.leaders.filter(lead=>lead.featured)[0]} />
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
              <Route path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;