import React, { useEffect, useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
const Login = ({account,contract}) => {
  const[userData,setUserData] = useState([])
  let navigate = useNavigate();
  const [auth,setAuth] = useState(false);
  useEffect(()=>{
      if(auth){
        alert("Login Successfull")
        return navigate('/Home')
      }	
      const getData =async(e)=>{
        const Data = await contract.getData();
        setUserData(Data);
      } 
      contract && getData()
  },[auth,contract])
  const loginhandler = e =>{
    e.preventDefault();	
    let u=0;
    let l=0;
    const pw = document.querySelector("#pw").value;
    {userData.length == 0 ? alert("No Data") : userData.map((memo)=>{
      if(memo.owner === account){
        u=0;
        if(memo.password === pw){
          setAuth(true)
          l=0;
        }
        else{
          l=1;
        }
      }
      else{
        u=1;
      }

    })}
    if(u==1){
      alert("User Not found")
    }
    if(l==1){
      alert("Incorrect Password")
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
    <div class="lgbody">
        <center>
        <p>Connected : {account}</p>
        <button onClick={handler1}>CHANGE</button>
        <div class="lgbox">
            <h2>LOGIN</h2>
            <form class="form-group" onSubmit={loginhandler}>
                <label>ADDRESS</label><br/>
                <input type="text" class="form-control" id="address" value={account}/><br/>
                <label>PASSWORD</label><br/>
                <input type="password" class="form-control" id="pw"/><br/>
                <input type="Submit" class="btn btn-secondary" value={"Login"}/>
            </form>
            <p>Dont have Account?? <a href="/Signup">click here</a></p>
        </div>
        </center>
    </div>
  )
}

const mapStateToProps = state =>({
  account : state.ownerreducer.payload,
  contract : state.contractreducer.payload
})
export default connect(mapStateToProps)(Login);
