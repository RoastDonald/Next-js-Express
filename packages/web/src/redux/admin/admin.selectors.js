import {createSelector} from 'reselect';



const adminDomain = state => state.admin;

export const selectUsers = createSelector(
    [adminDomain],
    (admin)=>{
        return admin.users}
);


