import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Button } from 'antd/es/radio';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface DataType {
  key: String;
  role_name: string;
  role_id: number;
  remark: string;
  permissions: any[];
}






const App: React.FC = () => {
  const navTo = useNavigate()
  const [date, setData] = useState<DataType[]>([])
  const [dateo, setDatao] = useState<DataType[]>([])
  const [isLoading, setLoading] = useState(true);


  //查询 事件 以及查询函数

  const perfilter = (array: any[], value: string) => {

    for (let i = 0; i < array.length; i++) {
      if (array[i].permissionName.includes(value)) {
        return true;
      }
    }

    return false
  }



  const onSearch = (value: string) => {
    let s = dateo.filter(
      ele => {
        return ele.role_name.includes(value) || ele.remark.includes(value) || perfilter(ele.permissions, value)
      }
    )

    // console.log(s)
    setData(s)
  }

  // 详情按钮的事件
  const detailHandle = (e: any) => {
    console.log(e)
    navTo("/home/role/roleDetail", { state: { roleId: e.target.id } })
    console.log(e.target.id)
  }


  const updateHandle = (e: any) => {
    axios.get("/api/role/queryRoleInfoByUserId/" + e.target.id).then(
      resp => {
        // debugger 
        let roleInfo = resp.data;
        let permissions: string[] = []
        let permissionIds: string[] = []
        roleInfo.permissions.forEach((permission: { permissionName: string; permissionId: string }) => {
          permissions.push(permission.permissionName)

          permissionIds.push(permission.permissionId)
        })
        let rolein = {
          role_id: roleInfo.roleId,
          role_name: roleInfo.roleName,
          remark: roleInfo.remark,
          permissions: permissions,
          permissionIds: permissionIds,
        }

        navTo("/home/role/roleUpdate", { state: rolein })

      }
    )
  }




  const columns: ColumnsType<DataType> = [
    {
      title: '角色ID',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },

    {
      title: '权限',
      key: 'permission',
      dataIndex: 'permissions',
      render: (_, { permissions }) => (
        <>
          {permissions && permissions.map((permission) => {
            let color = 'green';
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
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        // /home/user/userUpdate/
        <Space size="middle">
          <Button style={{ backgroundColor: "yellowgreen" }} id={record.key + ""} onClick={detailHandle}>详情</Button>
          <Button style={{ backgroundColor: "yellow" }} id={record.key + ""} onClick={updateHandle}>修改</Button>
        </Space>
      ),
    },
  ];



  const queryAllUserInfo = () => {
    let roleInfo: DataType[] = []
    axios.get("/api/role/queryAllRoleInfo").then(resp => {
      console.log("------------------------dsajdga------------------")
      console.log(resp.data)
      resp.data.forEach((role: any) => {
        let role_0 = {
          key: role.roleId,
          role_id: role.roleId,
          role_name: role.roleName,
          remark: role.remark,
          permissions: role.permissions,
        }

        console.log(role_0)
        roleInfo.push(role_0)
        // console.log("roleInfo")
        // debugger
        // console.log(userInfos)

        setData(roleInfo)
        setDatao(roleInfo)

      });

    })
    // console.log("ddadsadadsad---------------")

    //     // debugger
    //     console.log("dsadadsaddasdadad-----dadadas")
    console.log(date)
    setLoading(false)

  }

  useEffect(() => {
    queryAllUserInfo()
  }, [])
  if (!isLoading) {
    return (
      <>
        <Search placeholder="请输入关键字：" allowClear onSearch={onSearch} style={{ width: 300 }} />

        <Table columns={columns} dataSource={date} />
      </>
    )
  } else {
    return (
      <>
        <Search placeholder="请输入关键字：" allowClear onSearch={onSearch} style={{ width: 300 }} />

        <Table columns={columns} dataSource={date} />
      </>
    )
  }




}

export default App;