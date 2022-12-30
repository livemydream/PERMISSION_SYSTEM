import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Input,message,notification,Select, Space } from 'antd';
import { CloseCircleOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




  const imagChange=(e:any)=>{
    console.log(e.target.src)
    e.target.src="http://localhost:8000/api/user/login/randomImageCode?random="+Math.random()
  
  }

  
 



const App: React.FC = function(){





const navTo=useNavigate()
  const [code,setImgCode]=useState("");
 
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const usernameChange=(e:ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value)
    setUsername(e.target.value)
}
const passwordChange=(e:ChangeEvent<HTMLInputElement>)=>{
  console.log(e.target.value)
  setPassword(e.target.value)
}
  const codeChange=(e:ChangeEvent<HTMLInputElement>)=>{
      console.log(e.target.value)
      setImgCode(e.target.value)
  }

  // 气泡弹窗
    const [api, contextHolder] = notification.useNotification();

  const openNotification = (tip:string,stateCode:string) => {
    console.log(tip)
    let color=stateCode==="1"?"green":"red"
    let icon=stateCode==="1"?<SmileOutlined style={{ color: color }} />:<CloseCircleOutlined style={{ color:color }} />
    console.log()
    api.open({
      message: stateCode!="1"?'登陆失败':'登陆成功',
      description:
        tip,
      icon: icon,
    });
  };
  
const tijiao=()=>{
  let  formData=new FormData();
  formData.append("username",username);
  formData.append("code",code);
  formData.append("password",password);
  console.log("dasd",code,username,password)

  formData.forEach(element=>{
    if(element===""){
        message.warning("请填写相关字段！")
        throw new Error()
    }
})
    
      // debugger
      axios({
          url:"http://localhost:8000/api/user/userLogin",

          // url:"http://192.168.100.17:8080/login",
         
          
          method:"post",
          data:formData
      }).then(resp=>{

        
       
       
      
        if(resp.data.code==="1"){
          // 把用户存到 浏览器存贮 中
           localStorage.setItem("user",JSON.stringify(resp.data.data))
           navTo("/home")

        }else{
          openNotification(resp.data.tip,resp.data.code)
        }
    
        
       
          
      })

}
  return (

   
  
    
<>
{contextHolder}
<Space direction='vertical' size="large" style={{display:"flex"}}>
          
        <Input size="large" placeholder="用户名" prefix={<UserOutlined />} onChange={usernameChange} />

        <Input.Password size="large" placeholder="密码" prefix={<UserOutlined />}  onChange={passwordChange} />
        <div style={{display:"flex"}}>
          <Input size="large" placeholder="验证码" prefix={<UserOutlined />}  onChange={codeChange}  />
          <img src="http://localhost:8000/api/user/login/randomImageCode" alt="点击更换验证码" onClick={imagChange} style={{marginLeft:"10px"}} />
          {/* <img src="http://192.168.100.17:8080/login/verifyCode" alt="点击更换验证码" onClick={imagChange} style={{marginLeft:"10px"}} /> */}
        </div>
        

      <Button type="primary" htmlType="submit" onClick={tijiao} style={{width:"100%"}}>
        登录   
      </Button>
</Space>
        
 </>
);
} 
export default App;