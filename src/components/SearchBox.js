import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { Column, Row } from './layouts/Layouts';
const mainStyle = {
    width: '90%',
    marginTop: 0,
    marginBottom: -20,
    marginRight: 'auto',
    marginLeft: 'auto'
}
const formControl = {
    paddingLeft: '2.375rem',
    paddingTop: 10,
    paddingBottom: 10
}
export const SearchBox = (props)=>{
    console.log('search bos mounted')
    const [searchedText,setSearchedText] = useState('');
    const handleOnChange = (event) =>{
        setSearchedText(event.target.value);
        props.setLoading(true);
    }
    return(
            <Row>
                <Column className="col-12">
                    <div className="main pt-3" style={mainStyle}>  
                        <div className="input-group">
                            <input type="text" className="form-control" 
                                value={searchedText}
                                onChange={handleOnChange}
                                style={formControl} placeholder="Search the Book"/>
                            <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={()=>{props.handleOnSearch(searchedText)}} type="button">
                                <i className="fa fa-search"></i>
                            </button>
                            </div>
                        </div>  
                    </div>
                </Column>
                <Column className="col-12 text-center mt-2">
                    {
                        (props.loading) &&                            
                            <React.Fragment> 
                                <Loader type="ThreeDots" color="#00BFFF" height={50} width={80}/>
                                <p>Loading.Please wait...!</p>
                            </React.Fragment>
                    }
                </Column>
             </Row>
        )
} 