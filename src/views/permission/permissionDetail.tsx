import React, { useEffect, useState } from 'react';
import { Button, Descriptions, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface UserInfo {
  permissionId: string;
  permissionName: string;
  operationRouter: string;
  remark: string;

}

const App: React.FC = () => {


  const perissionId = useLocation().state.permissionId
  console.log("路由" + perissionId)
  const navTo = useNavigate()

  const [perission, setPermission] = useState<UserInfo>({ permissionId: "", permissionName: "", operationRouter: "", remark: "" })

  const deleteHandle = () => {

    if (confirm("确认要删除此用户的所有信息么！")) {
      axios.get("/api/permission/removePermissionByPermissionId/" + perissionId).then(resp => {
        message.info("删除成功！")
        navTo("/home/permission/permissionList")
      })

    }

  }

  useEffect(() => {
    axios.get("/api/permission/queryPermissionByPermissionId/" + perissionId).then(
      resp => {
        console.log("dsdad---dsadasjkd----dsada", resp.data);
        setPermission(resp.data)

      }
    )

  }, [])


  return (
    <Descriptions title="权限信息" bordered={true} column={1}>
      <Descriptions.Item label="权限名称">{perission.permissionName}</Descriptions.Item>
      <Descriptions.Item label="权限ID">{perissionId}</Descriptions.Item>
      <Descriptions.Item label="权限对应的路由">{perission.operationRouter}</Descriptions.Item>
      <Descriptions.Item label="备注">{perission.remark}</Descriptions.Item>
      <Descriptions.Item label="删除权限"><Button style={{ backgroundColor: "pink" }} onClick={deleteHandle} >删除</Button>
      </Descriptions.Item>


    </Descriptions>
  )
}

export default App;