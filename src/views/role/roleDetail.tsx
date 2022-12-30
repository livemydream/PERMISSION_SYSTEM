import React, { useEffect, useState } from 'react';
import { Button, Descriptions, message, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface UserInfo {
  RoleId: string;
  roleName: string;
  permissions: any[];
  remark: string;
}

const App: React.FC = () => {
  const navTo = useNavigate()




  const roleId = useLocation().state.roleId
  console.log("路由" + roleId)
  const [userinfo, setUserInfo] = useState<UserInfo>({ RoleId: "", roleName: "", remark: "", permissions: [] })


  const PermissionTagHandle = () => {
    console.log(userinfo.permissions)
    return (
      <>
        {userinfo.permissions.map((permission) => {

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

  const deleteHandle = () => {


    if (confirm("确认要删除此角色的所有信息么！")) {
      axios.get("/api/role/removeRoleByRoleId/" + roleId).then(resp => {
        message.info("删除成功！")
        navTo("/home/role/roleList")
      })


    }

  }

  useEffect(() => {
    axios.get("/api/role/queryRoleInfoByUserId/" + roleId).then(
      resp => {
        console.log(resp.data);
        setUserInfo(resp.data)



      }
    )

  }, [])


  return (
    <Descriptions title="用户信息" bordered={true} column={1} >

      <Descriptions.Item label="角色名称">{userinfo.roleName}</Descriptions.Item>
      <Descriptions.Item label="角色ID">{roleId}</Descriptions.Item>
      <Descriptions.Item label="权限"><PermissionTagHandle /></Descriptions.Item>
      <Descriptions.Item label="备注">{userinfo.remark}</Descriptions.Item>
      <Descriptions.Item label="删除角色信息"> <Button style={{ backgroundColor: "pink" }} onClick={deleteHandle} >删除</Button>
      </Descriptions.Item>


    </Descriptions>
  )
}

export default App;