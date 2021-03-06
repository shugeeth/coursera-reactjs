import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import './Menu.css';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({dish, dishClick}){
    return(
        <Link to={`/menu/${dish.id}`}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>    
    );
}

const Menu = (props) => {
    if(props.dishes.isLoading){
        return(
            <Loading />
        );
    }
    else if(props.dishes.errMess){
        return(
            <h4>{props.dishes.errMess}</h4>
        );
    }
    else{
        const menu = props.dishes.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} dishClick={props.dishClick} />
                </div>
            ); 
        });
        return(
            <>
                <div className="row mt-3">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>  
                </div>
                <div className="row">
                    {menu}
                </div>
            </>
        );
    }
}

export default Menu;