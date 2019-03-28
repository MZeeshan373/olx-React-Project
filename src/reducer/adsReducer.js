let adsReducer = (state = [],action)=>{
    // console.log(action.payload)
        switch (action.type) {
            case "insertads":
                return [...action.payload]
            default:
                return state;
        }
    
    
}
export default adsReducer;