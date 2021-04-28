import { Component } from "react";
import './Main.css';
import './HeaderComponent';
import './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  constructor(props){
    super(props);
  }
  
  render(){
    
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter(dish=>dish.featured)[0]} 
          promotion={this.props.promotions.filter(promo=>promo.featured)[0]} 
            leader={this.props.leaders.filter(lead=>lead.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId))[0]} 
                  comments={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId))} />
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
              <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>} />
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/> } />
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

export default withRouter(connect(mapStateToProps)(Main));