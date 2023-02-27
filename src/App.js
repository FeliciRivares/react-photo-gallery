import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
   { "name": "All" },
   { "name": "Sea" },
   { "name": "Mountains" },
   { "name": "Architecture" },
   { "name": "City"}
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collection, setCollection] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const cateId = categoryId ? `category=${categoryId}` : '';
  
    fetch(`https://63fd11bd859df29986ca1150.mockapi.io/gallery?page=${page}&limit=3&${cateId}`)
    .then((res) => res.json())
    .then((json) => {
      setCollection(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('Error receiving data');
    })
    .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((obj, i) => 
            <li onClick={() => setCategoryId(i)}
               className={categoryId === i ? 'active' : ''} 
               key={obj.name}>{obj.name}</li>
            )
          }
        </ul>
        <input  value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input"
                placeholder="Search by name" />
      </div>
      <div className="content">
        {
          isLoading ? (<h2>Loading...</h2>
          ) : (
            collection.filter(obj => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
              <Collection key={index} name={obj.name} photos={obj.photos}/>
            ))
          )
        }
      </div>
      <ul className="pagination">
      {
        [...Array(5)].map((_, i) => 
            <li onClick={() => setPage(i + 1)} 
            className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)
      }
      </ul>
    </div>
  );
}

export default App;
