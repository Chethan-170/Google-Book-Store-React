import React from 'react';
import Home from './Home';
import {BrowserRouter as Router} from 'react-router-dom';
import {BookSourceContext} from './BookSourceContext';
function App() {
  return (
    <Router>
      <BookSourceContext.Provider value="https://www.googleapis.com/books/v1/volumes?q="> 
        <Home/>
      </BookSourceContext.Provider>
    </Router>
  );
}

export default App;
