import {useState , useEffect} from "react"
import {AdminLayout} from "../../layout";
import {Helmet} from 'react-helmet'
import {ProductsTable, ProductModal} from "./components/index"
import {Typography, Button, Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {deleteProduct } from "../../api/products.api"
import {connect} from 'react-redux';
import {fetchProducts} from '../../redux/actions/product.action';

const useStyles = makeStyles({
    container:{
        margin:'20px auto 0',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

const PanelProductPage  = (props) => {

    useEffect(() => {
        try {
            this.props.getProducts();
        } catch (e) {
            console.log('error products');
        }
    }, []);

    const classes = useStyles();
    const [modalOpenHandler, setModalOpenHandler] = useState({modalHandler:null})
    const [modalMode, setModalMode] = useState({mode:null, data:null})

    const openModalButtonHandler = async ()=>{
        await setModalMode({...modalMode,mode:'add'})
        modalOpenHandler.modalHandler()
    }

    const openModalEditButtonHandler = async (row)=>{
        await setModalMode({data:row,mode:'edit'})
        modalOpenHandler.modalHandler()
    }

    const openModalDeleteButtonHandler = async (row)=>{
        await setModalMode({...modalMode,mode:'delete'})
        await deleteProduct(row.id)
        setModalMode({...modalMode, mode:'default'})
    }

    return (
        <>
            <Helmet>
                <title>Project | Products Panel</title>
            </Helmet>

            <AdminLayout>
                <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}  onClick={openModalButtonHandler}>
                    <Button variant="contained" color="primary" >افزودن کالا</Button>
                    <Typography variant="h4" component="p">مدیریت کالا ها</Typography>
                </Grid>
                <ProductsTable
                    openModalEditButtonHandler={openModalEditButtonHandler}
                    openModalDeleteButtonHandler={openModalDeleteButtonHandler}
                    mode={modalMode.mode}
                />
                <ProductModal setModalOpenHandler={setModalOpenHandler} mode={modalMode.mode} product={modalMode.data} setMode={setModalMode}/>
            </AdminLayout>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts())
    }
};

const PanelProduct = connect(undefined, mapDispatchToProps)(PanelProductPage)

export {PanelProduct}