import { useEffect, useState } from 'react';
import {Grid, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {Pagination , PaginationItem} from '@material-ui/lab'
import {getProducts} from "../../../api/products.api"

const useStyles = makeStyles({
    container: {
        margin: '20px auto 0',
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    tableHeading: {
        backgroundColor: 'var(--light-face)'
    },
    tableRow1: {
        backgroundColor: 'whitesmoke'
    },
    tableRow2: {
        backgroundColor: 'var(--light-face)'
    },
    table: {
        minWidth: 650,
    },
    editButton: {
        backgroundColor: '#2196f3',
        border: 'none',
        color: 'white',
        textDecoration: 'none',
        borderRadius:'0.5rem',
        marginLeft:'2rem',
        padding:'0.5rem 1.5rem',
        cursor:'pointer'
    },
    deleteButton:{
        backgroundColor: 'red',
        border: 'none',
        color: 'white',
        textDecoration: 'none',
        borderRadius:'0.5rem',
        padding:'0.5rem 1.5rem',
        cursor:'pointer'
    }

});

const ProductsTable = (props) => {
    const classes = useStyles();
    const [productsState, setProductsState] = useState([])
    const [pageState, setPageState] = useState({perpage:5,page:1})
    const [pagesCountState, setPagesCount] = useState(null)

    const handleChange = async (event, newPage) => {
        await setPageState({...pageState,page:newPage})
    };

    useEffect( ()=>{
        const getProductsPerPage = async ()=>{
            try {
                const { page, perpage } = pageState
                const response = await getProducts({params:{_page:page, _limit:5}})
                await setProductsState(response.data)

                const productsCount = response.headers['x-total-count']
                const pagesCount = Math.ceil( productsCount / perpage )
                setPagesCount(pagesCount)

            } catch (error) {
                console.log(error)
            }
        }
        getProductsPerPage()
    }, [])

    const getProductsPerPage = async () =>{
        const { page } = pageState
        const response = await getProducts( {params:{_page:page, _limit:5}})
        setProductsState(response.data)
    }

    useEffect( ()=>{
        getProductsPerPage()
    }, [pageState])


    useEffect( ()=>{
        const getProductsPerPage = async ()=>{
            if(props.mode === 'default'){
                const { page } = pageState
                const response = await getProducts({params:{_page:page, _limit:5}})
                console.log(response.data)
                setProductsState(response.data)
            }
        }
        getProductsPerPage()
    }, [props.mode])

    const {openModalEditButtonHandler,openModalDeleteButtonHandler} = props
    return (
        <Grid item lg={8} md={10} sm ={10} xs={10} className={classes.container}>
            <TableContainer style={{overflowY:"hidden"}} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeading}>
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">???????? ????????</TableCell>
                            <TableCell align="right">?????? ????????</TableCell>
                            <TableCell align="right">??????????</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsState.map((row, index) => {
                            const { id, headgroup, group, name, image, description } = row
                            return (
                                <TableRow className={index%2===0? classes.tableRow1 : classes.tableRow2} key={id}>
                                    <TableCell align="left" component="th" scope="row">
                                        <button className={classes.deleteButton} onClick={(row)=>openModalDeleteButtonHandler({ id, headgroup, group, name, image, description })}>??????</button>
                                        <button className={classes.editButton} onClick={(row)=>openModalEditButtonHandler({ id, headgroup, group, name, image, description })}>????????????</button>
                                    </TableCell>
                                    <TableCell align="right">{`${headgroup}/${group}`}</TableCell>
                                    <TableCell align="right">{name}</TableCell>
                                    <TableCell style={{display:'flex'}} align="right" component="th" scope="row">
                                        <div style={{width: '70px', height:'70px', overflow: 'hidden'}}><img style={{width:"100%" , height:'100%'}} src={`http://localhost:3001/files/${image[0]}`}/></div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                hidePrevButton
                hideNextButton
                showFirstButton
                showLastButton
                count={pagesCountState}
                page={pageState.page}
                onChange={handleChange}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`?page=${item.page}`}
                        {...item}
                    />
                )}
            />
        </Grid>

    );
}

export {ProductsTable}