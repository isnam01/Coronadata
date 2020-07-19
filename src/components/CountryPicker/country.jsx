import React,{ useState,useEffect } from 'react';
import { NativeSelect,FormControl } from '@material-ui/core';
import styles from './country.module.css'
import { countries } from '../../api/index'

const Country=({handleCountryChange})=>{
    const [fetchedCountries,setCountries]=useState([]);

    useEffect(()=>{
        const fetchCountries=async ()=>{
            setCountries(await countries());
        }
        fetchCountries();
    },[setCountries]);


    return(
        <FormControl className={styles.formcontrol}>
            <NativeSelect defaultValue='' onChange={(e)=>{handleCountryChange(e.target.value)}}>
                <option value="">Global</option>
                {fetchedCountries.map((country,i)=>
                <option key={i} value={country} >{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default Country;