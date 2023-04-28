const initial ={}
export default function ownerreducer(state = initial,action){
    const {type,payload} =action;
    switch(type){
        case  "SETOWNER":
            return {payload};
        default :
            return state;
    }
}
