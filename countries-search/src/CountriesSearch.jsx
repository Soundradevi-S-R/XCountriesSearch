import React from "react";
import  "./CountriesSearch.css";
import "./"
import { useEffect,useState } from "react";


const Card =({flag}) =>{

   //console.log("print ", data);
    return (
        <div className="countryCard" >
            
            <img src={flag.flags.png} alt={flag.name.common} 
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    }}/>
            <h2>{flag.name.common}</h2>
       </div>);
};


function CountriesSearch(){
  
    const API_URL="https://restcountries.com/v3.1/all";
    
    const [countriesData,setCountriesData] = useState([]);
    const [filterData,setFilterData] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    
    async function apiCall() {
        try{
          const response = await fetch(API_URL);
          const data = await response.json();            
            setCountriesData(data);
            setFilterData(data);     
           
         }catch(error){
            console.error("Error fetching data:",error);
        }              
    }

    useEffect(()=>{
        apiCall();      
                  
    },[]);

    const filterSearch=(e)=>{
        setSearchVal(e.target.value);
        let filtered = countriesData.filter((country) => 
                                country.name.common.toLowerCase().includes(e.target.value.toLocaleLowerCase()) );
        setFilterData(filtered);    

    };

    return(
    <div>
        <div className="searchDiv">
            <input 
                 type='text'
                 placeholder="Search for Countries" 
                 className="search"
                 value={searchVal}
                 onChange={filterSearch}  />
        </div>   
        <div className="gridcontainer">
            {
                (filterData.length && 
                filterData.map((country) =>  <Card key={country.name.common} flag={country}  />
                 ))
            }   

        </div>
    </div>
    );

}
export default CountriesSearch;