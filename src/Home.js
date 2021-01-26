import {useState,useEffect} from 'react';
import React from 'react';
import { NavBar } from './components/NavBar';
import {Row,Column} from './components/layouts/Layouts';
import {SearchBox} from './components/SearchBox';
import { NewArrival } from './components/RecentBooks';
import { SearchedBooks } from './components/SearchedBooks';
import { useHistory,Route,Switch,BrowserRouter as Router } from 'react-router-dom';
const url = "https://www.googleapis.com/books/v1/volumes?q=";
var apiUrl;
export const Home  = ()=>{
    const history = useHistory();
    const [loading,setLoading] = useState('');
    const [searchResult,setSearchResult] = useState([]);
    const showThisBook = (id) =>{
        history.push('/viewBook/'+id);
    }
    const setLoadingOnInput = ()=>{
        setLoading(true);
    } 
    const handleSearch = (searchedText)=>{
        apiUrl = url + searchedText;
        fetch(apiUrl)
        .then(res => res.json())
        .then(
        (result) => {
            let details = result.items.map(({id,volumeInfo})=>{
                try{
                    let obj={
                        id: id,
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
            setLoading(false);
            setSearchResult(details);
          },
          (error) => {
              console.log(error)
          }
        )        
    }
    useEffect(()=>{
        console.log("Home mounted");
    },[]);
    useEffect(()=>{
        console.log('Home updated');
    })
    return(
        <Router>
            <NavBar/>
            <Row>
                <Column className="col-12">
                    <SearchBox loading={loading} setLoading={setLoadingOnInput} handleOnSearch={handleSearch}/>
                </Column>
                <Column className="col-12 pl-5 pr-5">
                    {
                        (searchResult.length === 0)  ||
                            <SearchedBooks items={searchResult} showThisBook={showThisBook}/>                        
                    }
                </Column>                            
                <Column className="col-12 pl-5 pr-5">
                    <NewArrival/>
                </Column>   
            </Row>            
            <Switch> 
              <Route exact path='/' component={NavBar}></Route> 
              <Route exact path='/about' component={NavBar}></Route> 
              <Route exact path='/contact' component={NavBar}></Route> 
            </Switch> 
        </Router>
    )
}