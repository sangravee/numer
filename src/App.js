import React from 'react';
import ReactDOM from 'react-dom';
import Bisection from './rootofeq/bisection';
import Secant from './rootofeq/Secant';
import Home from './Home';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Route,Link, BrowserRouter} from 'react-router-dom';
import Falseposition from './rootofeq/falseposition';
import Newton from './rootofeq/newtonRaph';
import Onepoint from './rootofeq/onepoint';
import Forward from './derivative/forward';
import Trap from './integral/trap';
import Comtrap from './integral/comtrap';
import Simpson from './integral/simpson';
import Comsimp from './integral/comsimp';
import Backward from './derivative/backward';
import Oh2 from './derivative/oh2';
import Oh4 from './derivative/oh4';
import Fwoh2 from './derivative/fwoh2'
import Bwoh2 from './derivative/bwoh2'
var { Header, Content, Footer, Sider } = Layout;
var { SubMenu } = Menu;

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <SubMenu
              key="1"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone"/>
                  <span><Link to ='/'>Root of Equation</Link></span>
                </span>
              }
            >
              <Menu.Item key="bisection"><Link to = '/bisection'>Bisection</Link></Menu.Item>
              <Menu.Item key="falseposition"><Link to = '/falseposition'>False Position</Link></Menu.Item>
              <Menu.Item key="newtonRap"><Link to = '/newtonRaph'>Newton-Raphson</Link></Menu.Item>
              <Menu.Item key="secant"><Link to = '/secant'>Secant Method</Link></Menu.Item>
              <Menu.Item key="onepoint"><Link to = '/onepoint'>One Point Method</Link></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone" />
                  <span>Linear Algebratic Equations</span>
                </span>
              }
            >
              <Menu.Item key="3">Cramer's Rule</Menu.Item>
              <Menu.Item key="4">Gauss Elimination Method</Menu.Item>
              <Menu.Item key="5">Gauss Jordan</Menu.Item>
              <Menu.Item key="6">LU Decomposition</Menu.Item>
              <Menu.Item key="7">Cholesky Decomposition</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone" />
                  <span>Newton's Devided-Diff</span>
                </span>
              }
            >
              <Menu.Item key="8">Linear Interpolation</Menu.Item>
              <Menu.Item key="9">Quadratic Interpolation</Menu.Item>
              <Menu.Item key="10">Polynomial Interpolation</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone" />
                  <span>Lagrange Polynomials</span>
                </span>
              }
            >
              <Menu.Item key="11">Linear Interpolation</Menu.Item>
              <Menu.Item key="12">Quadratic Interpolation</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone" />
                  <span>Integral</span>
                </span>
              }
            >
              <Menu.Item key="13"><Link to = '/trap'>Trapzoidal</Link></Menu.Item>
              <Menu.Item key="14"><Link to = '/comtrap'>Composite Trapzoidal</Link></Menu.Item>
              <Menu.Item key="15"><Link to = '/simpson'>Simpson's</Link></Menu.Item>
              <Menu.Item key="16"><Link to = 'comsimp'>Composite Simpson's</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="appstore" theme="twoTone" />
                  <span>Derivative</span>
                </span>
              }
            >
              <Menu.Item key="17"><Link to = '/forward'>Forward O(h)</Link></Menu.Item>
              <Menu.Item key="18"><Link to = '/backward'>Backward O(h)</Link></Menu.Item>
              <Menu.Item key="19"><Link to = '/fwoh2'>Forward O(h2)</Link></Menu.Item>
              <Menu.Item key="20"><Link to = '/bwoh2'>Backward O(h2)</Link></Menu.Item>
              <Menu.Item key="21"><Link to = '/oh2'>O(h2)</Link></Menu.Item>
              <Menu.Item key="22"><Link to = '/oh4'>O(h4)</Link></Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
           
            </Breadcrumb>
            <Route path = "/" component={Home}/>
              <Route path = "/bisection" component={Bisection}/>
              <Route path = "/falseposition" component={Falseposition}/>
              <Route path = "/newtonRaph" component={Newton}/>
              <Route path = "/onepoint" component={Onepoint}/>
              <Route path = "/secant" component={Secant}/>
              <Route path = "/forward" component={Forward}/>
              <Route path = "/trap" component={Trap}/>
              <Route path = "/comtrap" component={Comtrap}/>
              <Route path = "/simpson" component={Simpson}/>
              <Route path = "/comsimp" component={Comsimp}/>
              <Route path = "/backward" component={Backward}/>
              <Route path = "/oh2" component={Oh2}/>
              <Route path = "/oh4" component={Oh4}/>
              <Route path = "/fwoh2" component={Fwoh2}/>
              <Route path = "/bwoh2" component={Bwoh2}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
      </BrowserRouter>
    );
  }
}

export default App;

