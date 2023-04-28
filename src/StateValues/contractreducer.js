const initial ={
}
export default function contractreducer(state = initial,action){
    const {type,payload} =action;
    switch(type){
        case  "SETCONTRACT":
            return {payload};
        default :
            return state;
    }
}
