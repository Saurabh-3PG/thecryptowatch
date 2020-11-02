import React, { useState } from 'react'
//constant
import axios from '../../../axios/index';
import { CURRENCY, SELECT_UR_CURR_TXT } from '../../constant';
//material
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
//styles
import styles from './Home.module.css'
import './Home.scss'
// components
import Detail from '../../Components/Detail'
import CurrencyList from '../../Components/CurrencyList'

function Home() {

    const [data, setData] = React.useState(null);
    const [base, setCurrency] = React.useState('USD');
    const [currencySign, setCurrencySign] = React.useState('$');
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
                    <Grid container direction="row" alignItems="center" justify="center" id="app_pagination_container">
                        <Pagination
                            page={page}
                            onChange={handleChangePagination}
                            count={Math.ceil(total / 9)}
                            color="primary"
                        />
                    </Grid>
                </div>

                <div className={styles.Currency}>
                    <Typography className={styles.CurrTxt} component="p" variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{SELECT_UR_CURR_TXT}</Typography>
                    <CurrencyList buttonList={CURRENCY} onClickHandler={setCurrency} customeHandler={false} />
                </div>

                <div className={styles.detailCardContainer}>

                    {
                        data && data.coins && data.coins.length > 0
                            ? Object.values(data.coins).map((coin, index) => {
                                return (
                                    <Detail
                                        key={index}
                                        id={coin.id} src={coin.iconUrl} name={coin.name} rank={coin.rank} sign={currencySign} price={coin.price} change={coin.change}
                                        color={coin.color} marketCap={coin.marketCap} totalSupply={coin.totalSupply} numberOfExchanges={coin.numberOfExchanges}
                                        numberOfMarkets={coin.numberOfMarkets}

                                    />
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
