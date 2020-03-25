import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
var { Header, Content, Footer, Sider } = Layout;
var { SubMenu } = Menu;

class navbar extends React.Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <SubMenu
              key="Root"
              title={
                <span>
                  <Icon type="smile" />
                  <span>Loot of Equation</span>
                </span>
              }
            >
              <Menu.Item key="bisection">Bisection</Menu.Item>
              <Menu.Item key="failposition">Fail-Position</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="smile" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="7">Team 2</Menu.Item>
              <Menu.Item key="8">Team 3</Menu.Item>
            </SubMenu>
            
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
              <div id="content" style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
      
    );
  }
}


export default navbar;
