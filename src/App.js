/* eslint-disable no-unused-expressions */
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
function App() {
  const [products, setproducts] = useState([])
  const url = 'https://s3.amazonaws.com/open-to-cors/assignment.json';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network Issue');
    }
    return response.json();
  })
  .then(data => {
    setproducts(Object.values(data.products).sort((a,b)=>{
      return b.popularity - a.popularity
    }))
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  return (
    <div className="App">
      <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Popularity</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product?.title}</td>
            <td>${product?.price}</td>
            <td>{product?.popularity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default App;
