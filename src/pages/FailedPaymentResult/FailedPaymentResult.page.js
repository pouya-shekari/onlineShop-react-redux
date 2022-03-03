import {UserLayout} from "../../layout";
import {Typography, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom"
import {useEffect} from "react"
import {deleteOrder} from "../../api/orders.api"
import {PATHS} from "../../configs/routes.config";

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
        flexDirection:'column',
        alignItems: 'center',
    },
    info:{
        display:'flex',
        flexDirection:'row-reverse',
        alignItems:'center',
        marginBottom:'5rem'
    },
    paymentIcon:{
        position:'relative',
        width:'100px',
        height:'100px',
        borderRadius:'50%',
        backgroundColor:'red',
        marginLeft:'40px',
        fontSize:'5rem'
    },
    paymentIconItem:{
        fill: '#ffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: 'xxx-large !important',
        transform: 'translate(-50%, -50%)'
    },
    backToHome:{
        color:'blue',
        fontSize:'2rem'
    },
    backToCartPageLink:{
        textDecoration:'none',
        border:'1px solid var(--lavender-floral)',
        color:'var(--lavender-floral)'
    }
}));

const FailedPaymentResult = (props)=>{

    const classes = useStyles();

    const orderId = localStorage.getItem('orderId');
    useEffect(async ()=>{
        const deleteMyOrder = async ()=>{
            try {
                await deleteOrder(orderId).then(()=>{localStorage.setItem('orderId',-1)})
            } catch (error) {
                console.log(error)
            }
        }
        deleteMyOrder()
    }, [])

    return (
        <UserLayout>
            <Typography variant="h4" className={classes.header}>نتیجه ی پرداخت</Typography>
            <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
                <div className={classes.info}>
                    <div className={classes.paymentIcon}><CloseIcon className={classes.paymentIconItem}/></div>
                    <Typography dir="rtl" variant="p" component="p">پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.</Typography>
                </div>
                <Link className={classes.backToHome} to={PATHS.HOME}>بازگشت به سایت</Link>
            </Grid>
        </UserLayout>
    )
}

export {FailedPaymentResult}
