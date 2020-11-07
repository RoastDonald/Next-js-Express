import adminActionTypes from './admin.types';

const INITIAL_STATE = {
    users:[],
    error:null,
};

export default (prevState = INITIAL_STATE,action)=>{
    switch(action.type){
        
        case adminActionTypes.USERS_GET_SUCCESS:
            return {
                ...prevState,
                users:action.payload
            }
        
        case adminActionTypes.USERS_GET_FAILURE:
            return {
                ...prevState,
                error:action.payload
            }
        
        default:
            return prevState;
        
    }
}