import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// 样式初始化一般防砸最前面
import "reset-css"
// ui框架的样式
// 全局样式
import "@/assets/style/global.scss"
// 组件的样式

//状态管理
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
 
)
