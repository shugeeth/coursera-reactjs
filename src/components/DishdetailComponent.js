/* eslint-disable react/jsx-pascal-case */
import { Button, Row, Label, Card, CardBody, CardText, CardTitle, CardImg, 
        ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem,
        Modal, ModalHeader, ModalBody, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Component } from "react";

// Date Converter Function
// function dateConverter(date) {
//     const newDate = new Date(date);
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };  
//     return newDate.toLocaleDateString('en-US', options);
// }

function RenderDish({dish}){
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

function RenderComments({comments, addComment, dishId}){
    if(comments!=null){
        const commentList = comments.map((comment)=>{
            return(
                <ListGroupItem key={comment.id}>
                <div>{comment.comment}</div>
                <div className="card-title">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                </ListGroupItem>
            );
        })
        return(
                <div>
                    <h4>Comments</h4>
                    <ListGroup>
                        {commentList}
                    </ListGroup>
                    <CommentForm dishId={dishId} 
                                 addComment={addComment} />
                </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
    
}

const minLength = (len) => (val) => (val) && (val.length >= len)
const maxLength = (len) => (val) => (!val) || (val.length <= len)

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSubmit(values){
        this.toggleModal();
        console.log(values);
        this.props.addComment(
            this.props.dishId, values.rating,
            values.author, values.comment
        );
    }

    render(){
        return(
            <>
                <Button outline className="mt-3" onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span> &nbsp;Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row class="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className = "form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row class="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className = "form-control" 
                                        validators = {{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors 
                                        className = "text-danger"
                                        model = ".author"
                                        show = "touched"
                                        messages = {{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row class="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className = "form-control" />
                                </Col>
                            </Row>
                            <Button className="mt-3" type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );    
    }
    
}

const DishDetail = (props) => {
    return(
        <>
            <div className="row mt-3">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id} />
                </div>
            </div>
        </>
    );
}
 
export default DishDetail;