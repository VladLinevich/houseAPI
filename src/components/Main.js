import React, { Component } from 'react';
import axios from 'axios';
import 'typeface-roboto';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Paper from '@material-ui/core/Paper'

import { withStyles } from '@material-ui/core/styles';

import Card from './Card';

import { housesURL, templatesURL } from './../constants';
import { mockTemplatesList, mockData } from './../mockData';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: 20
  },
  select: {
    width: '100%',
    maxWidth: 200,
    marginBottom: 20
  },
  paper : {
    width: 1200/3 - 50,
    height: 340,
    marginBottom: 20,
    padding: 10
  }
});

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

    let {classes} = this.props;

    return (
      <FormControl margin='dense' className={classes.select} >
          <Select
            value={this.state.currentTemplate}
            onChange={this.setCurrentTemplate}
            inputProps={{
              name: 'template-name',
              id: 'change-template',
            }}
          >
          {this.state.templates.map((el, index) => {
            return <MenuItem value={index}>Template number {el.id}</MenuItem>
          })}
          </Select>
        </FormControl>
    )
  }

  renderCards(){
    let {templates, currentTemplate, houseData} = this.state;
    let tmpl =  templates[currentTemplate].template;
    let { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container >

          <Grid item xs={12} align='center'>
            {this.renderTemplateSelect()}
          </Grid>

          <Grid container justify="space-between" alignItems='flex-start'  spacing={8} >
            {houseData.map((data, indx) => {
              return (
                <Grid item key={indx}>
                  <Paper  className={classes.paper}>
                    <Card  template={tmpl}  data={data}/>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        
        </Grid>
      </Grid>
    )
  }

  infoTitlesRender = () => (
    <Grid item xs={12}>
      <Typography component='h5' 
                  variant="h5" 
                  align='center' 
                  gutterBottom>
        {this.state.noData ? <>We can`t load data =( try later.
                                <Link href="#" onClick={this.loadTestData}> Maby  load test data?</Link>
                              </> 
                          : 'Loading...'}
      </Typography>
    </Grid>
  )



  render(){

    let {readyToRender} = this.state;
    const { classes } = this.props;

    return(
      <>
      <Grid container className={classes.root}>

        <Grid item xs={12}>
          <Typography component="h1" 
                      variant="h2" 
                      align='center' 
                      gutterBottom>
            Houses API
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container className={classes.cardsWrapper}>

            {!readyToRender ? this.infoTitlesRender() : this.renderCards()}

          </Grid>
        </Grid>
      </Grid>
      
      
      </>
    )
  }
}

export default withStyles(styles)(Main)