import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import gb from './github.png'
import ld from './linkedin.png'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import "../App.css"
import { connect } from 'react-redux'
const Home = ({contract,account,status}) =>{
  let navigate = useNavigate();
    const [filename,setFilename]=useState();
    const [filelink,setFileLink] = useState();
    const [userName,serUsername] = useState();
    const [file,setFile] = useState(false);
    const [uploadstatus,setUploadS] = useState(true)
    useEffect(()=>{
        const handler1 = async(e)=>{
          const mem = await contract.getData();
          mem.map((memo)=>{
            if(memo.owner == account){
              serUsername(memo.Fname +" "+memo.LName);
            }
          })
        }
        const handler = async(e) =>{
          try{
            const formData = new FormData();
            formData.append("file",file);
            const redFile = await axios({
              method:"post",
              url:'https://api.pinata.cloud/pinning/pinFileToIPFS',
              data:formData,
              headers:{
                pinata_api_key :'bb34ce1e3ef6ee4e9723',
                pinata_secret_api_key:'53217f0e61442401ca639e1bcfb00a6a288e60e16ebe98024b3291170dee8b28',
                "Content-Type":"multipart/form-data",
              }
            });
            const ImgHash =`https://ipfs.io/ipfs/${redFile.data.IpfsHash}`;
            setFileLink(ImgHash);
            setUploadS(false);
          }catch(e){
            alert("Unable to upload try again");
            document.querySelector("#fl").value="";
            console.log(e)
          }
        }
        file && handler();
        setUploadS(true);
        contract && handler1();
        console.log(status)
    },[file,contract])
    const onchangeHadler = async(e) =>{
        setFilename(e.target.files[0].name)
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
          setFile(e.target.files[0]);
        };
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        try{
          const amount ={value : ethers.utils.parseEther("1")}
          const transaction = await contract.UploadFiles(filename,filelink,account,amount);
          transaction.wait()
          alert("File Uploaded");
          setFileLink("");
          document.querySelector("#fl").value="";
        }
        catch(e){
            alert("Unable to Upload Try Again")
            console.log(e)
        }
      }
  return ( 
    <div class="body">
        <div class="header">
            <ul type="none">
                <li><a href="#" onClick={()=>navigate("/")}>LOG OUT</a></li>
                <li><a href='/Home/Mydata' >MY FILES</a></li>
            </ul>          
        </div>
        <div class="Mid">
            <h2>Welcome to Secure Data Storage</h2>
            <p>ADDRESS : {account}</p>
            <p>{userName}</p>
            <h4>Upload Here</h4>
            <form onSubmit={submitHandler}>
                <input type="file" onChange={onchangeHadler} id="fl"/><br/>
                <input type="submit" value={"Upload"} id="uploadbtn" disabled={uploadstatus}/>
            </form>
        </div>
        <div class="footer">
            <ul type="none">
                <li><a href="https://github.com/RAKESH9494/"><img src={gb} height={"30px"} width={"30px"} style={{"border-radius":"20px"}}/></a></li>
                <li><a href='https://www.linkedin.com/in/rakesh-ummadi-004994242/'><img src={ld} height={"30px"}  width={"30px"}/></a></li>
            </ul>   
        </div>
    </div>)

}
const mapStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload,
})
export default connect(mapStateToProps)(Home)