import React from 'react'
import {UserLayout} from "../../layout";
import {useEffect, useState} from "react"
import {Grid , makeStyles, Typography} from "@material-ui/core"
import {Sidebar, ProductCard , Spinner} from "../../components"
import {getGroup} from "../../api/groups.api"
import {getProducts} from "../../api/products.api"
import {e2p} from "../../utils/LanguageNumberConvertor.utils"
import {numberWithCommas} from "../../utils/numberWithCommas.utils"

const useStyles = makeStyles((theme) => ({
    asideContainer:{
        height:'100vh',
        boxSizing: 'border-box',
    },
    productGroupTitle:{
        textAlign:'right',
        marginTop:theme.spacing(7),
        marginRight:theme.spacing(3),
        color:'var(--russian-violet)'
    },
    productsContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'flex-end',
    },
    mainContent:{
        borderRight: '1px solid var(--lavender-floral)',
    }
}));


const Products = (props) =>{
    const classes = useStyles();
    const [groupsState, setGroupsState] = useState({ groups: [] })
    const [productsState, setProductsState] = useState({ products: [] })
    const [loading, setLoading] = useState({ show: true })

    useEffect( ()=>{
        const getGroupsAndProducts = async () => {
            const allgroups = []
            const response = await getGroup()
            const groups = response.data
            groups.map(async (group , index)=>{
                const response = await getProducts({params: {group:group.name}})
                allgroups.push({
                    group:group.name,
                    groupId:group.id,
                    products:response.data.map(prod=> ({name:prod.name, id:prod.id})),
                })
                if(index ===groups.length-1){
                    await setGroupsState({groups:allgroups})
                }
            })
        }
        getGroupsAndProducts()
    }, [])

    useEffect(async ()=>{
        const getProductByGroupName = async () =>{
            const response = await getProducts({params: {group:props.params.groupName.replaceAll('-', ' ')}})
            const products = response.data
            await setProductsState({ products:products })
            setLoading({show:false})
        }
        getProductByGroupName()
    }, [])

    const pageContent = (
        <div style={{display:'flex', }}>
            <Grid item lg={10} md={9} sm ={8} xs={8} className={classes.mainContent}>
                <Typography variant="h4" component="h1" className={classes.productGroupTitle}>{props.params.groupName.replaceAll('-', ' ')}</Typography>
                <div className={classes.productsContainer}>
                    {productsState.products.map((prod, index)=>{
                        const {name, image, id, price} = prod
                        return (<ProductCard lg={4} md={6} sm ={12} xs={12} url={`/product/${id}`} name={name} price={e2p(numberWithCommas(price))} image={image}></ProductCard>)
                    })}
                </div>
            </Grid>
            <Grid item lg={2} md={3} sm ={4} xs={4} className={classes.asideContainer}>
                <Sidebar groups={groupsState.groups}/>
            </Grid>
        </div>
    )

    return (
        <div>
            <UserLayout>
                <Spinner isLoading={loading.show} content={pageContent} />
            </UserLayout>
        </div>
    )
}

export {Products}