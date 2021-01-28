export const NavBar = () => {

    return (  
        <nav className="navbar navbar-light bg-primary text-white">
          <h1 className="navbar-text ml-2 text-white">
            Google Books Store  
          </h1>
          <button className="btn btn-sm float-right" onClick={()=>{window.history.back()}}>Back</button>
        </nav>
    );
}