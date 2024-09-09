import React from "react";
import styles from  "./CountriesSearch.module.css";
import { useEffect,useState } from "react";


const Card =({flagImg,name}) =>{

   //console.log("print ", data);
    return (
        <div className={styles.countryCard} >
            
            <img src={flagImg} alt={name} 
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    }}/>
            <h2>{name}</h2>
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
                                country.name.common.toLowerCase().includes(searchVal.toLocaleLowerCase()) );
        setFilterData(filtered);    

    };

    return(
    <div>
        <div className={styles.searchDiv}>
            <input 
                 type='text'
                 placeholder="Search for Countries" 
                 className={styles.search}
                 value={searchVal}
                 onChange={filterSearch}  />
        </div>   
        <div className={styles.gridcontainer}>
            {
                (filterData.length && 
                filterData.map((country) =>  <Card key={country.name.common} flagImg={country.flags.png} name={country.name.common} />
                 ))
            }   

        </div>
    </div>
    );

}
export default CountriesSearch;