import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const navigateTo = useNavigate()
  const permission = useLocation().state


  const [username, setUsername] = useState(permission.permissionName)
  const [operationRouter, setOperationRouterHandle] = useState(permission.permissionName)
  const [remark, setRemark] = useState(permission.remark)


  const { TextArea } = Input;
  const remarkhandle = (e: any) => {
    console.log(e.target.value)
    setRemark(e.target.value)
  }
  const usernameHandle = (e: any) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }

  const operationRouterHandle = (e: any) => {
    setOperationRouterHandle(e.target.value)
  }

  const addHandle = () => {
    console.log(username, remark,)
    let formdata = new FormData()

    formdata.append("permissionName", username)
    formdata.append("permissionId", permission.permissionId)
    formdata.append("operationRouter", operationRouter)
    formdata.append("remark", remark)

    formdata.forEach(element => {
      if (element === "") {
        message.warning("请填写相关字段！")
        throw new Error()
      }
    })




    axios({
      url: "/api/permission/PermissionUpdateByPermissionId",
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
        <Form.Item label="权限名称" name="permissionName" rules={[{ required: true }]} initialValue={permission.permissionName}>
          <Input onChange={usernameHandle} />
        </Form.Item>

        <Form.Item label="权限对应的操作路由" name="operationRouter" rules={[{ required: true }]} initialValue={permission.operationRouter}>
          <Input onChange={operationRouterHandle} />
        </Form.Item>




        <Form.Item label="备注" name="remark" rules={[{ required: false }]} initialValue={permission.remark} >
          <TextArea rows={4} placeholder="最多可以写255个字！" maxLength={255} onChange={remarkhandle} />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit" onClick={addHandle}>
            更新
          </Button>
        </Form.Item>
      </Form>
    </>
  )

}


export default App;