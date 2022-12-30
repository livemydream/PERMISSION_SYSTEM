import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







const App: React.FC = () => {
  const navigateTo = useNavigate()

  const [isLoading, setLoading] = useState(true);

  const [username, setUsername] = useState("")
  const [password, setpassword] = useState("")
  const [remark, setRemark] = useState("")
  const [roleSelect, setRoleSelect] = useState<{ value: string, lable: string }[]>()
  const [roles, setRoles] = useState<string[]>([])

  const handleChangeSelect = (value: string, option: any) => {
    //  setRoles(value)
    console.log(`selected ${value}`);
    let roles0: string[] = []
    option.forEach((e: any) => {
      console.log(e.lable)
      roles0.push(e.lable)
    })

    setRoles(roles0)
    // option.foreach((element:any)=>{
    console.log(roles)
    //     permissions0.push(element.label)
    // })
  };

  const { TextArea } = Input;
  const remarkhandle = (e: any) => {
    console.log(e.target.value)
    setRemark(e.target.value)
  }
  const usernameHandle = (e: any) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }
  const passwordHandle = (e: any) => {
    console.log(e.target.value)
    setpassword(e.target.value)
  }
  const addHandle = () => {
    console.log(username, password, remark, roles)
    let formdata = new FormData()
    formdata.append("username", username)
    formdata.append("password", password)
    formdata.append("remark", remark)
    roles.forEach(e => {
      formdata.append("roles", e)

    })


    formdata.forEach(element => {
      if (element === "") {
        message.warning("请填写相关字段！")
        throw new Error()
      }
    })


    axios({
      url: "/api/user/userAddUserInfo",
      data: formdata,
      method: "post"
    }).then(
      resp => {
        console.log(resp.data)
        console.log(resp)
        if (resp.data.code === '1') {
          message.info(resp.data.tip);
          navigateTo("/home/userList")
        } else {
          message.info(resp.data.tip)
        }

      }
    )
  }

  useEffect(() => {
    axios.get("/api/user/queryAllPermissionsAndRole").then(resp => {
      let roleArray: { value: string, lable: string }[] = []


      resp.data.roles.forEach((element: any) => {
        let item = {
          lable: element.roleId,
          value: element.roleName
        }

        roleArray.push(item)
        console.log("ddhsadhsa", roleArray)

      });
      setRoleSelect(roleArray)
      setLoading(false)

    })
  }, [])



  if (isLoading) {
    return (
      <>
        <p>login。。。。。。。</p>
      </>
    )
  } else {
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
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input onChange={usernameHandle} />
          </Form.Item>

          <Form.Item label="用户密码" name="password" rules={[{ required: true }]}>
            <Input.Password onChange={passwordHandle} />
          </Form.Item>


          <Form.Item label="角色" name="role" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择"
              onChange={handleChangeSelect}
              options={roleSelect}
            />
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
}


export default App;