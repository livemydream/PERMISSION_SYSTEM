import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';




const App: React.FC = () => {
    const roleInfo = useLocation().state
    console.log("路由")
    console.log(roleInfo)

    // const [roles0, setRoles0] = useState<any[]>([])
    // const { userId } = useParams()
    // console.log("路由" + userId)
    // const [userinfo, setUserInfo] = useState<any>({})
    const navigateTo = useNavigate()

    const [isLoading, setLoading] = useState(true);
    // const [roleceDef, setRoleDef] = useState<string[]>()
    const [username, setUsername] = useState(roleInfo.role_name)
    const [remark, setRemark] = useState(roleInfo.remark)
    const [roleSelect, setRoleSelect] = useState<{ value: string, lable: string }[]>()
    const [roles, setRoles] = useState<string[]>(roleInfo.permissionIds)

    const handleChangeSelect = (value: string, option: any) => {
        //  setRoles(value)
        console.log(`selected ${value}`);
        let roles0: string[] = []
        option.forEach((e: any) => {
            console.log(e.lable)
            roles0.push(e.lable)
        })

        setRoles(roles0)
        // option.foreach((element:any)=>{
        console.log(roles)
        //     permissions0.push(element.label)
        // })
    };

    const { TextArea } = Input;
    const remarkhandle = (e: any) => {
        console.log(e.target.value)
        setRemark(e.target.value)
    }
    const usernameHandle = (e: any) => {
        console.log(e.target.value)
        setUsername(e.target.value)
    }

    const addHandle = () => {
        console.log(username, remark, roles)
        let formdata = new FormData()
        formdata.append("roleName", username)
        formdata.append("remark", remark)
        formdata.append("roleId", roleInfo.role_id)
        roles.forEach(e => {
            formdata.append("permissions", e)

        })
        formdata.forEach(element => {
            if (element === "") {
                message.warning("请填写相关字段！")
                throw new Error()
            }
        })


        axios({
            url: "/api/role/roleInfoUpdate",
            data: formdata,
            method: "post"
        }).then(
            resp => {
                console.log(resp.data)
                console.log(resp)
                if (resp.data.code === '1') {
                    message.info(resp.data.tip);
                    navigateTo("/home/role/roleList")
                } else {
                    message.info(resp.data.tip)
                }

            }
        )
    }

    // useEffect(() => {
    //     getQueryUserInfoByUserId()

    // }, [])
    useEffect(() => {
        getQueryAllPermissionsAndRole()
    }, [])






    const getQueryAllPermissionsAndRole = async () => {
        const resp = await axios.get("/api/user/queryAllPermissionsAndRole")
        let permissionArray: { value: string, lable: string }[] = []

        resp.data.permissions.forEach((element: any) => {
            let item = {
                lable: element.permissionId,
                value: element.permissionName
            }

            permissionArray.push(item)
            console.log("ddhsadhsa", permissionArray)

        });
        setRoleSelect(permissionArray)
        setLoading(false)
    }





    if (isLoading) {
        return (
            <>
                <p>login。。。。。。。</p>
            </>
        )
    } else {
        return (
            <>
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                >
                    <Form.Item label="角色名" name="username" rules={[{ required: true }]} initialValue={roleInfo.role_name} >
                        <Input onChange={usernameHandle} />
                    </Form.Item>




                    <Form.Item label="权限" name="permission" rules={[{ required: true }]} initialValue={roleInfo.permissions} >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            // defaultValue={roleceDef}
                            onChange={handleChangeSelect}
                            options={roleSelect}
                        />
                    </Form.Item>

                    <Form.Item label="备注" name="remark" rules={[{ required: false }]} initialValue={roleInfo.remark} >
                        <TextArea rows={4} placeholder="最多可以写255个字！" maxLength={255} onChange={remarkhandle} />
                    </Form.Item>
                    <Form.Item label="">
                        <Button type="primary" htmlType="submit" onClick={addHandle} >
                            更新{username}
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}


export default App;