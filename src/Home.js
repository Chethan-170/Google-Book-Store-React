import {Component} from 'react';
import React from 'react';
import { NavBar } from './components/NavBar';
import {Row,Column} from './components/layouts/Layouts';
import Loader from 'react-loader-spinner';
import SearchBox from './components/SearchBox';
import { NewArrival } from './components/RecentBooks';
import { SearchedBooks } from './components/SearchedBooks';
const url = "https://www.googleapis.com/books/v1/volumes?q=";
var apiUrl;
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
        this.setState({loading:true})
    }
    handleSearch(searchedText){
        this.setState({searchedText:searchedText});
        apiUrl = url + searchedText;
        fetch(apiUrl)
        .then(res => res.json())
        .then(
        (result) => {
            let imgs = result.items.map(item=>{
                try{
                return item.volumeInfo.imageLinks.thumbnail;
                }catch(err){
                }
            });
            this.setState({
                loading:false,
                searchResult:imgs
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
              let imgs = result.items.map(item=>{
                  try{
                    return item.volumeInfo.imageLinks.thumbnail;
                  }catch(err){
                  }
              });
              this.setState({newArrivals:imgs})
          },
          (error) => {
              console.log(error)
          }
        )
    }
    componentDidUpdate(){
        console.log("Updated");
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
                            (this.state.loading)
                            ?
                            <React.Fragment>
                                <Loader type="ThreeDots" color="#00BFFF" height={50} width={80}/>
                                <p>Loading.Please wait...!</p>
                            </React.Fragment>
                            :   <span></span>
                        }
                    </Column>                    
                    <Column className="col-12 pl-5 pr-5">
                        {
                            (this.state.searchResult.length !== 0)
                            ?
                                <SearchedBooks items={this.state.searchResult}/>
                            :   ""
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