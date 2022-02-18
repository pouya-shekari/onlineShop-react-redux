import {UserLayout} from "../../layout"
import { Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {makeStyles, Typography } from "@material-ui/core"
import { getProductWithId} from "../../api/products.api"
import {e2p} from "../../utils/LanguageNumberConvertor.utils"
import {numberWithCommas} from "../../utils/numberWithCommas.utils"
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {connect} from "react-redux"
import {addToCart} from "../../redux/actions/card.action"
import { ToastContainer, toast } from 'react-toastify';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {Spinner} from "../../components"
import {getGroup} from "../../api/groups.api"
import { cartSelector } from "../../redux/selects/user.select"

const useStyles = makeStyles((theme)=>({
    productInfo:{
        width:'100%',
        marginTop:theme.spacing(7),
        color:'var(--russian-violet)',
        display:'flex',
        flexDirection:'column',
        alignItems:'end'
    },
    quantityInput:{
        width:'60px',
        marginLeft:theme.spacing(2)
    },
    cartButton:{
        padding:0,
        margin:0,
        display:'flex',
        width:'200px',
        justifyContent: 'space-evenly',
        backgroundColor:'lightgreen',
        color:'var(--russian-violet)',
        borderRadius:'4px',
        border:'2px solid var(--russian-violet)',
        boxSizing:'border-box',
        height:'40px',
        lineHeight:'36px',
        cursor:'pointer'
    },
    lineHeight:{
        lineHeight:'40px',
        height:'40px',
        display: 'inline-block',
    },
    productMainInfo:{
        display:'flex',
        flexDirection:'row-reverse',
        width:'700px',
        margin:'1rem 4rem',
        alignItems:'center',
        gap:'15rem'
    },
    productCategory:{
        display:'flex',
        justifyContent: 'flex-end',
        paddingRight:theme.spacing(2),
        margin:'15px 0'
    },
    productPrice:{
        textAlign:'right',
        paddingRight:theme.spacing(2),
        direction:'rtl'
    },
    productActions:{
        display:'flex',
        justifyContent: 'space-between',
        paddingRight:theme.spacing(2),
        marginTop:theme.spacing(2)
    },
    productDescription:{
        textAlign:'right',
        width:'700px',
        margin:'0 4rem',
        direction:'rtl',
    },
    productName:{
        paddingRight:theme.spacing(2),
        textAlign:'right'
    },
    productImage:{
        width:'300px',
        height:'300px',
        overflow: 'hidden',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImageItem:{
        width:'100%'
    },
    productCategoryTitle:{
        display:'inline-flex',
        alignItems: 'center',
        marginLeft:'20px',
    },
    productCategoryTitleLink:{
        textDecoration:'none',
        color:'var(--lavender-floral)'
    },
    productSubCategoryTitle:{
        display:'inline-flex',
        alignItems: 'center',
        color:'var(--lavender-floral)'
    }
}))

const ProductPage = (props) => {
    const classes = useStyles();

    const [ productsState, setProductsState] = useState({ })
    const [ cartcount, setCartCount] = useState({ quantity:1 })
    const [loading, setLoading] = useState({ show: true })

    useEffect( () =>{
        const getProductsByGroup = async ()=>{
            const response = await getProductWithId(props.params.productId)
            const product = response.data
            const groupResponse = await getGroup({params:{name:product.group}})
            product.groupId = groupResponse.data[0].id
            product.group = groupResponse.data[0].name
            await setProductsState(product)
            setLoading({show:false})
        }
        getProductsByGroup()
    }, [])

    const addToCartButtonClickHandler = async (event,product)=>{
        const response = await getProductWithId(product.id,'')
        const productInCart = props.userCart.find(prod=>prod.id===product.id)
        if(response.data.quantity>0)
            if( (!productInCart) ||  cartcount.quantity<=response.data.quantity ){
                props.addToCart(product, +cartcount.quantity)
                return
            }
        toast.error('متاسفانه موجودی محصول کافی نیست.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            rtl: true,
        });
    }

    const cartQuantityChangeHandler = (event)=>{
        event.target.value = event.target.value.replaceAll(/[.-]/g, '')
        setCartCount({ quantity: event.target.value})
    }

    const {name, description, image, group='', headgroup, price, id, groupId=''} = productsState

    const pageContent = (
        <main>
            <section className={classes.productInfo}>
                <div className={classes.productMainInfo}>
                    <div className={classes.productImage}>
                        <img className={classes.productImageItem} src={`http://localhost:3001${image}`}/>
                    </div>
                    <div style={{display:'flex' , flexDirection:'column' , gap:'2rem'}}>
                        <Typography className={classes.productName} variant="h4" component="h1">{name}</Typography>
                        <div className={classes.productCategory}>
                            <Typography variant="h6" component="p" className={classes.productSubCategoryTitle}>{headgroup}</Typography>
                            <Typography variant="h6" component="p" className={classes.productCategoryTitle}>
                                <ArrowLeftIcon style={{color:'var(--lavender-floral)'}}/>
                                <Link to={`/product/group/${groupId}/${group.trim().replaceAll(' ', '-')}`} className={classes.productCategoryTitleLink}>{group}</Link>
                            </Typography>
                        </div>
                        <Typography variant="h5" component="p" className={classes.productPrice}>{e2p(numberWithCommas(''+price))} تومان</Typography>
                        <div className={classes.productActions}>
                            <button className={[classes.cartButton]} onClick={(event)=>addToCartButtonClickHandler(event, {name,price:+price,id})}>
                                <ControlPointIcon className={classes.lineHeight}/><div className={classes.lineHeight}>افزودن به سبد خرید</div>
                            </button>
                            <input onChange={cartQuantityChangeHandler} value={cartcount.quantity} min="1" className={classes.quantityInput} type="number" />
                        </div>
                    </div>
                </div>
                <Typography className={classes.productDescription} variant="h5" component="p" dangerouslySetInnerHTML={{__html:description}}/>
            </section>
        </main>
    )

    return (
        <div>
            <UserLayout>
                <Spinner isLoading={loading.show} content={pageContent} />
            </UserLayout>

            <ToastContainer rtl={true}/>
        </div>
    )
}

const mapStateToProps = (state) => ({userCart:cartSelector(state)})
const mapDispatchToProps = (dispatch) => ({
    addToCart:(product, count) => dispatch(addToCart(product, count))
})

const Product = connect(mapStateToProps, mapDispatchToProps)(ProductPage)
export {Product}