import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Button } from 'antd/es/radio';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface DataType {
  key: number;
  username: string;
  user_id: number;
  remark: string;
  permissions: any[];
  roles: any[];
}






const App: React.FC = () => {
  const navTo = useNavigate()
  const [date, setData] = useState<DataType[]>([])
  const [dateo, setDataFilter] = useState<DataType[]>([])

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

  const rolefilter = (array: any[], value: string) => {

    for (let i = 0; i < array.length; i++) {
      if (array[i].roleName.includes(value)) {
        return true;
      }
    }

    return false
  }

  const onSearch = (value: string) => {
    let s = dateo.filter(
      ele => {
        return ele.username.includes(value) || ele.remark.includes(value) || perfilter(ele.permissions, value) || rolefilter(ele.roles, value)
      }
    )

    // console.log(s)
    setData(s)
  }

  // 详情按钮的事件
  const detailHandle = (e: any) => {
    // console.log(e)
    navTo("/home/user/userDetail", { state: { userId: e.target.id } })
    // console.log(e.target.id)
  }


  const updateHandle = (e: any) => {
    axios.get("/api/user/queryUserInfoByUserId/" + e.target.id).then(
      resp => {
        let userinfo = resp.data;
        let roles: string[] = []
        let roleIds: string[] = []
        userinfo.roles.forEach((role: { roleName: string; roleId: string }) => {
          roles.push(role.roleName)

          roleIds.push(role.roleId)
        })
        let user = {
          userId: userinfo.userId,
          username: userinfo.username,
          password: userinfo.password,
          remark: userinfo.remark,
          roles: roles,
          rolesIds: roleIds
        }

        navTo("/home/user/userUpdate/", { state: user })

      }
    )
  }




  const columns: ColumnsType<DataType> = [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = 'yellow';
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
      ),
    },
    {
      title: '权限',
      key: 'permission',
      dataIndex: 'permissions',
      render: (_, { permissions }) => (
        <>
          {permissions.map((permission) => {
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
    let userInfos: DataType[] = []
    axios.get("/api/user/queryAllUserInfo").then(resp => {
      // console.log("------------------------dsajdga------------------")
      // console.log(resp.data)
      resp.data.forEach((user: any) => {
        let user_0 = {
          key: user.userId,
          user_id: user.userId,
          username: user.username,
          remark: user.remark,
          roles: user.roles,
          permissions: user.permissions,
        }

        // console.log(user)
        // console.log(user_0)
        userInfos.push(user_0)
        // console.log("useroinfos")
        // debugger
        // console.log(userInfos)

        setData(userInfos)
        setDataFilter(userInfos)

      });

    })
    // console.log("ddadsadadsad---------------")

    //     // debugger
    //     console.log("dsadadsaddasdadad-----dadadas")
    // console.log(date)
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