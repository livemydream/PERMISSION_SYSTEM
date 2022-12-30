import React, { useEffect, useState } from 'react';
import { Button, Descriptions, message, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface UserInfo {
  userId: string;
  username: string;
  password: string;
  remark: string;
  roles: any[];
  permission: any[];
}

const App: React.FC = () => {

  const navTo = useNavigate()
  const [roles, setRoles] = useState<any[]>([])
  const [permissions, setPermsissions] = useState<any[]>([])
  const userId = useLocation().state.userId
  console.log("路由" + userId)
  const [userinfo, setUserInfo] = useState<UserInfo>({ username: "", userId: "", remark: "", password: "", roles: [], permission: [] })
  useEffect(() => {
    axios.get("/api/user/queryUserInfoByUserId/" + userId).then(
      resp => {
        console.log(resp.data);
        setUserInfo(resp.data)
        setPermsissions(resp.data.permissions)
        setRoles(resp.data.roles)

      }
    )

  }, [])


  const deleteHandle = (e: any) => {

    let id = e.target.id;
    if (confirm("确认要删除此用户的所有信息么！")) {
      axios.get("/api/user/deleteUserById/" + userId).then(resp => {
        message.info("删除成功！")
        navTo("/home/user/userList")

      })
      console.log(e.target.id)

    }

  }


  const RoleTagHandle = () => {
    console.log(roles)

    return (

      <>
        {roles.map((role) => {
          let color = 'green';
          //   if (tag === 'loser') {
          //     color = 'volcano';
          //   }
          return (
            <Tag color={color} key={role.roleId}>
              {role.roleName}
            </Tag>
          );
        })}
      </>
    )
  }



  const PermissionTagHandle = () => {
    console.log(permissions)
    return (
      <>
        {permissions.map((permission) => {

          let color = 'blue';
          //   if (tag === 'loser') {
          //     color = 'volcano';
          //   }
          return (
            <Tag color={color} key={permission.permissionId}>
              {permission.permissionName}
            </Tag>
          );
        })}
      </>
    )
  }







  return (
    <Descriptions title="用户信息" bordered={true} column={1}>
      <Descriptions.Item label="用户名">{userinfo.username}</Descriptions.Item>
      <Descriptions.Item label="用户ID">{userId}</Descriptions.Item>
      <Descriptions.Item label="用户密码">{userinfo.password}</Descriptions.Item>
      <Descriptions.Item label="备注">{userinfo.remark}</Descriptions.Item>
      <Descriptions.Item label="权限"><PermissionTagHandle /></Descriptions.Item>
      <Descriptions.Item label="角色"><RoleTagHandle /></Descriptions.Item>
      <Descriptions.Item label="删除角色"> <Button style={{ backgroundColor: "pink" }} onClick={deleteHandle} >删除</Button></Descriptions.Item>

    </Descriptions>
  )
}

export default App;