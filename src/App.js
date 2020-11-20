import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
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


    render() {
        const { currentTotalData, dailyData, selected } = this.state;
        let result;
        if (currentTotalData && dailyData) {
            result = 
                <div className={styles.container}>
                    <img className={styles.image} src={logo} alt='COVID-19'/>
                    <Cards data={currentTotalData} />
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                    <Chart data={dailyData} />
                </div>
        } 
        else {
            //console.log('error : ' + currentTotalData);
            if (selected) {
                result = 
                <div className={styles.container}>
                    <img className={styles.image} src={logo} alt='COVID-19'/>
                    <Typography variant="h4" component="h4" class='query-text'>
                        Sorry, there is no data of this country
                    </Typography>
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                </div>

            }
            else {
                result = 
                <div className={styles.container}>
                    <img className={styles.image} src={logo} alt='COVID-19'/>
                    <Typography variant="h4" component="h4" class='query-text'>
                        Please select a country
                    </Typography>
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                </div>
            }
        }
    
        return (
            <div className={styles.container}>
                {result}
            </div>
        )
    }
}

export default App;