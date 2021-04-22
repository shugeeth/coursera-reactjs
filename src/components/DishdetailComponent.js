import { Card, CardBody, CardText, CardTitle, CardImg, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

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

function RenderComments({comments}){
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
                </div>
        );
    }
    else{
        return(
            <div></div>
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </>
    );
}
 
export default DishDetail;