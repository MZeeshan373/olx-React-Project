// import {connect} from 'react-redux';
let userreducer = (state = [],action) =>{
//        console.log(typeof(action.payload))
switch(action.type){
case "Add_user":
        return [...action.payload];
        // case "After_delete":
        //         return this.props.data.filter((item) => { return item !== action.payload })
       
default:
return state;
}
}
// var fun =(store)=>{
//         return{
//                 data:store.userreducer
//         }
// }
export default  (userreducer);