let searchReducer = (state = {
    title:"",
    location:"",
    catagory:"",
    brand:"",
    pricefrom:"",
    priceto:""
 } ,action)=>{
switch(action.type){
    case "newSearch":
        return action.payload;
    
    default:
        // console.log(action.type);

    return state;
}
}
export default searchReducer;