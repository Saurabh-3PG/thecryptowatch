import React, { useState } from 'react'
import { Link } from "react-router-dom";
//constant
import axios from '../../../axios/index';
import { CURRENCY, SELECT_UR_CURR_TXT, PERCENT_CHNAGE_TXT } from '../../constant';
//material
import { CssBaseline, Container, Grid, Typography, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
//styles
import styles from './Home.module.css'
import './Home.scss'
// components
import CurrencyList from '../../Components/CurrencyList'

function Home() {

    const [data, setData] = React.useState(null);
    const [base, setCurrency] = React.useState('USD');
    const [currencySign, setCurrencySign] = React.useState(null);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1)
    function apiCall(url) {
        axios.get(url)
            .then(
                response => {
                    if (response.data.status === 'success') {
                        setData(response.data.data)
                        console.log(response.data.data)
                        setCurrencySign(response.data.data.base.sign)
                        setTotal(response.data.data.stats.total)
                    }
                }
            ).catch(err => {
                console.log(`${err} whilst contacting the quote API.`)
            })

    }

    const handleChangePagination = (event, value) => {
        setOffset((value - 1) * 10);
        setPage(value);
        console.log(value)
    };

    React.useEffect(() => {
        console.log(offset, 'offset', page, 'page', total, 'total')
        apiCall(`/coins?base=${base}&&offset=${offset}&&limit=${9}`)
    }, [base, offset, page, total])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container width="xl" className="maxwidth">

                <div className={styles.AppPagination}>
                    <Grid xs={12} container direction="row" alignItems="center" justify="center" id="app_pagination_container">
                        <Pagination
                            page={page}
                            onChange={handleChangePagination}
                            count={Math.ceil(total / 9)}
                            color="primary"
                        />
                    </Grid>
                </div>

                <div className={styles.Currency}>
                    <Typography className={styles.CurrTxt} component="p" variant="caption" color="secondary" style={{fontWeight: 'bold'}}>{SELECT_UR_CURR_TXT}</Typography>
                    <CurrencyList buttonList={CURRENCY} onClickHandler={setCurrency} customeHandler={false} />
                </div>

                <div className={styles.detailCardContainer}>

                    {
                        data && data.coins && data.coins.length > 0
                            ? Object.values(data.coins).map((coin, index) => {
                                return (
                                    <div key={index} className="app_detail_card" style={{
                                        borderTop: `24px solid ${coin.color ? coin.color : '#3f51b5'}`,
                                        marginBottom: '48px'
                                    }}>

                                        <Grid className="app_detail_card_header" container direction="row" alignItems="flex-start" justify="space-between">
                                            <Grid item>
                                                <Box style={{  display: 'flex', alignItems: 'center'}}>
                                                    <Box>
                                                        <img src={coin.iconUrl} alt={`${coin.name}`} height="70px" />
                                                    </Box>
                                                    <Box>
                                                        <Typography component="h2" variant="h2" className="coinName"><span>#{coin.rank}</span> {coin.name}</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box>
                                                    <Box>
                                                        <Typography component="p" variant="h2" color="secondary" className="app_detail_currentPrice" >
                                                            {currencySign} {Math.round(coin.price).toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography component="p" align="center" variant="h5"  className="app_detail_change" >
                                                            {PERCENT_CHNAGE_TXT} <span style={{
                                                                color: coin.change && coin.change < 0 ? 'red' : 'green',
                                                                fontWeight: 'bold'
                                                            }}>{coin.change}%</span>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid className="app_detail_card_body">
                                            <Grid item container direction="row" alignItems="flex-start" justify="space-between" xs="12" className="app_detail_card_body_boxes">
                                                <Box >{coin.marketCap}<br /><span>Market Cap</span></Box>
                                                <Box >{coin.marketCap}<br /><span>Market Cap</span></Box>
                                                <Box >{coin.marketCap}<br /><span>Market Cap</span></Box>
                                                <Box >{coin.marketCap}<br /><span>Market Cap</span></Box>
                                            </Grid>
                                        </Grid>
                                        <Grid className="app_detail_card_footer" container direction="row" alignItems="center" justify="center">
                                            <Link to={{
                                                pathname: `/details:id=${coin.id}`,
                                                detailsProps: {
                                                    id: coin.id,
                                                    currencySign: currencySign
                                                }
                                            }} > For more details </Link>
                                        </Grid>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </Container>
        </React.Fragment>
    );
}

export default Home;
