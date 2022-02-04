import React from "react";
import {Header} from "./components";

const AdminLayout = (props) =>{
    return(
        <>
            <Header />
            <div style={{width:'100%' , height:'90vh' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                {props.children}
            </div>
        </>
    )
}

export {AdminLayout}