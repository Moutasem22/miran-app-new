import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import CountryList from '../countryList/countryList';

const { Header, Sider, Content } = Layout;

class MainLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" style={{ height: '60px', display: 'flex', alignItems: 'center', fontSize: '16px', color: '#fff', padding: '0 15px' }}>
                        <p>Logo</p>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>nav 1</Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>nav 2</Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>nav 3</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {this.state.collapsed ? <MenuUnfoldOutlined style={{ color: '#fff', fontSize: '18px' }} className='trigger' onClick={this.toggle} /> :
                            <MenuFoldOutlined style={{ color: '#fff', fontSize: '18px' }} onClick={this.toggle} className='trigger' />}
                    </Header>
                    <Content className="site-layout-background"
                    >
                        <div className="app-wrapper">
                            <CountryList />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout
