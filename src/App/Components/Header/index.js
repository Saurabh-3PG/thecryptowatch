import React from 'react';
import { CssBaseline, Container, Grid, Typography } from '@material-ui/core';
import { SITE_NAME } from '../../constant';
import { Link } from "react-router-dom";
import './style.scss';

function Header() {
    return (
        <React.Fragment>
            <CssBaseline />
            <header id='app_header' className="app_header positionFixed">
                <Container>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Link to={'./home'} > <Typography component="h1" variant="h2" color="primary" align="center">
                            {SITE_NAME}
                        </Typography> </Link>
                        
                    </Grid>
                </Container>
            </header>
        </React.Fragment>
    );
}

export default Header;
