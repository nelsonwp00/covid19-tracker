import React from 'react';
import { Cards, Chart, CountryPicker, ErrorPage } from './components';
import * as fetchAPI from './api/index';
import logo from './images/logo.png';
import Typography from '@material-ui/core/Typography';

import styles from './App.module.css'

const { 
    fetchTotalCountry, 
    fetchDailyCountry
} = fetchAPI;
class App extends React.Component {

    state = {
        currentTotalData: null,
        dailyData: null,
        country: '',
        selected: false,
        hasAPIError: false,
    }

    handleCountryChange = async (country) => {
        let currentTotalData, dailyData;

        if (country) {
            currentTotalData = await fetchTotalCountry(country);
            dailyData = await fetchDailyCountry(country);
        } 

        //console.log("country selected:", country);
        //console.log('currentTotalData: ', currentTotalData);
        //console.log('dailyData: ', dailyData);

        this.setState({ currentTotalData, dailyData, country, selected: true });
    }

    handleAPIError = () => {
        console.log("API Error");
        this.setState({ hasAPIError: true });
    }


    render() {
        const { currentTotalData, dailyData, selected, hasAPIError } = this.state;
        let result;

        if (hasAPIError) { 
            result = 
                <div className={styles.container}>
                    <ErrorPage /> 
                </div>
        }

        else if (currentTotalData && dailyData) {
            result = 
                <div className={styles.container}>
                    <Cards data={currentTotalData} />
                    <CountryPicker handleCountryChange={this.handleCountryChange} handleAPIError={this.handleAPIError}/>
                    <Chart data={dailyData} />
                </div>
        } 
        else {
            //console.log('error : ' + currentTotalData);
            if (selected) {
                result = 
                <div className={styles.container}>
                    <Typography variant="h4" component="h4" className='query-text mt-3'>
                        Sorry, there is no data of this country
                    </Typography>
                    <CountryPicker handleCountryChange={this.handleCountryChange} handleAPIError={this.handleAPIError}/>
                </div>

            }
            else {
                result = 
                <div className={styles.container}>
                    <Typography variant="h4" component="h4" className='query-text mt-3'>
                        Please select a country
                    </Typography>
                    <CountryPicker handleCountryChange={this.handleCountryChange} handleAPIError={this.handleAPIError}/>
                </div>
            }
        }
    
        return (
            <div className={styles.container}>
                <img className={styles.image} src={logo} alt='COVID-19'/>
                { result }
            </div>
        )
    }
}

export default App;