import React, { Component } from 'react';

import { Address, Image, Price, Area } from './CardFields'

class Card extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            componets : {
                address: Address,
                image: Image,
                price: Price,
                area: Area
            },
            
        }
    }

    renderCardFields = template => template.map( el => this.createCardFields(el))

    createCardFields(ref){
        return React.createElement(
            this.state.componets[ref.component.toLowerCase()],
            {[ref.field]: this.props.data[ref.field]},
            ref.children ? ref.children.map( el => this.createCardFields(el)) : false
        )
    }

    render(){
        return(
            <section className='card'>
                {this.renderCardFields(this.props.template)}
            </section>
        )
    }
}

export default Card