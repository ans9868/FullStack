import {useEffect, useState} from "react";
import axios from 'axios'

export const useCountry = (name) => {
    const [data, setData] =  useState(null)

    const found = () => {
        return data !== null && data !== ''
    }

    //name of country
    useEffect(() => {
        if(name){
            axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                .then( r => {
                    console.log(`r ${r}`)
                    console.log(r.data)
                    const allData = r.data //all the countries data, most of which we don't use
                    const selectData = {
                        name: allData.name.common,
                        capital: allData.capital[0],
                        flag: allData.flags.png,
                        population: allData.population
                    }
                    setData(selectData)
                }).catch(error => {
                    setData(null)
            })
        }
        console.log(`data ${data}`)
    }, [name])

    return{
        data,
        found
    }
}