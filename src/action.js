import axios from 'axios'
export const fetchregions =()=> async (dispatch)=>{
    await axios.get('https://restcountries.com/v3/all')
    .then(alldata=>
        dispatch({
            type:"FETCH_REGIONS", 
            payload:alldata.data
        })
        )
        .catch(err=>{
            let messageforerr=err.message;
            if(err.response){
                messageforerr=`${err.response.data.message} with status ${err.response.status} \nPlease ensure that the url is correct and try again`
               return dispatch({
                    type:"ERROR",
                    payload:messageforerr
                })
            }
            messageforerr=`${err.message} \nPlease check Your network and try again`
            return dispatch({
                type:"ERROR",
                payload:messageforerr
            })
        })


}