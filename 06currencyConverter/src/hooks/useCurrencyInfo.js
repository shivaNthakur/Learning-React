import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    // Will only want to fetch api when this hook is called so we use useEffect hook to do it.

    const [data , setData] = useState({})
    useEffect( () => {
        fetch( `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json` )
        .then( (res) => res.json() )
        .then( (res) => setData(res[currency]))
        console.log(data);
        
    }, [currency] )
    return data // returning only data why not both setData and data because making custom hook method and do further research
}


export default useCurrencyInfo;