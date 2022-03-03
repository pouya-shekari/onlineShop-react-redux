import React from 'react'
import {UserLayout} from "../../layout";
import {TextField, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useState} from "react"
import {connect} from "react-redux"
import {postOrder} from "../../api/orders.api"
import { cartSelector } from "../../redux/selects/user.select"
import { DatePicker } from "jalali-react-datepicker";

const useStyles = makeStyles((theme) => ({
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        width:'60%',
        margin: '50px auto'
    },
    input:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin:'20px 0'
    },
    dateInput:{
        height:'5rem',
        width:'32.5rem',
        border:'1px solid lightgray',
        borderRadius:'0.5rem'
    },
    textField:{
        width:'80%',
        margin:'7px 0',
        direction:'rtl',
    },
    buttonContainer:{
        textAlign: 'center'
    },
    payButton:{
        padding:'10px 25px',
        backgroundColor:'green',
        border:'2px solid var(--russian-violet)',
        color:'white',
        borderRadius:'0.5rem',
        cursor:'pointer'
    }
}));

const CheckoutPage = (props) =>{

    const classes = useStyles();

    const [state, setState] = useState({
        name:'', familyName:'', address:'', phone:'', deliveryTime:'',
    })



    const channgInputHandler  = ({target:{value}}, name)=>{
        setState({...state, [name]:value })
    }

    const setDeliveryTime = ({value:{_d}}) => {
        setState({...state, deliveryTime:new Date(_d) })
    }

    const productsInfo = props.userCart.map(prod=> ({id:prod.id, name:prod.name, price:prod.price, count:prod.count, allPrice:prod.allPrice}) )
    const submitHandler = async (event)=>{
        event.preventDefault()
        const { name, familyName, address, phone, deliveryTime } = state
        try {
            const response = await postOrder({
                name,
                familyName,
                address,
                phone,
                deliveryRequestTime:deliveryTime,
                pay:false,
                delivered:false,
                deliveryDoneTime:'',
                cost:props.userCart.reduce((acc, cv)=> acc + +cv.allPrice, 0),
                products:productsInfo
            })
            const { data:{id:orderId} } = response
            window.location.href='http://127.0.0.1:5501/payment.html'
            setState({
                name:'', familyName:'', address:'', phone:'', deliveryTime:'',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const { name, familyName, address, phone, deliveryTime } = state

    return (
        <UserLayout>
            <form onSubmit={submitHandler} >
                <div className={classes.container}>
                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>
                        <div className={classes.input}>
                            <div>
                                <label for="family-name">:نام خانوادگی</label>
                            </div>
                            <TextField required={true} onChange={e=>channgInputHandler(e, 'familyName')} value={familyName} className={classes.textField} id="family-name" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>
                        <div className={classes.input}>
                            <div>
                                <label for="name">:نام</label>
                            </div>
                            <TextField required={true} onChange={e=>channgInputHandler(e, 'name')} value={name} className={classes.textField} id="name" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>
                        <div className={classes.input}>
                            <div>
                                <label for="phone">:تلفن همراه</label>
                            </div>
                            <TextField  required={true} onChange={e=>channgInputHandler(e, 'phone')} type="number" value={phone} className={classes.textField} id="phone" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>
                        <div className={classes.input}>
                            <div>
                                <label for="address">:آدرس</label>
                            </div>
                            <TextField required={true} onChange={e=>channgInputHandler(e, 'address')} value={address} className={classes.textField} id="address" variant="outlined" />
                        </div>
                    </Grid>

                    <Grid xs={2} xl={6} lg={6} md={6} sm={6}>
                        <div className={classes.input}>
                            <div>
                                <label for="time" >:زمان تحویل</label>
                            </div>
                            <DatePicker className={classes.dateInput}
                                onClickSubmitButton={setDeliveryTime}
                            />
                        </div>
                    </Grid>

                </div>

                <div className={classes.buttonContainer}>
                    <button className={classes.payButton}>پرداخت</button>
                </div>
            </form>

        </UserLayout>
    )
}

const mapStateToProps = (state)=>({userCart:cartSelector(state)})
const Checkout = connect(mapStateToProps)(CheckoutPage)
export {Checkout}
