import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import './Menu.css';

function RenderMenuItem({dish, dishClick}){
    return(
        <Card onClick={() => dishClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>    
    );
}

const Menu = (props) => {
    const menu = props.dishes.map((dish)=>{
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} dishClick={props.dishClick} />
            </div>
        ); 
    });
    return(
        <div className="row">
            {menu}
        </div>
    );
}

export default Menu;