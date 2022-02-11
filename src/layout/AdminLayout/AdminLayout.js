import React from "react";
import {Header} from "./components";

const AdminLayout = (props) =>{
    return(
        <>
            <Header />
            <div style={{width:'100%' ,direction:'ltr', height:'90vh' , display:'flex' , flexDirection:'column', justifyContent:'center' , alignItems:'center'}}>
                {props.children}
            </div>
        </>
    )
}

export {AdminLayout}