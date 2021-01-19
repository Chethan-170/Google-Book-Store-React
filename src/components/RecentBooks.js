import Loader from 'react-loader-spinner';
import React from 'react';
import {Row,Column} from './layouts/Layouts';
export const NewArrival = ({items}) => {
    return ( 
        <div className="card">
            <div className="card-header bg-primary text-white text-center" style={{fontSize:20}}>
                New Arrivals
            </div>             
            <div className="card-body">
                <Row>
                {
                (items.length !== 0)
                ?             
                    items.map((item,ind)=>{
                        if(typeof item !== 'undefined' && ind < 8){
                            return <Column key={ind} className="col-lg-3 col-md-6 col-sm-12">
                                        <div className="card text-center" style={{width: 250}}>
                                            <img className="img-thumbnail rounded"  src={(item.image)} alt={item.title}/>
                                            <div className="card-body">
                                            <p className="card-text">{item.title} - {item.authors[0]}</p>
                                            </div>
                                        </div>
                                    </Column>
                        }
                    })
                :
                    <Column className="col-12 text-center">
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> 
                    </Column>
                }   
                </Row>           
            </div>
        </div>
    );
}