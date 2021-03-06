import { Grid, makeStyles, Card, CardContent, Typography  } from "@material-ui/core"
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'60px 40px',
        padding:"20px 20px 50px",
        position: 'relative',
        boxShadow:"0 0 13px 8px lightGray",
        gap: '0.5rem',
        minHeight:'36rem',
        width:'25rem'
    },
    img: {
        width:200,
        height:170,

    },
    content:{
        textAlign:'right',
        width:'70%'
    },
    subtitle:{
        color:'var(--russian-violet)',
        marginTop:'1rem',
        fontSize:'1.5rem'
    },
    title:{
        color:'var(--russian-violet)'
    },
    button:{
        position: 'absolute',
        bottom:10,
        left:10,
        backgroundColor:"#2196f3",
        padding:"5px 13px",
        borderRadius:"4px",
        textDecoration:'none',
        width:'91%',
        textAlign:'center'
    }
}));

const ProductCard = (props) => {
    const classes = useStyles();

    const {name , price, image, url, lg=3, md=4, sm=6, xs=12, xl=3 } = props
    return (
        <Grid item lg={lg} md={md} sm={sm} xs={xs} xl={xl} >
            <Card className={classes.card} onClick={()=>window.location.href = url} >
                <div className={classes.img}>
                    <img style={{width:'200px' , height:'170px'}} src={`http://localhost:3001/files/${image[0]}`}/>
                </div>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.title}>{name}</Typography>
                    <Typography className={classes.subtitle} variant="h6" component="p">{price}</Typography>
                </CardContent>
                <Link size="small" className={classes.button} to={url} onClick={e=>e.stopPropagation()}>
                    <div style={{color:'white' , fontSize:'1.4rem' , textAlign:'center'}}>
                        ?????????????? ??????????
                    </div>
                </Link>
            </Card>
        </Grid>
    )
}

export {
    ProductCard
}