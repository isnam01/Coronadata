import React from 'react';
import Cards from './components/Cards/cards';
import Country from './components/CountryPicker/country';
import Charts from './components/Charts/charts';
import styles from './App.module.css';
import { fetchData } from './api/index';

class App extends React.Component{

    state={
        data:{},
        country:'',
    }
    async componentDidMount (){
        const fetcheddata=await fetchData();
        this.setState({
            data:fetcheddata,
        });
    }

    handleCountryChange=async(country)=>{
        const fetcheddata=await fetchData(country);
        this.setState({
            data:fetcheddata,
            country:country,
        });
    }
    render(){
        const { data,country }=this.state;
        return(
            <div className={styles.container}>
            
                <img  className={styles.imgcontainer} alt="covid-19" src="https://i.ibb.co/7QpKsCX/image.png"></img>
           
                <Cards data={data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Charts data={data} country={country}/>                
            
            </div>
        )
    }
}

export default App;