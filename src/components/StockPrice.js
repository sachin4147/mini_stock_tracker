
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Getdata() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    // Fetch stock data on component mount
    fetchStockData();

    // Polling mechanism to update stock prices every minute
    const interval = setInterval(() => {
      fetchStockData();
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('https://carmine-sunglasses.cyclic.app/api/stocks');
      setStocks(response.data.data);
      // If a stock is selected, update the selected stock's price
      if (selectedStock) {
        const selectedStockData = response.data.find((stock) => stock.symbol === selectedStock.symbol);
        setSelectedStock(selectedStockData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStockSelect = (e) => {
    const selectedSymbol = e.target.value;
    const selectedStockData = stocks.find((stock) => stock.symbol === selectedSymbol);
    setSelectedStock(selectedStockData);
  };

  return (
    <div style={{marginLeft:"300px"}}>
      <h1 style={{fontSize:"60px",fontStyle:"italic"}}>MINI STOCK PRICE TRACKER</h1>
      <label style={{fontSize:"40px"}}>SELECT THE STOCK:</label>
      <select  style={{fontSize:"40px",border:"1px solid black",background:"teal",fontStyle:"initial",color:"white",width:"200px"}} onChange={handleStockSelect}>
        <option value="">Select...</option>
        {stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol}
          </option>
        ))}
      </select>
      {selectedStock && (
        <div >
          <h2  style={{fontSize:"40px"}}>STOCK: {selectedStock.symbol}</h2>
          <h2  style={{fontSize:"40px"}}>PRICE: ${selectedStock.price.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default Getdata;
