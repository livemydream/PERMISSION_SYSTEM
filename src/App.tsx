import { message } from 'antd';
import { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import router from './router'


// const ToLogin = () => {
//   const navTo = useNavigate()
//   useEffect(() => {
//     navTo("/login")
//   }, [])
//   return (
//     <></>
//   )
// }
const ToHome = () => {
  const navTo = useNavigate()
  useEffect(() => {
    // history.back()
    navTo("/home")
  }, [])
  return (
    <></>
  )
}

const ProtectRouter = () => {
  const outlet = useRoutes(router)
  const location = useLocation()
  console.log()
  const userInf = localStorage.getItem("user")
  // console.log(location.pathname)



  if (location.pathname === "/login") {
    return outlet
  }


  if (location.pathname === "/home") {
    return outlet
  }



  if (location.pathname === "/home/userList" && userInf) {
    return outlet
  }
  // if (location.pathname === "/home/role/roleList" && userInf) {
  //   return outlet
  // }
  // if (location.pathname === "/home/permission/permissionList" && userInf) {
  //   return outlet
  // }

  if (userInf) {
    const user = JSON.parse(userInf)
    // console.log(user)
    const permissions: string[] = user.SESSION_MAP_PERMISSIONS

    for (let i = 0; i < permissions.length; i++) {
      if (location.pathname === permissions[i]) {
        return outlet
      }
    }

    message.warning("你没有访问权限")

    // console.log("sfadsffasa---------------",permissions)



  }
  // message.warning("你没有访问权限")

  return <ToHome />
  // return outlet

}

// return outlet

function App() {

  return (
    <div className="App">
      <ProtectRouter />
    </div>

  )
}

export default App
