import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const navigateTo = useNavigate()

  // const [isLoading, setLoading] = useState(true);

  const [username, setUsername] = useState("")
  const [operationRouter, setOperationRouter] = useState("")
  // const [password,setpassword]=useState("")
  const [remark, setRemark] = useState("")

  const { TextArea } = Input;
  const remarkhandle = (e: any) => {
    console.log(e.target.value)
    setRemark(e.target.value)
  }
  const usernameHandle = (e: any) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }
  const routerHandle = (e: any) => {
    console.log(e.target.value)
    setOperationRouter(e.target.value)
  }
  const addHandle = () => {
    console.log(username, remark,)
    let formdata = new FormData()
    formdata.append("permissionName", username)
    formdata.append("operationRouter", operationRouter)
    formdata.append("remark", remark)

    formdata.forEach(element => {
      if (element === "") {
        message.warning("请填写相关字段！")
        throw new Error()
      }
    })




    axios({
      url: "/api/permission/permissionAdd",
      data: formdata,
      method: "post"
    }).then(
      resp => {
        console.log(resp.data)
        console.log(resp)
        if (resp.data.code === '1') {
          message.info(resp.data.tip);
          navigateTo("/home/permission/permissionList")
        } else {
          message.info(resp.data.tip)
        }

      }
    )
  }

  // useEffect(()=>{
  //   axios.get("/api/user/queryAllPermissionsAndRole").then(resp=>{
  //     let roleArray:{value:string,lable:string}[]=[]


  //     resp.data.roles.forEach((element: any)=> {
  //       let   item={
  //           lable:element.roleId,
  //           value:element.roleName
  //       }

  //       roleArray.push(item)
  //       console.log("ddhsadhsa",roleArray)

  //       });
  //      setRoleSelect(roleArray)
  //      setLoading(false) 

  //   })
  // },[])




  return (
    <>
      <Form
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
      >
        <Form.Item label="权限名称" name="permissionName" rules={[{ required: true }]}>
          <Input onChange={usernameHandle} />
        </Form.Item>

        <Form.Item label="路由" name="optionRouter" rules={[{ required: true }]}>
          <Input onChange={routerHandle} />
        </Form.Item>




        <Form.Item label="备注" name="remark" rules={[{ required: false }]}>
          <TextArea rows={4} placeholder="最多可以写255个字！" maxLength={255} onChange={remarkhandle} />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit" onClick={addHandle}>
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  )

}


export default App;