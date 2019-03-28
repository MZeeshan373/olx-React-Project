let userReducer = (state = null,action)=>{
    // console.log(action.type)
    // console.log(action.payload)
switch(action.type){
    case "addUser":
        return action.payload;
    
    default:
        // console.log(action.type);

    return state;
}
}
export default userReducer;