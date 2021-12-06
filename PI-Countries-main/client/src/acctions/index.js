import axios from 'axios';
 

export function  getCountries(){
    return async function (dispatch){
        var json= await axios.get("http://localhost:3001/countries");

        return dispatch(
            {
                type: 'GET_COUNTRY',
                payload: json.data
            }
        )
    }
}

export function filterContriesByContinent(payload){
    console.log(payload)
    return{
        type :'FILTER_BY_CONTINENT',
        payload
    }
}
export function getActivities(){
    return async function(dispatch){
        try{
            var info = await axios.get ("http://localhost:3001/activities");
            return dispatch ({
                type: "GET_ACTIVITIES",
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
}
export function filterByActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITIES',
        payload
    }
}

export function filterByPopulation(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_POPULATION',
        payload
    }
}
export function orderByName(payload){
    console.log(payload)
    return{
        type: 'ODER_BY_NAME',
        payload
    }
}
export function postActividad(payload) {
    return async function (dispatch) {
        axios.post("http://localhost:3001/activities", payload);
        return dispatch({
            type : 'POST_ACTIVIDAD',
           
        })
        // console.log(json)
        // return json;
}};

export function searchByName(name){
    return async function(dispatch){

        try{
            var json = await axios.get("http://localhost:3001/countries?name="+name);
            console.log("entre!")
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload : json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
export function getDetail(id) {
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/countries/"+id)
            return  dispatch({
                type: 'GET_DETAIL',
                payload : json.data
            });
        }catch(e){
        console.log(e);
}}};