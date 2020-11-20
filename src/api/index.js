import axios from 'axios';
import compare from './utils';

// return an array of objects 
// object properties = { "Country": String, "Slug": String, "ISO2": String }
const fetchCountries = async () => {
    let changeableUrl = 'https://api.covid19api.com/countries';

    try {
        let { data } = await axios.get(changeableUrl);
        data.sort(compare);
        
        //console.log("Country List: ", data);    
        
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}

const fetchTotalCountry = async (country) => {
    let changeableUrl = `https://api.covid19api.com/total/country/${country.Slug}`;
    //console.log(changeableUrl);

    try {
        let { data } = await axios.get(changeableUrl);
        //console.log(data);

        if (data.lenght !== 0) {
            let { Active, Confirmed, Deaths, Recovered, Date } = data[Object.keys(data).length - 1];
            Date = Date.slice(0,10);
            //console.log(data[Object.keys(data).length - 1]);
            //console.log(Active, Confirmed, Deaths, Recovered, Date);
            return { Active, Confirmed, Deaths, Recovered, Date };
        }

        return;
    } 
    catch (error) {
        console.log(error);
    }
}

const fetchDailyCountry = async (country) => {
    let changeableUrl = `https://api.covid19api.com/total/country/${country.Slug}`;

    try {
        let { data } = await axios.get(changeableUrl);

        if (!data) return null;
        
        let length = Object.keys(data).length;

        data[0]['newConfirmed'] = data[0]['Confirmed'];
        data[0]['newDeaths'] = data[0]['Deaths'];
        data[0]['newRecovered'] = data[0]['Recovered'];
        data[0]['Date'] = data[0]['Date'].slice(0,10);

        for (let i = 1; i < length; i++) {
            data[i]['newConfirmed'] = data[i]['Confirmed'] - data[i-1]['Confirmed'];
            data[i]['newDeaths'] = data[i]['Deaths'] - data[i-1]['Deaths'];
            data[i]['newRecovered'] = data[i]['Recovered'] - data[i-1]['Recovered'];
            data[i]['Date'] = data[i]['Date'].slice(0,10);
        }

        //console.log(data);

        return data;
    }
    catch (error) {
        console.log(error);
    }
}


export { 
    fetchCountries, 
    fetchTotalCountry, 
    fetchDailyCountry
};