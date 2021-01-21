import React from 'react';

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
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchedText : ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event){
        this.setState({ searchedText  : event.target.value })
        this.props.handleOnType();
    }
    componentDidUpdate(){
        console.log("Searchbos updated");
    }
    render() { 
        console.log("SearchBos mounted");
        return (  
            <div className="main pt-3" style={mainStyle}>  
                <div className="input-group">
                    <input type="text" className="form-control" 
                        value={this.state.searchedText}
                        onChange={this.handleOnChange}
                        style={formControl} placeholder="Search the Book"/>
                    <div className="input-group-append">
                    <button className="btn btn-secondary" onClick={()=>{this.props.handleOnSearch(this.state.searchedText)}} type="button">
                        <i className="fa fa-search"></i>
                    </button>
                    </div>
                </div>  
             </div>
        );
    }
} 
export default SearchBox;