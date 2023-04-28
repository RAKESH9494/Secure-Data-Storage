import React, { useEffect } from 'react'
import abi from "./artifacts/contracts/DataStoringOrg.sol/DataStoringOrg.json"
import { Web3Provider } from "@ethersproject/providers";
import { BrowserRouter,Route  ,Routes } from 'react-router-dom';
import Web3 from 'web3';
import { ethers } from 'ethers';
import Login from './Components/Login'
import SignUp from './Components/SignUp';
import Mydata from './Components/Mydata';
import './index.css';
import Home from './Components/Home';
import { connect } from 'react-redux';
import {setOwner} from './StateValues/actions'
import { setContract } from './StateValues/actions';
const App = ({setOwner,setContract}) =>{;
  useEffect(()=>{
    const connectWallet = async(e)=>{
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contractABI =abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({method : "eth_requestAccounts",});
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setOwner(Web3.utils.toChecksumAddress(account[0].toLowerCase()))
        setContract(contract);
      }else{
        alert("Please install metamask");
      }
    }catch(e){
      console.log(e);
    }}
  connectWallet();
  },[])
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Home/MyData" element={<Mydata/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
const mapStateToProps = state =>{

}
export default connect(mapStateToProps,{setOwner,setContract})(App)