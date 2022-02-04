import React from "react";
import {Link} from 'react-router-dom';
import {AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import {Navigation} from 'components';
import {PATHS} from 'configs/routes.config';
import {LINKS} from './Header.config';

const useStyle = makeStyles((theme) => ({

        toolbar:{
            display:'flex',
            justifyContent:'space-between',
            backgroundColor:theme.palette.info.main,
            flexWrap:'wrap'
        },
        rightSide:{
            display:"flex",
            alignItems:'center',
        },
        center:{
            display:'flex',
            alignItems:'center',
        },
        leftSide:{
            display:'flex',
        },
        navigation:{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            gap:theme.spacing(10),
            fontSize:'1.5rem'
        },
        title:{
            color:'#fff',
            fontSize:'2.5rem',
            fontFamily:'IRANSansX-Bold'
        },
        backToSite:{
            fontSize:'1.5rem'
        }
    })
)

const Header = (props) => {
    const classes = useStyle()
    return(
        <>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.rightSide}>
                        <Link to={PATHS.PANEL_PRODUCT}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                پنل مدیریت فروشگاه
                            </Typography>
                        </Link>
                    </div>

                    <div className={classes.center}>
                        <Navigation className={{navClass: classes.navigation}} links={LINKS}/>
                    </div>

                    <div className={classes.leftSide}>
                        <Link to={PATHS.HOME}>
                            <Typography className={classes.backToSite} variant="h6" noWrap>
                                بازگشت به سایت
                            </Typography>
                        </Link>
                    </div>

                </Toolbar>
            </AppBar>
        </>
    )
}

export {Header}