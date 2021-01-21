import Loader from 'react-loader-spinner';
import React,{useState,useEffect} from 'react';
import {Row,Column} from './layouts/Layouts';
const url = "https://www.googleapis.com/books/v1/volumes?q=";
export const NewArrival = () => {
    const [newArrivals,setNewArrivals] = useState([]);
    useEffect(()=>{
        console.log("New Arrival Mounted");
        fetch(url+"fiction&orderBy=newest")
        .then(res => res.json())
        .then(
        (result) => {
            let details = result.items.map(({volumeInfo})=>{
                try{
                    let obj={
                        title : (volumeInfo.title) || "",
                        subtitle : (volumeInfo.subtitle) || "",
                        desc : (volumeInfo.description) || "",
                        authors : (volumeInfo.authors) || [],
                        image : (volumeInfo.imageLinks.thumbnail) || (volumeInfo.imageLinks.smallThumbnail) || '',
                        pageCount : (volumeInfo.pageCount) || "TBD",
                        rating : (volumeInfo.ratingsCount) || "TBD",
                        publisher : (volumeInfo.publisher) || "",
                        publishedDate : (volumeInfo.publishedDate) || "",
                    }
                    return obj;
                }catch(err){
                    console.log("Error:",err)
                }
            });
            setNewArrivals(details);
        },
        (error) => {
            setNewArrivals([]);
        });
    },[]);
    return ( 
        <div className="card">
            <div className="card-header bg-primary text-white text-center" style={{fontSize:20}}>
                New Arrivals
            </div>             
            <div className="card-body">
                <Row>
                {
                (newArrivals.length !== 0)
                ?             
                    newArrivals.map((item,ind)=>{
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