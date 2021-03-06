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
import { postComment, deleteComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  submitFeedbackForm: ({firstname, lastname, telnum, email, agree, contactType, message}) => dispatch(postFeedback({firstname, lastname, telnum, email, agree, contactType, message}))
});

class Main extends Component {

  // constructor(props){
  //   super(props);
  // }
  
  componentDidMount(){
    this.props.fetchDishes();  
    this.props.fetchComments();  
    this.props.fetchPromos();  
    this.props.fetchLeaders();
  }

  render(){
    
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter(dish=>dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter(promo=>promo.featured)[0]} 
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
          leader={this.props.leaders.leaders.filter(lead=>lead.featured)[0]} />
      );
    }

    function selectComments(commentsPack, dishId){
      return commentsPack.comments.filter((comment)=>comment.dishId===parseInt(dishId))
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId))[0]} 
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={selectComments(this.props.comments, match.params.dishId)} 
                  postComment={this.props.postComment}
                  deleteComment={this.props.deleteComment}
                  commentsErrMess={this.props.comments.errMess} />
      );
    }

    return (
      <div>
        <Header />
        <div  className="container">
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={600}>
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>} />
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/> } />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} submitFeedbackForm={this.props.submitFeedbackForm} />} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));