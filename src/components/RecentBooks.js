import Loader from "react-loader-spinner";
import React from 'react';
export const NewArrival = ({items:imgs}) => {
    const imgStyle={
        width  : 250,
        height : 225
    }
    return ( 
        <div className="card">
            <div className="card-header bg-primary text-white text-center" style={{fontSize:20}}>
                New Arrivals
            </div>            
            <div className="card-body text-center">
                {
                   (imgs.length !== 0)
                   ?
                    imgs.map((src,ind)=>{
                            if(typeof src !== 'undefined' && ind <= 8){
                                return <img className="m-3" key={ind} src={src} alt="Lights" style={imgStyle}/>        
                            }
                        })
                    :   <React.Fragment>
                            <Loader type="BallTriangle" color="#00BFFF" height={50} width={80}/>
                            <p>Loading.Please wait...!</p>
                        </React.Fragment>
                }               
            </div>
        </div>
    );
}