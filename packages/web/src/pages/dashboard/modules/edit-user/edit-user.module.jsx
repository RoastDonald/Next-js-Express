import React from 'react'
import { FMButton } from '@/components/formik-mui';


const EditUser = (props) => (
    <div className="user_nfo_panel">
        <h1>User information</h1>
        <div>
            {/* <span>{currentUser.name}</span> */}
            {/* <span>{currentUser.surname}</span> */}
            {/* <span>{currentUser.email}</span> */}
        </div>
        <FMButton link="/user/profile">Edit account info</FMButton>
    </div>
    // <div className="user_nfo_panel">
    //   <h1>User history purchases</h1>
    //   <div className="user_product_block_wrapper">history</div>
    // </div>
);

export default EditUser;