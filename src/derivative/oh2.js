import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input ,Typography , Button,Table } from 'antd';
import {range, compile,evaluate,simplify,parse,abs,derivative} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'

var dataGraph = []
const PlotlyComponent = createPlotlyComponent(Plotly)
const { Title } = Typography;
const columns = [
  {
    title: 'Iteration',
    dataIndex: 'iteration',
    key : 'iteration'
  },
  {
    title: 'X',
    dataIndex: 'x',
    key : 'x'
  },
  {
    title: 'h',
    dataIndex: 'h',
    key: 'h'
  },
  {
    title: 'FW O(h)',
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

class oh2 extends Component
{
  constructor() {
    super();
    this.state = {
      size: 'large',
    fx : "",
    x: 0,
    h : 0 ,
    d : 0,
    showTable:false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount = async() => { 
    await api.getFunctionByName("oh2_1").then(db => {
    this.setState({
      fx:db.data.data.fx,
      x:db.data.data.x,
      h:db.data.data.h,
      d:db.data.data.d,
    })
    console.log(this.state.fx);
    console.log(this.state.xl);
    console.log(this.state.xr);
    })
  }
  Graph(xl, xr)
  {
        dataGraph = [
        {
          type: 'scatter',  
          x: xl,        
          marker: {         
            color: 'rgb(150, 32, 77)'
          },
          name:'XL'
        },
        {
        type: 'scatter',  
        x: xr,        
        marker: {         
          color: '#ffab00'
        },
        name:'XR'
      }];
      
    }

    func(x) {  
      let scope = {x : parseFloat(x)};
      var expr = compile(this.state.fx);
      return expr.evaluate(scope)
  }

  Diff(d,x) {  
    let scope = {x : parseFloat(x)};
    var expr = compile(d);
    return expr.evaluate(scope)
  }


  error(dtrue,ans){
    return Math.abs((dtrue-ans)/dtrue);
  }

  
  createTable(x,h,ans,error){
    dataTable =[]
    var i = 0;
    for (i=0;i<1;i++){
      dataTable.push({
        iteration: i ,
        x: x[i],
        h: h[i],
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
    var x = this.state.x;
    var h = this.state.h;
    var d = this.state.d;
    var ans =0;
    var dtrue =0;
    var i =1;
    var error = 1;
    var data = []
        data['x'] = []
        data['h'] = []
        data['error'] = []
        data['ans'] = []
        data['d'] = []

    data['d'][0] = fx;
    if(d==1){
      ans = (this.func(parseFloat(x)+parseFloat(h))-this.func(parseFloat(x)-parseFloat(h)))/(2*parseFloat(h))
    }else if(d==2){
      ans = (this.func(parseFloat(x)+parseFloat(h))-(2*this.func(parseFloat(x)))+this.func(parseFloat(x)-parseFloat(h)))/(Math.pow(parseFloat(h),2))
    }else if(d==3){
      ans = (this.func(parseFloat(x)+(parseFloat(h)*2))-(2*this.func(parseFloat(x)+parseFloat(h)))+(2*this.func(parseFloat(x)-parseFloat(h)))-this.func(parseFloat(x)-(parseFloat(h)*2)))/(2*(Math.pow(parseFloat(h),3)))
    }else{
      ans = (this.func(parseFloat(x)+(parseFloat(h)*2))-(4*this.func(parseFloat(x)+parseFloat(h)))+(6*this.func(parseFloat(x)))-(4*this.func(parseFloat(x)-parseFloat(h)))+this.func(parseFloat(x)-(parseFloat(h)*2)))/(Math.pow(parseFloat(h),4))
    }
  

    for(i=0;i<d;i++){
      data['d'][i+1] = derivative(data['d'][i],'x').toString();
    }
    dtrue = this.Diff(data['d'][d],x);
    console.log(data['d'][d]+"  "+ dtrue +"  "+ ans);
    error = this.error(dtrue,ans)

      data['x'][0] = parseFloat(x).toFixed(6);
      data['h'][0] = parseFloat(h).toFixed(6);
      data['ans'][0] = ans.toFixed(6)
      data['error'][0] = error.toFixed(6)
    
      console.log(data['x'][0]+" "+data['h'][0]+" "+data['ans'][0]+" "+data['error'][0])
    
    console.log(this.state);
    this.createTable(data['x'], data['h'], data['ans'], data['error']);
    this.setState({showTable:true,showGrap:true})
    this.Graph(data['x'], data['h'])

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
          
          
            <Title style = {{textAlign: 'center'}}>O(h2) </Title>
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
              <h1>X : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input size="large" placeholder="Input your X" name = "x"style={{ width: 500 }}
                onChange={this.onInputChange}
                />
              </h1>
              <br></br>
              <h1>h : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input size="large" placeholder="Input your h" name = "h"style={{ width: 500 }}
                onChange={this.onInputChange}
                />
              </h1>
              <br></br>
              <h1>Rank of Derivative : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input size="large" placeholder="Input your d" name = "d"style={{ width: 350 }}
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
    <h2 style = {{textAlign: 'center'}}>Table of O(h2)</h2>
    <h4 style = {{textAlign: 'center'}}> fx = {this.state.fx}
    <Table columns={columns} dataSource={dataTable} size="middle" /></h4></div>:''}
    
    {this.state.showGrap === true ? 
        <PlotlyComponent  data={dataGraph} Layout={layout} config={config} /> : ''
    }
    
    </div>
            
            </div>
            
          );
    }
}

export default oh2; 