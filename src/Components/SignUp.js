import React, { useEffect } from 'react'
import "../App.css"
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
const SignUp = ({account,contract}) =>{
    const navigate = useNavigate();
    useEffect(()=>{
        document.querySelector("#Address").value = account;
    },[account])
    const submitHandler = async(e) =>{
        e.preventDefault();
        const Fname = document.querySelector("#Fname").value;
        const Lname = document.querySelector("#Lname").value;
        const Gmail = document.querySelector("#Gmail").value;
        const password = document.querySelector("#password").value;
        try{
            const amount = {value : ethers.utils.parseEther("1")} 
            const transaction = await contract.Signup(Fname,Lname,password,Gmail,account,amount)
            await transaction.wait();
            alert("Submited")
            navigate("/")
        }catch(e){
            alert(e);
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
        <button onClick={handler1}>CHANGE</button>
            <div class="signUpbox">
              <h2>SIGN UP</h2>
              <form class="form-group" onSubmit={submitHandler}>
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
                <input type="submit" value={"SUBMIT"} class="btn btn-secondary"/>
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