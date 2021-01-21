import {Component,useState,useEffect} from 'react';
import React from 'react';
import { NavBar } from './components/NavBar';
import {Row,Column} from './components/layouts/Layouts';
import Loader from 'react-loader-spinner';
import SearchBox from './components/SearchBox';
import { NewArrival } from './components/RecentBooks';
import { SearchedBooks } from './components/SearchedBooks';
const url = "https://www.googleapis.com/books/v1/volumes?q=";
var apiUrl;
export const Home1  = ()=>{
    const [searchedText,setSearchedText] = useState('');
    const [loading,setLoading] = useState('');
    const [newArrivals,setNewArrivals] = useState([]);
    const [searchResult,setSearchResult] = useState([]);
    useEffect(()=>{
        console.log("just mounted");
        apiUrl=url+"fiction&orderBy=newest";
        fetch(apiUrl)
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
            console.log(details);
        },
        (error) => {
            setNewArrivals([]);
        });
    },[]);
    return(
        <h2>hello</h2>
    )
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchedText : "",
            loading : false,
            newArrivals : [],
            searchResult : []
        }   
        this.handleSearch = this.handleSearch.bind(this);
        this.handleOnType = this.handleOnType.bind(this);
    }
    handleOnType(str){
        this.setState({
            loading:true,
            searchResult:[]
        })
    }
    handleSearch(searchedText){
        this.setState({searchedText:searchedText});
        apiUrl = url + searchedText;
        fetch(apiUrl)
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
            this.setState({
                loading:false,
                searchResult:details
            })
          },
          (error) => {
              console.log(error)
          }
        )
    }

    componentDidMount(){
        apiUrl=url+"fiction&orderBy=newest";
        fetch(apiUrl)
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
            this.setState({newArrivals:details})
        },
        (error) => {
        this.setState({newArrivals:[]})
        })
    }
    componentDidUpdate(){
    }
    render() { 
        return ( 
            <React.Fragment>
                <NavBar/>
                <Row>
                    <Column className="col-12">
                        <SearchBox handleOnSearch={this.handleSearch} handleOnType={this.handleOnType}/>
                    </Column>
                    <Column className="col-12 text-center">
                        {
                            (this.state.loading) &&                            
                                <React.Fragment>
                                    <Loader type="ThreeDots" color="#00BFFF" height={50} width={80}/>
                                    <p>Loading.Please wait...!</p>
                                </React.Fragment>
                        }
                    </Column>                    
                    <Column className="col-12 pl-5 pr-5">
                        {
                            (this.state.searchResult.length === 0)  ||
                                <SearchedBooks items={this.state.searchResult}/>
                            
                        }
                    </Column>                   
                    <Column className="col-12 pl-5 pr-5">
                        <NewArrival items={this.state.newArrivals}/>
                    </Column>            
                </Row>
            </React.Fragment>
            
         );
    }
}
 
export default Home;