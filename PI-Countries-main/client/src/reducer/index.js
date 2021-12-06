
const initialState={
    countries:[],
    allCountries:[],
    allActivities:[],
    detail:[]

}
function rootReducer (state=initialState,action){
    switch(action.type){
        case 'GET_COUNTRY':
            return{
                ...state,
                countries:action.payload,
                allCountries: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            const allContry = state.allCountries
            const continentFilter=action.payload === 'all'? allContry: allContry.filter(el => el.continente === action.payload)
            return{
                ...state,
                countries: continentFilter
            }
        
        case 'FILTER_BY_ACTIVITIES':
            const countriesAll = state.allCountries
            const activityCountries = countriesAll?.map(country => {
                return {...country, activities: country.activity.map(act => act.name)}
            })
            const activityFiltered = action.payload === 'all' ? countriesAll : activityCountries.filter(el => {
                return el.activity.includes(action.payload)
            })
            return {
                    ...state,
                    countries: activityFiltered
            }
        
        case 'GET_ACTIVITIES':
            return {
                ...state,
                allActivities: action.payload
            }

        case 'FILTER_BY_POPULATION':
            let sortedPopulation = action.payload === "mayor" ? 
            state.countries.sort(function(a, b){
                
                return b.population - a.population})  :
                state.countries.sort(function(a, b){
                
                return a.population - b.population})

                return {
                    ...state,
                    countries: sortedPopulation
                }

        case 'ODER_BY_NAME':
            let sortedName = action.payload === "asc" ? 
            state.countries.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: sortedName
                }
         case 'POST_ACTIVIDAD':
                    return {
                      ...state
                    };
        case 'SEARCH_BY_NAME':
                return{
                    ...state,
                    countries: action.payload
                }
         case 'GET_DETAIL':
             return{
                 ...state,
                 detail: action.payload

             }
        default:
            return state;

    }
}

export default rootReducer;