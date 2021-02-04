import {useState,useEffect,useContext} from 'react';
import { BookSourceContext } from "./BookSourceContext";
import React from 'react';
import { NavBar } from './components/NavBar';
import {Row,Column} from './components/layouts/Layouts';
import {SearchBox} from './components/SearchBox';
import { NewArrival } from './components/RecentBooks';
import { SearchedBooks } from './components/SearchedBooks';
import { useHistory,Route,Switch,BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router';
import {ViewBook} from './components/ViewBook';
const Home  = (props)=>{
    const url = useContext(BookSourceContext);
    const history = useHistory();
    const [selectedBook,setSelectedBook] = useState([]);
    const [loading,setLoading] = useState('');
    const [searchResult,setSearchResult] = useState([]);
    const showThisBook = (bid) =>{
        let tempBook = searchResult.filter(({id}) =>{
            return id===bid;
        });
        (tempBook.length !== 0) && setSelectedBook(tempBook[0]);
        history.push('/viewBook/'+bid);
    }
    const setLoadingOnInput = ()=>{
        setLoading(true);
    } 
    const handleSearch = (searchedText)=>{
        fetch(url + searchedText)
        .then(res => res.json())
        .then(
        (result) => {
            let details = result.items.map(({volumeInfo},ind)=>{
                try{
                    let obj={
                        id: ind,
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
                   // console.log("Error:",err)
                }
            });
            let $details = details.filter(book=>{
                return book !== undefined;
            })
            setLoading(false);
            setSearchResult($details);
          },
          (error) => {
             // console.log(error)
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
        <React.Fragment>
            <NavBar/>       
            <Switch> 
                <Route exact path='/'>
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
                </Route> 
                <Route exact path='/viewBook/:id' render={(props) => <ViewBook bookDetails={selectedBook} />}></Route> 
            </Switch> 
        </React.Fragment>
    )
};
export default withRouter(Home);