import React, { useEffect, useState } from 'react';
import { Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Button } from 'antd/es/radio';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;



interface DataType {
  key: string;
  permissionName: string;
  permissionId: number;
  operationRouter: string;
  remark: string;

}

const App: React.FC = () => {
  const navTo = useNavigate()
  const [date, setData] = useState<DataType[]>([])
  const [dateo, setDatao] = useState<DataType[]>([])

  const [isLoading, setLoading] = useState(true);


  //查询 事件 以及查询函数

  const onSearch = (value: string) => {
    let s = dateo.filter(
      ele => {
        return ele.permissionName.includes(value) || ele.remark.includes(value) || ele.operationRouter.includes(value)
      }
    )

    // console.log(s)
    setData(s)

  }


  // 详情按钮的事件
  const detailHandle = (e: any) => {
    console.log(e)
    navTo("/home/permission/permissionDetail", { state: { permissionId: e.target.id } })
    console.log(e.target.id)
  }


  const updateHandle = (e: any) => {
    axios.get("/api/permission/queryPermissionByPermissionId/" + e.target.id).then(
      resp => {

        navTo("/home/permission/permissionUpdate", { state: resp.data })

      }
    )
  }




  const columns: ColumnsType<DataType> = [
    {
      title: '权限ID',
      dataIndex: 'permissionId',
      key: 'permissionId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '权限名称',
      dataIndex: 'permissionName',
      key: 'permissionName  ',
    },
    {
      title: '权限对应得路由',
      dataIndex: 'operationRouter',
      key: 'operationRouter',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
    axios.get("/api/permission/queryAllPermissionByCondition").then(resp => {
      console.log("------------------------dsajdga------------------")
      console.log(resp.data)
      resp.data.forEach((permission: any) => {
        let user_0 = {
          key: permission.permissionId,
          permissionId: permission.permissionId,
          permissionName: permission.permissionName,
          operationRouter: permission.operationRouter,
          remark: permission.remark,
        }

        console.log(permission)
        console.log(user_0)
        userInfos.push(user_0)
        console.log("useroinfos")
        // debugger
        // console.log(userInfos)

        setData(userInfos)
        setDatao(userInfos)

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