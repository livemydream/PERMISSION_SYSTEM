import { json } from "stream/consumers"

const defauleState={
    num:20
}
let reducer =(state=defauleState,)=>{
    let newSate = JSON.parse(JSON.stringify(state))
}
export default reducer