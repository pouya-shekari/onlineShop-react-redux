import {Link} from 'react-router-dom';
import {AppBar, makeStyles, Toolbar, Typography , Badge} from "@material-ui/core";
import {LocalMall, ShoppingBasket} from "@material-ui/icons";
import {Navigation} from 'components';
import {PATHS} from 'configs/routes.config';
import {LINKS} from './Header.config';
import React from "react";
import {connect} from "react-redux"
import {removeFromCart} from "../../../../redux/actions/card.action"
import {e2p} from "../../../../utils/LanguageNumberConvertor.utils"
import { cartSelector } from "../../../../redux/selects/user.select"

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
        leftSide:{
            display:'flex',
            alignItems:'center',
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
            fontSize:'2.5rem!important',
            fontFamily:'IRANSansX-Bold'
        },
        image:{
            width:'10rem',
            height:'5rem'
        },
        icon:{
            transform:'translate(10rem)'
        }
    })
)

const HeaderLayout = (props) => {
    const classes = useStyle()
    return(
        <>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.rightSide}>
                        <LocalMall className={classes.image} />
                        <Link to={PATHS.HOME}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                فروشگاه فلان
                            </Typography>
                        </Link>
                    </div>

                    <div className={classes.leftSide}>
                        <Navigation className={{navClass: classes.navigation}} links={LINKS}/>
                        <Badge className={classes.icon} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                               badgeContent={e2p(''+props.userCart.reduce((acc,cv)=>acc+cv.count, 0))}
                               color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </div>

                </Toolbar>
            </AppBar>
        </>
    )
}

const mapStateToProps = (state) => ({userCart:cartSelector(state)})
const mapDispatchToProps = (dispatch) => ({removeFromCart:product => dispatch(removeFromCart(product))})

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderLayout)
export {Header}