import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function HeaderPage () {

    return (
        <Header
            style={{
            display: 'flex',
            alignItems: 'center',
            }}
        >
            <Menu
                theme="dark"
                mode="horizontal"
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Menu.Item key="home" >
                    <Link to="/">Note App</Link>
                </Menu.Item>
                <Menu.Item key="notes">
                    <Link to="/notes?page=1">All Notes</Link>
                </Menu.Item>
                <Menu.Item key="create-note">
                    <Link to="/notes/create">Create Note</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}