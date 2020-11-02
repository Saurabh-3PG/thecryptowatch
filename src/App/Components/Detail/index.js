import React from 'react';
import { PERCENT_CHNAGE_TXT } from '../../constant';
import { CssBaseline, Grid, Typography, Box } from '@material-ui/core';
import { Link } from "react-router-dom";
// import { Col, Card, ProgressBar } from 'react-bootstrap';
// import { Badge } from 'reactstrap';
function Detail(props) {
    const { id, src, name, rank, sign, price, change, color, marketCap} = props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className="app_detail_card" style={{
                    borderTop: `24px solid ${color ? color : '#3f51b5'}`,
                    marginBottom: '48px'
                }}>

                    <Grid className="app_detail_card_header" container direction="row" alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <img src={src} alt={`${name}`} height="70px" />
                                </Box>
                                <Box>
                                    <Typography component="h2" variant="h2" className="coinName"><span>#{rank}</span> {name}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Box>
                                    <Typography component="p" variant="h2" color="secondary" className="app_detail_currentPrice" >
                                        {sign} {Math.round(price).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography component="p" align="center" variant="h5" className="app_detail_change" >
                                        {PERCENT_CHNAGE_TXT} <span style={{
                                            color: change && change < 0 ? 'red' : 'green',
                                            fontWeight: 'bold'
                                        }}>{change}%</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid className="app_detail_card_body">
                        <Grid item container direction="row" alignItems="flex-start" justify="space-between" xs="12" className="app_detail_card_body_boxes">
                            <Box >{marketCap}<br /><span>Market Cap</span></Box>
                            <Box >{marketCap}<br /><span>Market Cap</span></Box>
                            <Box >{marketCap}<br /><span>Market Cap</span></Box>
                            <Box >{marketCap}<br /><span>Market Cap</span></Box>
                        </Grid>
                    </Grid>
                    <Grid className="app_detail_card_footer" container direction="row" alignItems="center" justify="center">
                        <Link to={{
                            pathname: `/details:id=${id}`,
                            detailsProps: {
                                id: id,
                                sign: sign
                            }
                        }} > For more details </Link>
                    </Grid>
                </div>
            </React.Fragment>
        );
}
export default Detail;
