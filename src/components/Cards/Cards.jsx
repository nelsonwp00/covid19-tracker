import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CountUp from 'react-countup';

import './Cards.css';

const Cards = (data) => {
    let totalActive, totalConfirmed, totalDeaths, totalRecovered, lastDate;

   
    let { data: { Active, Confirmed, Deaths, Recovered, Date } } = data;
    totalActive = Active;
    totalConfirmed = Confirmed;
    totalDeaths = Deaths;
    totalRecovered = Recovered;
    lastDate = Date;
    


    return (
        <div>
            <Grid container className='container'>

                <Grid item sm={12} component={Card} className='confirmed'>
                    <CardContent>
                        <Typography  color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography variant="h5" component="h2">
                            <CountUp 
                                start={0}
                                end={totalConfirmed}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent>
                    <div> 
                        <Typography variant='body2' color="textSecondary">
                            Last Update: { lastDate }
                        </Typography>
                        <Typography variant='body2' color="textSecondary">
                            Data Sources: WHO & Johns Hopkins CSSE
                        </Typography>
                    </div>
                </Grid>

                <Grid item sm={4} component={Card} className='item active'>
                    <CardContent>
                        <div className="show-percentage">
                            <Typography color="textSecondary">
                                Active
                            </Typography>  
                            <Chip 
                                label={`${Math.round(((totalActive/totalConfirmed) * 100).toPrecision(3))}%`}
                                size="small"
                                className="percentage"
                            />
                        </div>
                        <Typography variant="h5" component="h2">
                            <CountUp 
                                start={0}
                                end={totalActive}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} sm={4} className='item recovered'>
                    <CardContent>
                        <div className="show-percentage">
                            <Typography color="textSecondary">
                                Recovered
                            </Typography> 
                            <Chip 
                                label={`${Math.round(((totalRecovered/totalConfirmed) * 100).toPrecision(3))}%`}
                                size="small"
                                className="percentage"
                            />
                        </div>
                        <Typography variant="h5" component="h2">
                            <CountUp 
                                start={0}
                                end={totalRecovered}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} sm={4} className='item deaths'>
                    <CardContent>
                        <div className="show-percentage">
                            <Typography color="textSecondary">
                                Deaths
                            </Typography> 
                            <Chip 
                                label={`${Math.round(((totalDeaths/totalConfirmed) * 100).toPrecision(3))}%`}
                                size="small"
                                className="percentage"
                            />
                        </div>
                        <Typography variant="h5" component="h2">
                            <CountUp 
                                start={0}
                                end={totalDeaths}
                                duration={1}
                                separator=","
                            />
                        </Typography>
                    </CardContent>
                </Grid>

            </Grid>
        </div>
    )
}

export default Cards;