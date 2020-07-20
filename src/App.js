import React from 'react';
import Cards from './components/Cards/cards';
import Country from './components/CountryPicker/country';
import Charts from './components/Charts/charts';
import styles from './App.module.css';
import { fetchData,countrydata } from './api/index';


class App extends React.Component{

    state={
        data:{},
        country:'',
        fetchedcountrydata:''
    }
    async componentDidMount (){
        const fetcheddata=await fetchData();
        this.setState({
            data:fetcheddata,
        });
    }

    handleCountryChange=async(country)=>{
        const fetcheddata=await fetchData(country);
        const fetchedcountrydata=await countrydata(country);
        this.setState({
            data:fetcheddata,
            country:country,
            fetchedcountrydata:fetchedcountrydata
        });
        
        
    }
    render(){
        const { data,country,fetchedcountrydata }=this.state;
        return(
            <div className={styles.container}>
            
                <img  className={styles.imgcontainer} alt="covid-19" src="https://i.ibb.co/7QpKsCX/image.png"></img>
           
                <Cards data={data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Charts data={data} country={country} fetchedcountrydata={fetchedcountrydata}/>                
            
            </div>
        )
    }
}

export default App;