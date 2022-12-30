import { Navigate } from "react-router-dom"
import React, { lazy } from 'react';


const Home=lazy(()=>import("@/views/home"))

const MenuSide=lazy(()=>import("@/components/menu_side/menuSide"))

const Login=lazy(()=>import("@/views/login/userLogin"))



//user
const Page2=lazy(()=>import("@/views/user/userAdd"))
const UserList=lazy(()=>import("@/views/user/userList"))
const UserDetail=lazy(()=>import("@/views/user/userDetail"))
const UserUpdate=lazy(()=>import("@/views/user/userUpdate"))

//role

const RoleAdd=lazy(()=>import("@/views/role/roleAdd"))
const RoleUpdate=lazy(()=>import("@/views/role/roleUpdate"))
const RoleList=lazy(()=>import("@/views/role/roleList"))
const RoleDetail=lazy(()=>import("@/views/role/roleDetail"))

//permission

const PermissionAdd=lazy(()=>import("@/views/permission/permissionAdd"))
const PermissionUpdate=lazy(()=>import("@/views/permission/permissionUpdate"))
const PermissionList=lazy(()=>import("@/views/permission/permissionList"))
const PermissionDetail=lazy(()=>import("@/views/permission/permissionDetail"))



const withLoadingComponent=(comp:JSX.Element)=>(
    <React.Suspense fallback={<div>努力加载中.....</div>}>{comp}</React.Suspense>
)


//嵌套路由
const outLet=[
    {
        path:"/",
        element:<Navigate to="/login"/>
    },
    {
        path:"/login",
        element:withLoadingComponent(<Login/>)
    },
    {
        path:"/home",
        element:withLoadingComponent(<Home/>),
        children:[
            // {
            //     path:"/home/page1",
            //     element:withLoadingComponent(<Page1/>)
            // },
          
           
         
          
            {
                path:"/home/siderMenu",
                element:withLoadingComponent(<MenuSide/>)
            },


//-----------------user-------------------------    --------------
             {
                path:"/home/page2",
                element:withLoadingComponent(<Page2/>)
            },  
            {
                path:"/home/userList",
                element:withLoadingComponent(<UserList/>)
            },
            {
                path:"/home/userDetail",
                element:withLoadingComponent(<UserDetail/>)
            },
            
            {
                path:"/home/user/userDetail",
                element:withLoadingComponent(<UserDetail/>)
            },
            {
                path:"/home/user/userUpdate",
                element:withLoadingComponent(<UserUpdate/>)
            },
            
// -----------------role--------------------------------------
            {
                path:"/home/role/roleAdd",
                element:withLoadingComponent(<RoleAdd/>)
            },
            {
                path:"/home/role/roleDetail",
                element:withLoadingComponent(<RoleDetail/>)
            },
            {
                path:"/home/role/roleList",
                element:withLoadingComponent(<RoleList/>)
            },
            {
                path:"/home/role/roleUpdate",
                element:withLoadingComponent(<RoleUpdate/>)
            },
//-----------------------permission--------------------------
            {
                path:"/home/permission/permissionAdd",
                element:withLoadingComponent(<PermissionAdd/>)
            },
            {
                path:"/home/permission/permissionList",
                element:withLoadingComponent(<PermissionList/>)
            },
            {
                path:"/home/permission/permissionDetail",
                element:withLoadingComponent(<PermissionDetail/>)
            },
            {
                path:"/home/permission/permissionUpdate",
                element:withLoadingComponent(<PermissionUpdate/>)
            },


        ]
    },
   
    {
        path:"*",
        element:withLoadingComponent(<Home/>)
    },

   
    
]

export default outLet