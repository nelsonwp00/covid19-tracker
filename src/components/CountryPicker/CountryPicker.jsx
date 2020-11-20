import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api/index'

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async function() {
            const countries = await fetchCountries();
            setCountries(countries);
        })();

    }, [setCountries])

    function passCountrySelected(countryIndex) {
        const country = countries[countryIndex];
        handleCountryChange(country);
    }

    const options = countries ? countries.map((data, index) => 
        <option value={index} key={index}>{data.Country}</option>
    ) : '';

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect 
                defaultValue="" 
                onChange={(evenet) => passCountrySelected(evenet.target.value)}>
                {options}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;