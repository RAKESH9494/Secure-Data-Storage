import React from 'react'
import '../App.css'
import c from "./cancel.png"
function Popup(props){
    const submitHandler = async(e)=>{
        e.preventDefault();
        const recipient = document.querySelector("#add").value;
        try{
            const trasaction = await props.contract.GiveAccessFiles(props.owner,recipient,props.link,props.name);
            await trasaction.wait();
            props.setTrigger(false)
            alert("Shared Successfull");
        }catch(e){
            console.log(e);
            alert(e)
        }
        
    }
  return(props.trigger) ? (
    <div class="box">
        <center>
        <div class="box-inner">
        <button onClick={()=>props.setTrigger(false)}><img src={c} height={"25px"} width={"25px"}/></button><br/>
        <h2>Give Access</h2>
        <p>{props.name}</p>
        <form onSubmit={submitHandler}>
            <input type="text" id="add"/><br/><br/>
            <input type="submit" />            
        </form>
        </div>
        </center>
    </div>
  ):"";
}

export default Popup