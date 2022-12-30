import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'


const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
  {
    label: "用户管理",
    key: "userManager",
    icon: <PieChartOutlined />,
    children: [
      { label: "查询", key: "/home/userList" },
      { label: "添加", key: "/home/page2" },
    ]
  },
  {
    label: "角色管理",
    key: "roleMagager",
    icon: <UserOutlined />,
    children: [
      { label: "查询", key: "/home/role/roleList" },
      { label: "添加", key: "/home/role/roleAdd" },
    ]
  },
  {
    label: "权限管理",
    key: "permissionMagager",
    icon: <DesktopOutlined />,
    children: [
      { label: "查询", key: "/home/permission/permissionList" },
      { label: "添加", key: "/home/permission/permissionAdd" },
    ]
  },


];

const MenuSide: React.FC = () => {
  const navigateTo = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [me, setMe] = useState("userManager");
  const [select, setSelect] = useState("/home/userList");
  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();

  const menuClick = (e: { key: string, keyPath: string[] }) => {
    // console.log("dsdas============================================")
    // console.log(e)
    setMe(e.keyPath[1])
    setSelect(e.key)
    navigateTo(e.key)
  }

  return (

    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.4)', color: "#FFF", textAlign: 'center', paddingTop: '7px', fontWeight: 'bold', borderRadius: "5PX" }} > permission-system</div>
      <Menu theme="dark" defaultSelectedKeys={[select]} defaultOpenKeys={[me]} mode="inline" items={items} onClick={menuClick} />
    </Sider>

  );
};

export default MenuSide;