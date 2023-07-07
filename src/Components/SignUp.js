import React, { useEffect, useState } from 'react'
import "../App.css"
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
const SignUp = ({account,contract}) =>{
    const navigate = useNavigate();
    const [status,setStatus] = useState();
    useEffect(()=>{
        document.querySelector("#Address").value = account;
    },[account])
    const submitHandler = async(e) =>{
        e.preventDefault();
        setStatus("Please wait...")
        const Fname = document.querySelector("#Fname").value;
        const Lname = document.querySelector("#Lname").value;
        const Gmail = document.querySelector("#Gmail").value;
        const password = document.querySelector("#password").value;
        try{
            const amount = {value : ethers.utils.parseEther("0.00001")} 
            const transaction = await contract.Signup(Fname,Lname,password,Gmail,account,amount)
            await transaction.wait();
            setStatus("")
            alert("Submited")
            navigate("/")
        }catch(e){
            alert(e.reason);
            setStatus("")
        }
    }
    const handler1  = async(e) =>{
        const {ethereum} = window
        const permissions = await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }]
        });
        window.location.reload(); 
        permissions();
      }
return (
    <div>
        <center>
        <p>Connected : {account}</p>
        <button onClick={handler1} class="btn btn-primary">CHANGE</button>
            <div class="signUpbox">
              <h2>SIGN UP</h2>
              <form class="form-group">
                <label>FIRST NAME</label>
                <input type="text" class="form-control" id="Fname"/>
                <label>LAST NAME</label>
                <input type="text" class="form-control" id="Lname"/>
                <label>ADDRESS</label>
                <input type="text" class="form-control" id="Address"/>
                <label>GMAIL</label>
                <input type="text" class="form-control" id="Gmail"/>
                <label>PASSWORD</label>
                <input type="text" class="form-control" id="password"/><br/>
                <input type="submit" onClick={submitHandler}value={"SUBMIT"} class="btn btn-secondary"/>&nbsp;
                <button class="btn btn-secondary" onClick={()=>navigate("/")}>CLOSE</button>&nbsp;<span>{status}</span>
               </form>
           </div>
        </center>
    </div>
)}
const mapStateToProps = state =>({
    contract : state.contractreducer.payload,
    account : state.ownerreducer.payload
})
 export default connect(mapStateToProps)(SignUp)
