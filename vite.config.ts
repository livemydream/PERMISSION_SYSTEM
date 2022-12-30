import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  },server: {
    https: false,
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:8081', // 接口的域名
    //         secure: false, // 如果是https接口，需要配置这个参数
    //         changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //         rewrite: path => path.replace(/^\/api/, '')
    //     }
    // }
  }

})
