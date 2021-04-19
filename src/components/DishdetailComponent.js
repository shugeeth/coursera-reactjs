import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, ListGroup, ListGroupItem } from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    renderDish(dish){
        if(dish != null){
            return ( 
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    dateConverter(date) {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };  
        return newDate.toLocaleDateString('en-US', options);
    }

    renderComments(dish){
        if(dish!=null && dish.comments!=null){
            var comments = dish.comments;
            const commentList = comments.map((comment)=>{
                let options = { year: 'numeric', month: 'short', day: 'numeric' };
                return(
                    <ListGroupItem key={comment.id}>
                    <div>{comment.comment}</div>
                    <div className="card-title">-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", options)}</div>
                    </ListGroupItem>
                );
            })
            return(
                    <div>
                        <h4>Comments</h4>
                        <ListGroup>
                            {commentList}
                        </ListGroup>
                    </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
    }

    render() { 
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}
 
export default DishDetail;