import React from 'react'
import { Link } from "react-router-dom";
import axios from '../../../axios/index';
import { CssBaseline, Container } from '@material-ui/core';
// import RedditIcon from '@material-ui/icons/Reddit';

import LinkIcon from '@material-ui/icons/Link';
function Home() {

    const [data, setData] = React.useState(null)
    const [base, setCurrency] = React.useState('USD')
    const [currencySign, setCurrencySign] = React.useState(null)
    function apiCall(url) {
        axios.get(url)
            .then(
                response => {
                    if (response.data.status === 'success') {
                        setData(response.data.data)
                        setCurrencySign(response.data.data.base.sign)
                    }
                }
            ).catch(err => {
                console.log(`${err} whilst contacting the quote API.`)
            })

    }
    React.useEffect(() => {
        apiCall(`/coins?base=${base}&&offset=0&&limit=10`)
    }, [base])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <span>Set currency</span>
                <div>
                    <button onClick={() => setCurrency('USD')}>USD</button>
                    <button onClick={() => setCurrency('EUR')}>EUR</button>
                    <button onClick={() => setCurrency('JPY')}>JPY</button>
                    <button onClick={() => setCurrency('BTC')}>BTC</button>
                    <button onClick={() => setCurrency('ETH')}>ETH</button>
                </div>
                <div style={{
                    width: '100%',
                    maxWidth: '100%',
                    display: "flex",
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    {
                        data && data.coins && data.coins.length > 0
                            ? Object(data.coins).map((coin, index) => {
                                return (
                                    <div key={index} style={{
                                        marginBottom: '32px',
                                        padding: '54px',
                                        boxShadow: '0px 1px 1px 2px #ccc',
                                        width: '360px',
                                        height: '100%'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}>
                                            <img src={coin.iconUrl} alt={`${coin.name}`} height="100px" />
                                        </div>

                                        <div style={{
                                            padding: '8px',
                                            marginTop: '54px',
                                            background: coin.color ? coin.color : '#ccc',
                                            minHeight: "300px"
                                        }}>
                                            <div
                                                style={{
                                                    padding: '8px',
                                                    background: '#fff',
                                                    minHeight: "220px"
                                                }}
                                            >
                                                <b>Coin Name:</b> {coin.name}
                                                <hr />
                                                <b>Price:</b> {currencySign}{coin.price}
                                                <hr />
                                                <b>Change:</b> {coin.change}
                                                <hr />
                                                <b>Market Cap:</b> {coin.marketCap}
                                                <hr />
                                                <ul>
                                                    <li>Rank: #{coin.rank}</li>
                                                    {
                                                        coin.socials.map((social, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <a href={social.url} target="_blank" rel="noreferrer" >
                                                                        <LinkIcon fontSize="small" color="primary" />
                                                                        {/* <Icon fontSize="small">{social.type}</Icon> */}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <Link to={{
                                                pathname: `/details:id=${coin.id}`,
                                                detailsProps: {
                                                    id: coin.id,
                                                    currencySign: currencySign
                                                }
                                            }} > More details </Link>
                                        </div>
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
