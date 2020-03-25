import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input ,Typography , Button,Table } from 'antd';
import {range, compile,evaluate,simplify,parse,abs} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
//import Title from 'antd/lib/skeleton/Title';
var dataGraph = []
const PlotlyComponent = createPlotlyComponent(Plotly)
const { Title } = Typography;
const { create, all } = require("mathjs");
const mathjs = create(all)
const integral = require("mathjs-simple-integral")
mathjs.import(integral);


const columns = [
  {
    title: 'Iteration',
    dataIndex: 'iteration',
    key : 'iteration'
  },
  {
    title: 'h',
    dataIndex: 'h',
    key : 'h'
  },
  {
    title: 'itrue',
    dataIndex: 'itrue',
    key: 'itrue'
  },
  {
    title: 'I',
    dataIndex: 'ans',
    key :'ans'
  },
  {
    title: 'Error',
    dataIndex: 'error',
    key : 'error'
  },
];
var dataTable = [];

class trap extends Component
{
  constructor() {
    super();
    this.state = {
      size: 'large',
    fx : "",
    a: 0,
    b : 0 ,
    showTable:false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount = async() => { 
    await api.getFunctionByName("Trapzoidal").then(db => {
    this.setState({
        fx:db.data.data.fx,
        a:db.data.data.a,
        b:db.data.data.b,
    })
    console.log(this.state.fx);
    })
  }
  Graph(ans)
  {
        dataGraph = [
        {
        type: 'scatter',  
        x: ans,        
        marker: {         
          color: '#ffab00'
        },
        name:'I'
      }];
      
    }

    func(x) {  
      let scope = {x : parseFloat(x)};
      var expr = compile(this.state.fx);
      return expr.evaluate(scope)
  }

  Infuc(infx,x){
    let scope = {x : parseFloat(x)};
    var expr = compile(infx);
    return expr.evaluate(scope)
  }

  error(itrue,ans){
    return Math.abs((itrue-ans)/itrue);
  }
  
  createTable(h,itrue,ans,error){
    dataTable =[]
    var i = 0;
    for (i=0;i<1;i++){
      dataTable.push({
        iteration: i ,
        h: h[i],
        itrue: itrue[i],
        ans: ans[i],
        error: error[i],
    });
    }
    
  }

  onInputChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value
    })
    console.log(this.state);
  }

  onSubmit (){
    var fx = this.state.fx;
    var a = this.state.a;
    var b = this.state.b;
    var h = parseFloat(b)-parseFloat(a);
    var itrue =0;
    var ans =0;
    var i =0;
    var error = 0;
    var data = []
        data['h'] = []
        data['itrue'] = []
        data['ans'] = []
        data['error'] = []
        data['iteration'] = []
    var infx = mathjs.integral(this.state.fx,'x')

    ans = (h/2)*(this.func(parseFloat(a))+this.func(parseFloat(b)));
    itrue = this.Infuc(infx.toString(),b)-this.Infuc(infx.toString(),a)
    error = this.error(itrue,ans)
    data['itrue'][0] = itrue.toFixed(6);
    data['h'][0] = parseFloat(h).toFixed(6);
    data['ans'][0] = ans.toFixed(6)
    data['error'][0] = error.toFixed(6)

    this.createTable(data['h'], data['itrue'], data['ans'], data['error']);
    this.setState({showTable:true,showGrap:true})
    this.Graph(data['ans'])
    console.log(ans+" "+itrue);
  }
 
    render(){

      let layout = {                     
        title: 'Bisection',  
        xaxis: {                  
          title: 'X'         
        }
      };
      let config = {
        showLink: false,
        displayModeBar: true
      };

      const { size } = this.state;
        return (
          <div id="content" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          
          
            <Title style = {{textAlign: 'center'}}>Trapzoidal Rule </Title>
            <br></br>
            
            <form style = {{textAlign: 'center'}}
              onSubmit={this.onInputChange}
            >
              <h1>Equation  : &nbsp;&nbsp;               
                <Input size="large" placeholder="Input your Function" name = "fx"style={{ width: 500 }}
                onChange={this.onInputChange}
                />
              </h1>
              <br></br>
              <h1>a : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input size="large" placeholder="Input your a" name = "a"style={{ width: 500 }}
                onChange={this.onInputChange}
                />
              </h1>
              <br></br>
              <h1>b : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input size="large" placeholder="Input your b" name = "b"style={{ width: 500 }}
                onChange={this.onInputChange}
                />
              </h1>
              <br></br>
              
              <Button type="submit" shape="round"  size={size}
              style={{ color:'#ffffff',background:'#ca5cf2'}}
              onClick={this.onSubmit}
              >
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="submit" shape="round"  size={size}
              style={{ color:'#ffffff',background:'#f7c602'}}
              onClick={this.onSubmit}
              >
                Function
              </Button>
            </form>

            <div>
              <br></br>
              <br></br>
              {this.state.showTable === true ?
    <div>
    <h2 style = {{textAlign: 'center'}}>Table of Trapzoidal</h2>
    <h4 style = {{textAlign: 'center'}}> fx = {this.state.fx}
    <br></br> a = {this.state.a} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b = {this.state.b}
    <Table columns={columns} dataSource={dataTable} size="middle" /></h4></div>:''}
    
    {this.state.showGrap === true ? 
        <PlotlyComponent  data={dataGraph} Layout={layout} config={config} /> : ''
    }
    
    </div>
            
            </div>
            
          );
    }
}

export default trap; 