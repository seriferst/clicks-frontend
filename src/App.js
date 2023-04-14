import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [curlocation, setCurLocation] = useState({});

  useEffect(() => {
    getLocation();

    axios.get('http://localhost:5000/record')
      .then(res => {
        const record = res.data;
        setData(record);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0){
      axios.put('http://localhost:5000/recordCount', data)
        .catch(err => {
        console.log(err);
      })
    }
  }, [data]);

  
  //GET Current location
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurLocation(location.data);
  };


  //Increase click count
  function increasedCounter(){
    let curCity = curlocation.city;

    if (data[curCity]){
        data[curCity] = data[curCity] + 1;
        setData({ ...data });
        
    }
    else{
        data[curCity] = 1;
        setData({ ...data });
    }
  }
  

  return (
    <div className="app">
      <h1>Project 1 - Chasing the Clicks</h1>
      <button onClick={increasedCounter}>Count clicks</button>
      <div className="content">
        {
            Object.entries(data)
            .map( ([key, value]) => <p className="count" key={key}>{key} {value}</p>)
         }
      </div>
    </div>
  );
}

export default App;

