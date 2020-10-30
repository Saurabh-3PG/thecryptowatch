import React from 'react';
import { CssBaseline, Box, Button } from '@material-ui/core';

function CurrencyList(props) {
    const { onClickHandler, buttonList, customeHandler } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <Box>
                <ul>
                    {
                        buttonList && buttonList.map((value, index)=>{
                            return (
                                <li key={index}>
                                    <Button 
                                        id={`app_cur_lst_btn_${index}`} 
                                        className="app_cur_lst_btn" 
                                        color="primary" 
                                        onClick={customeHandler ? onClickHandler : () => onClickHandler(value)}
                                    >
                                        {value}
                                    </Button>
                                </li>
                            )
                        })
                    }
                </ul>
            </Box>
        </React.Fragment>
    );
}

export default CurrencyList;
