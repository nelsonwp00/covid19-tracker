import React from 'react';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.css';


const Chart = ({ data }) => {

    const lineChart = ( 
        data.length ? 
        <Line 
            data={{
                labels: data.map((data) => data.Date),
                datasets: [{
                    data: data.map((data) => data.newConfirmed),
                    label: 'New confirmed cases',
                    borderColor: '#3333ff',
                }, {
                    data: data.map((data) => data.newRecovered),
                    label: 'New recovered cases',
                    borderColor: 'rgba(0, 255, 0, 0.9)',
                }, {
                    data: data.map((data) => data.newDeaths),
                    label: 'New deaths',
                    borderColor: 'rgba(255, 0, 0, 0.5)',
                }]
            }}
        /> : null
    );

    return (
        <div className={styles.container}>
            { lineChart }
        </div>
    )
}

export default Chart;