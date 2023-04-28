export const setOwner=(owner)=> async dispatch =>{
    dispatch({
        type:"SETOWNER",
        payload:owner
    })
}
export const setContract=(contract)=>async dispatch=>{
    dispatch({
        type:"SETCONTRACT",
        payload : contract
    })
}