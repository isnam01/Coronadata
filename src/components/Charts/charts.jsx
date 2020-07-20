
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { fetchDailyData } from '../../api';

import styles from './chart.module.css';
import {Table} from '@material-ui/core';

const Charts = ({ data, country ,fetchedcountrydata}) => {
  const [dailyData, setDailyData] = useState({});  

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };
    
    fetchMyAPI();
  }, []);
  
  const barChart = (
    (data.confirmed && fetchedcountrydata) ? (
      <div className={styles.container}>
        <div>
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [data.confirmed.value, data.recovered.value, data.deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
      </div>
      <div style={{width: 'auto', overflowX: 'scroll'}}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Province State</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Recovered</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedcountrydata.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.combinedKey}
              </TableCell>
              <TableCell align="right">{row.confirmed}</TableCell>
              <TableCell align="right">{row.active}</TableCell>
              <TableCell align="right">{row.recovered}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>          
              
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </div>
        </div>
    ) : null
    
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Charts;

