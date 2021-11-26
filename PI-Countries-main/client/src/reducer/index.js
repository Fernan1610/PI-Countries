
const initialState={
    countries:[]

}
function rootReducer (state=initialState,action){
    switch(action.type){
        case 'GET_COUNTRY':
            return{
                ...state,
                countries:action.payload
            }
    }
}

export default rootReducer;