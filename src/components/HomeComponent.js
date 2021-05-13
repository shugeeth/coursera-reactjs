import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardSubtitle, CardImg } from "reactstrap";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else if(item!=null){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}
            >
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation?<CardSubtitle>{item.designation}</CardSubtitle>:null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function Home(props){
    return ( 
        <div className="row align-items-start mt-2">
            <div className="col-12 col-md m-1">
                <RenderCard item={props.dish} 
                            isLoading={props.dishesLoading}
                            errMess={props.dishesErrMess} />
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={props.promotion}
                            isLoading={props.promosLoading}
                            errMess={props.promosErrMess} />
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={props.leader} />
            </div>
        </div>
    );
}
 
export default Home;