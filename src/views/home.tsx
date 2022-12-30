import React, { useEffect, useState } from 'react';

import { Button, message, notification, Popconfirm, Popover } from 'antd';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import MenuSide from '../components/menu_side/menuSide';
import styles from "./index.module.scss"
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer, } = Layout;
// const description = 'Delete the task';





const Home: React.FC = () => {
  const navTo = useNavigate()
  const location = useLocation()
  console.log(location.pathname)
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const [username, setUsername] = useState("")
  const [remark, setRemark] = useState("")



  // 气泡弹窗
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (username: String, remark: String) => {

    let color = "green"
    let icon = <SmileOutlined style={{ color: color }} />

    api.open({
      message: "欢迎" + username,
      description: remark,
      icon: icon,
    });
  };

  useEffect(() => {
    let userString = localStorage.getItem("user")
    console.log('userString', userString)
    if (userString != null) {
      let user = JSON.parse(userString).SESSION_MAP_USER
      setUsername(user.username)
      setRemark(user.remark)
      navTo("/home/userList")
      return () => {
        openNotification(user.username, user.remark)
      }

    } else {
      navTo("/login")
    }
  }, [])
  // const menuClick=(e:{key:string})=>{
  //   console.log(e.key)
  //   navigateTo(e.key)
  // }

  // 确认退出
  const confirm = () => {
    // 清除浏览器用户信息
    localStorage.removeItem("user");
    axios.get("/api/user/userLogout").then(
      resp => {
        message.warning("退出登录！")
      }
    )
    window.location.href = "/login"
    message.info("退出登录");
  };


  // 确认按钮
  const text = <span style={{ fontSize: "20px" }}>{username}</span>;
  const content = (
    <div>
      <p style={{ color: "green" }}>{remark}</p>
      <Popconfirm
        placement="bottomRight"
        title="确认要退出么，将清除你的账号信息"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button type='primary' style={{ width: "100%", marginTop: "20px" }}>退出登录</Button>
      </Popconfirm>
    </div>
  );
  return (

    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <MenuSide />
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, backgroundColor: "rgba(198, 199, 198, 0.507)" }} >
          <Breadcrumb style={{ marginLeft: '16px', marginTop: '20px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Popover placement="bottomRight" title={text} content={content} trigger="click">
            <Button className={styles.img}>{username}</Button>
          </Popover>
        </Header>

        <Content style={{ marginTop: '20px' }}>

          <div style={{ padding: 24, minHeight: 360, background: "rgba(0,0,0,0.1)", margin: '15px', marginTop: '-5px' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: "rgba(198, 199, 198, 0.507)" }}>lan-yuan--实习作品</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;