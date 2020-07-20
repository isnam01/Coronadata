import axios from 'axios';

const url=" https://covid19.mathdro.id/api";

export const fetchData=async (country)=>{
try{
    let changeableurl=url;
    let countryurl='';
    if(country){
        changeableurl=`${url}/countries/${country}`;
        }
    const { data }=await axios.get(changeableurl);
    
  
    const modifieddata={
        confirmed:data.confirmed,
        recovered:data.recovered,
        deaths:data.deaths,
        lastUpdate:data.lastUpdate
    }
  
    return modifieddata;

}
catch(error){
    console.log(error);
}
}

export const fetchDailyData=async()=>{
    try{
        const {data}=await axios.get(`${url}/daily`);
        const modifieddata=data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,
        }));
        
        return modifieddata;
    }
    catch (error){
        console.log(error);
    }
}

export const countries=async()=>{
    try{
        const { data } =await axios.get(`${url}/countries`);
        const modifiedData=data.countries.map((countries)=>
            countries.name
       );
        return modifiedData;
        }
    catch(error){
        console.log(error);
    }
}
export const countrydata=async(country)=>{
    try{
        const { data } =await axios.get(`${url}/countries/${country}/confirmed`);
        const modifiedData=data.map((provinceState)=>
            provinceState
       );
        return modifiedData;
        }
    catch(error){
        console.log(error);
    }
}