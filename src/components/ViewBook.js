import {Row,Column} from "./layouts/Layouts";
const spanStyle={
    fontWeight : "bold"
}
export const ViewBook = ({bookDetails=[]})=>{
    console.log(bookDetails);
    return(
        <Row>
            <Column className="col-lg-3 col-md-12 col-sm-12"></Column>
            <Column className="col-lg-6 col-md-12 col-sm-12 m-2">
                <div className="card" style={{width: "100%"}}>
                    <div className="card-body">
                        <img src={bookDetails.image} style={{height:250,width:400}} className="card-img-top center rounded" alt={bookDetails.title}/>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Title:</span>{bookDetails.title}</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Subtitle:</span>{bookDetails.subtitle}</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Authors:</span>{
                            bookDetails.authors.map(author=>  author + ",")
                        }</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Description:</span>{bookDetails.desc.substring(0,150) +"..."}</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Publisher:</span>{bookDetails.publisher + " (" + bookDetails.publishedDate + ")"}</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>No. of Pages:</span>{bookDetails.pageCount}</li>
                        <li className="list-group-item"><span className="mr-2" style={spanStyle}>Rating:</span>{bookDetails.rating}</li>
                    </ul>
                    <div className="card-body">
                    </div>
                </div>
            </Column>
        </Row>

    )
}