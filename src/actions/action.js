let addUser = (data) => {
    return ({ type: "addUser", payload: data })
}
let insertads = (data)=>{
return ({type:"insertads",payload:data})
}

let newSearch = (data)=>{
return ({type:"newSearch",payload:data})
}

export { insertads, newSearch, addUser} ;