import React from 'react'
import axios from '../../../axios/index';
import { Line } from 'react-chartjs-2';
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import { CURRENCY, SELECT_UR_CURR_TXT, SELECT_UR_TIME } from '../../constant';
import CurrencyList from '../../Components/CurrencyList'

function Details(props) {
    const [currencySign, setCurrencySign] = React.useState(props.location.detailsProps.sign ? props.location.detailsProps.sign : '$')
    const [base, setCurrency] = React.useState('USD');
    const [xUnit, setXUnit] = React.useState('second');
    // let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [chartLabel, setChartLabel] = React.useState(null)
    const [dataSet, setDataSet] = React.useState(null)
    const chartData = {
        labels: chartLabel,
        datasets: [
            {
                label: 'Coin Price in ' + currencySign + '',
                data: dataSet,
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ], xAxes: [{
                type: 'time',
                // distribution: 'series',
                time: {
                    unit: xUnit
                }
            }]
        }
    }

    const paramId = window.location.search.split('id=') ? window.location.search.split('id=')[1] : 1;
    const coinId = props.location.detailsProps.id ? props.location.detailsProps.id : paramId
    const [data, setData] = React.useState(null)
    const apiCall = (url, getHistory, getLabelType) => {
        axios.get(url)
            .then(
                response => {
                    if (response && response.data.status === 'success') {

                        let label;
                        let priceValue;
                        let finalResponse

                        if (getHistory && getLabelType) {
                            // console.log(getHistory, response.data.data.history, 'getHistory')
                            finalResponse = response.data.data.history
                            // console.log(finalResponse, 'finalResponsefinalResponse')
                            label = finalResponse.map((value, index) => {
                                // console.log(value.timestamp, new Date(value.timestamp), 'timestamp')
                                // const tm = new Date(value.timestamp)
                                const tm = value.timestamp
                                if (getLabelType === 'hr') {
                                    // return tm
                                    setXUnit('second')
                                }
                                else if (getLabelType === 'year') {
                                    // return tm
                                    setXUnit('month')
                                }
                                else {
                                    setXUnit('day')
                                    // return tm.getDate() + ' ' + monthNames[tm.getMonth()]
                                }
                                return tm
                            })

                            priceValue = Object.values(finalResponse).map((value, index) => {
                                // console.log(value.price, 'price')
                                return value.price
                            })
                            setChartLabel(label)
                            setDataSet(priceValue)
                        }
                        else {
                            console.log(response.data.data)
                            finalResponse = response.data.data
                            setData(finalResponse)
                            setCurrencySign(response.data.data.base.sign)
                            // label = Object.keys(finalResponse.coin.history).map((value, index) => {
                            //     return value
                            // })

                            // priceValue = Object.values(finalResponse.coin.history).map((value, index) => {
                            //     return value
                            // })
                        }
                    }
                }
            ).catch(err => {
                return err
            })

    }
    React.useEffect(() => {
        apiCall(`/coin/${coinId}?base=${base}`, false, null);
        apiCall(`/coin/${coinId}/history/24h?base=${base}`, true, 'hr');
    }, [coinId, base])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container width="xl" className="maxwidth">
                <div>
                    <Typography component="p" variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{SELECT_UR_CURR_TXT}</Typography>
                    <CurrencyList buttonList={CURRENCY} onClickHandler={setCurrency} customeHandler={false} />
                </div>

                <div>
                    <Typography component="p" variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{SELECT_UR_TIME}</Typography>

                <button onClick={() => { apiCall(`/coin/${coinId}/history/24h`, true, 'hr'); }}>
                        Last 24 Hours
                </button>
                    <button onClick={() => { apiCall(`/coin/${coinId}/history/7d`, true, 'day'); }}>
                        Last 7Days
                </button>
                    <button onClick={() => { apiCall(`/coin/${coinId}/history/30d`, true, 'day'); }}>
                        Last 30Days
                </button>
                    <button onClick={() => { apiCall(`/coin/${coinId}/history/1y`, true, 'year'); }}>
                        Last 1Year
                </button>
                    <button onClick={() => { apiCall(`/coin/${coinId}/history/5y`, true, 'year'); }}>
                        Last 5Years
                </button>
                </div>
                {
                    data && data.coin ?
                        <Container>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Line data={chartData} options={options} />
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        data.coin.name ? <div><b>Name:</b><br /> #{data.coin.rank} {data.coin.name}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.description ? <div><b>Description:</b><br /> <Typography dangerouslySetInnerHTML={{ __html: data.coin.description }} /><br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.websiteUrl ? <div><b>WebsiteUrl:</b><br /> {data.coin.websiteUrl}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.numberOfMarkets ? <div><b>numberOfMarkets:</b><br /> {data.coin.numberOfMarkets}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.numberOfExchanges ? <div><b>numberOfExchanges:</b><br /> {data.coin.numberOfExchanges}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.marketCap ? <div><b>marketCap:</b><br /> {data.coin.marketCap}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.price ? <div><b>price:</b><br /> {data.coin.price}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.allTimeHigh ? <div><b>allTimeHigh:</b><br /> {data.coin.allTimeHigh.price} On: {data.coin.allTimeHigh.timestamp}<br /><hr /></div> : null
                                    }
                                    {
                                        data.coin.websiteUrl ? <div><b>WebsiteUrl:</b><br /> {data.coin.websiteUrl}<br /><hr /></div> : null
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                        : null
                }
            </Container>
        </React.Fragment>
    );
}

export default Details;
