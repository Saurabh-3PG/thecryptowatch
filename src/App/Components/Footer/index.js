import React from 'react';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { DEVELOPER_NAME } from '../../constant';
import './style.scss';

function Footer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <footer id='app_footer' className="app_footer positionFixed">
                <Container>
                    <Grid container direction="row" alignItems="center" justify="center">
                        By: {DEVELOPER_NAME}
                    </Grid>
                </Container>
            </footer>
        </React.Fragment>
    );
}

export default Footer;
