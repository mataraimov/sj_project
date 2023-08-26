import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import a from './Admin.module.css'

const Admin = () => {
    return (
        <div className={a.admin}>
            <Link to='/admin/create-investor'>
                <Button>Создать инвестора</Button>
            </Link>
            <Link to='/admin/create-developer'>
                <Button>Создать разработчика</Button>
            </Link>
        </div>
    )
}

export default Admin