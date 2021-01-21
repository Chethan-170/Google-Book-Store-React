import React from 'react';
import { Row,Column } from './layouts/Layouts';
export const SearchedBooks = ({items}) => {
    console.log("searched book mounted:",items)
    return ( 
        <div className="card">
            <div className="card-header bg-primary text-white" style={{fontSize:20}}>
                Search Result
            </div>            
            <div className="card-body">
                <Row>
                {
                (items.length !== 0) &&
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
                }    
                </Row>           
            </div>
        </div>  
    );
}