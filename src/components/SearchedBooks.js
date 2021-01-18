export const SearchedBooks = ({items}) => {
    const imgStyle={
        width  : 250,
        height : 225
    }
    return ( 
        <div className="card">
            <div className="card-header bg-primary text-white text-center" style={{fontSize:20}}>
                Search Result
            </div>            
            <div className="card-body text-center">
                {
                (items.length !== 0)
                ?
                    items.map((src,ind)=>{
                            if(typeof src !== 'undefined' && ind <= 8){
                                return <img className="m-3" key={ind} src={src} alt="Lights" style={imgStyle}/>        
                            }
                        })
                    :   <span></span>
                }               
            </div>
        </div>  
    );
}