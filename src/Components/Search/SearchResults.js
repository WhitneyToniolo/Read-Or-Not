import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.scss'

function SearchResults() {
  const [data, setData] = useState([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const searchTerm = queryParameters.get("inputsearch");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/search?inputsearch=${searchTerm}`);
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, [searchTerm]);


  return (
    <div className='search-container'>
    <div className="search-results">
      {/* <h1 className='' */}
      {data.map((book) => (
        <div key={book.id} className="search-result">
        <Link to={`/books/${book.id}`} className="link">
          <div className="search-result-cover">
            <img src={book.img} alt="book cover" />
          </div>
          <div className="search-result-details">
            <h3>{book.title}</h3>

            <p>{book.firstname} {book.lastname}</p> 
            <p> Genre : {book.name} </p>
            <p> Description : {book.description}</p>
            {/* <p>Par: {book.author.firstname} {book.author.lastname}, Genre: {book.category.name}, {book.description}</p> */}

          </div>
          </Link>
        </div>
      ))}
    </div>
 </div>

  );
}

export default SearchResults;
