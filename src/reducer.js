const initialState = {
    regions: [],
    error:null
}

const fetchData = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_REGIONS":
            return {
                ...state,
                regions: action.payload
            }
            case "ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
export default fetchData;