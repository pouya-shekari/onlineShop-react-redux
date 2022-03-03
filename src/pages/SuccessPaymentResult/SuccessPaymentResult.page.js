import {UserLayout} from "../../layout";

const SuccessPaymentResult = (props)=>{
    return(
        <UserLayout>
            پرداخت موفق
        </UserLayout>
    )
}

export {SuccessPaymentResult}

/*
import {UserLayout} from "../../layout";
import {Typography, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import DoneIcon from '@material-ui/icons/Done';
import {useEffect} from 'react'
import {emptyUserCart} from "../../redux/actions/card.action"
import {connect} from "react-redux"
import {patchOrder} from "../../api/orders.api"
import {getProductWithId , patchProduct} from "../../api/products.api"
import { cartSelector } from "../../redux/selects/user.select"

const useStyles = makeStyles((theme) => ({
    header:{
        width:'70%',
        margin:'30px auto',
        textAlign:'right',
    },
    container:{
        display:'flex',
        width:'50%',
        justifyContent: 'center',
        margin:'auto',
        flexDirection:'row-reverse',
        alignItems: 'center'
    },
    paymentIcon:{
        position:'relative',
        width:'100px',
        height:'100px',
        borderRadius:'50%',
        backgroundColor:'green',
        marginLeft:'40px'
    },
    paymentIconItem:{
        fill: '#ffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: 'xxx-large',
        transform: 'translate(-50%, -50%)'
    }
}));


const PaymentSuccess = (props) =>{

    const classes = useStyles();
    const urlParams = new URLSearchParams(window.location.search);

    useEffect( ()=>{
        const getSuccessOrder = async () =>{
            try {
                const response = await patchOrder({ pay:true },urlParams.get('order'))
                const {products} = response.data
                products.map(async product => {
                    const response = await getProductWithId(product.id)
                    await patchProduct({ quantity: +response.data.quantity - +product.count },product.id)
                })
                props.emptyUserCart()
            } catch (error) {
                console.log(error)
            }
        }
        getSuccessOrder()
    }, [])

    return (
        <UserLayout>
            <Typography variant="h4" className={classes.header}>نتیجه ی پرداخت</Typography>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <div className={classes.paymentIcon}><DoneIcon className={classes.paymentIconItem} /></div>
                <Typography dir="rtl" variant="p" component="p" >با تشکر از پرداخت شما. سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد.</Typography>
            </Grid>
        </UserLayout>
    )
}

const mapStateToProps = (state) => ({userCart:cartSelector(state)})
const mapDispatchToProps = (dispatch) => ({ emptyUserCart:dispatch(emptyUserCart()) })

const SuccessPaymentResult = connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)
export {SuccessPaymentResult}*/
