import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import share from './share.png'
import { useNavigate } from 'react-router-dom';
import c from './collaboration.png'
import d from './delete.png'
import "../App.css"
import Popup from './Popup';
const Mydata = ({contract,account}) =>{
  let navigate = useNavigate();
  const pattern = /\.(jpg|png)$/i;
  const [fname,setName] = useState();
  const [file,setFile] = useState();
  const [Access,setAccess] = useState([]);
    const [data,setData] = useState([]);
    const [sharedFiles,setSharedFiles] = useState([]);
    const [pop,setPop] = useState(false);
 useEffect(()=>{
    const getData = async(e)=>{
        const d = await contract.FilesData(account);
        const n = await contract.NotificationData(account);
        setSharedFiles(n);
        console.log(d)
        setData(d);
    }
    contract && getData();
 },[contract])
 const onClickHandler=async(e,l)=>{
  e.preventDefault()
  alert("Do you want to delete");
  try{
    const transaction = await contract.deleteFile(l,account);
    await transaction.wait();
    alert("Deleted Please refresh")
  }catch(e){
    alert("Try Again")
    console.log(e);
  }
 }
 const onClickHandler1=async(e,recipient,l)=>{
  e.preventDefault()
  alert("Do you want to delete");
  try{
    const transaction = await contract.RemoveAccessForFiles(account,recipient,l);
    await transaction.wait();
    alert("Deleted Please refresh")
  }catch(e){
    alert("Try Again")
    console.log(e);
  }
 }
  return ( 
    <div class="body1">
      <div class="container1">
        <center><h3>Files</h3></center>
      <h4>NOTE :</h4>
      <span>1.Preview available only for photos and videos.</span><br/>
      <span>2.Currently only png & jpg photo formates are accepted.</span><br/>
      <br/>
      {data.length == 0 ? <p>No personal files uploaded yet</p>:
        data.map((memo)=>
        <div class="filediv">
          {pattern.test(memo.name) ?
          <span onClick={()=>{setFile(memo.link);setAccess(memo.access)}}>{memo.name}</span>:
          <span><a onClick={()=>{setFile(memo.link)}}>{memo.name}</a></span>}
          <button onClick={(e)=>{onClickHandler(e,memo.link)}}><img src={d} height={"30px"} width={"30px"}/></button>
          <button onClick={()=>{setPop(true);setName(memo.name);setFile(memo.link)}}><img src={share} height={"25px"} width={"25px"}/></button>
          <br/>
        </div>
        )}
        {sharedFiles.map((memo)=>
          <div class="filediv">
              <span onClick={()=>{setFile(memo.link)}}>{memo.name}</span>
              <button title={"shared by  "+memo.Message} disabled><img src={c} height={"20px"} width={"20px"}/></button>
          </div>
          )
        }
        <Popup trigger={pop} setTrigger={setPop} name={fname} link={file} owner={account} contract={contract} >
            
          </Popup>
      </div>
      {file && <div class="container2">
        <center>
        <h4>Preview</h4>
        <img src={file} height={"300px"} width={"300px"} alt="None"/><br/><br/>
        {
          Access.length == 0 ? <h6>Private to you</h6>:
          <div>
          <h6>In Access</h6>
          {Access.map((data,index)=><div><p key={index}>{data}<button onClick={(e)=>{onClickHandler1(e,data,file)}}><img src={d} height={"20px"} width={"20px"}/></button></p></div>)}
          </div>
        } 
        </center>
      </div>}
    </div>
  )
}
const mapStateToProps = state =>({
    account : state.ownerreducer.payload,
    contract : state.contractreducer.payload,
})
export default connect(mapStateToProps)(Mydata)
