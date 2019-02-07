import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

import { housesURL, templatesURL } from './../constants'
import { mockTemplatesList, mockData } from './../mockData';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
        houseData: [],
        templates: [],
        currentTemplate: 0,
        readyToRender: false,
        noData: false
    }

    this.setCurrentTemplate = this.setCurrentTemplate.bind(this);
    this.loadTestData = this.loadTestData.bind(this);
  }

  componentWillMount(){

    const houseDataPromise = axios.get(housesURL)
                                  .then(res => res.data.data)
                                  .then(res => this.setState({ houseData: res }))
      
    const templateDataPromise = axios.get(templatesURL)
                                     .then(res => res.data)
                                     .then(res => this.setState({ templates: res }))   

                              
    Promise.all([houseDataPromise, templateDataPromise])
           .then(() => { this.setState({ readyToRender: true }) })
           .catch(err => { this.setState({ noData: true }) })                          

  }

  loadTestData(event){
    event.preventDefault();

    this.setState({
      houseData: mockData,
      templates: mockTemplatesList,
      readyToRender: true,
      noData: false
    })
    
  }

  setCurrentTemplate = event => this.setState({ currentTemplate: event.target.value })

  renderTemplateSelect(){
    return(
      <select onChange={this.setCurrentTemplate}>
        {this.state.templates.map((el, index) => {
          return <option value={index}>Template number {el.id}</option>
        })}
      </select>
    )
  }

  renderCards(){
    let {templates, currentTemplate, houseData} = this.state;
    let tmpl =  templates[currentTemplate].template;

    return (
      <>
        {this.renderTemplateSelect()}
        {houseData.map((data, indx) => <Card template={tmpl} key={indx} data={data}/> )}
      </>
    )
  }

  renderNoDataComponent = () => (
    <span>We can`t load data =( try later
      <a href="#" onClick={this.loadTestData}> maby  load test data?</a>
    </span>
  )


  render(){

    let {readyToRender, noData} = this.state;
    
    return(
      <>
      <h2>main</h2>
      {!readyToRender ? <h2>{noData ? this.renderNoDataComponent() : 'Loading...'}</h2> : this.renderCards()}
      </>
    )
  }
}

export default Main