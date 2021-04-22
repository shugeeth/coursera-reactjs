import { Component } from "react";
import './Main.css';
import './HeaderComponent';
import './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
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
    }
  }

  render(){
    
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter(dish=>dish.featured)[0]} 
          promotion={this.state.promotions.filter(promo=>promo.featured)[0]} 
            leader={this.state.leaders.filter(lead=>lead.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId))[0]} 
                  comments={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId))} />
      );
    }

    return (
      <div>
        <Header />
        <div  className="container">
            {/* <Menu dishes={this.state.dishes} 
                dishClick={(dishId) => this.onDishSelect(dishId)} /> */}
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={ () => <Menu dishes={this.state.dishes}/> } />
              <Route path="/menu/:dishId" component={DishWithId} />
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