import React  from 'react';

import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';

import { withStyles } from '@material-ui/core/styles';

const imageStyled = theme => ({
    root: {
        position: 'relative',
        '& .children': {
            position: 'absolute',
            top: 10,
            left: 10,
            '& *': {
                color: '#f44'
            },   
        },
        '& .change': {
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
        }     
    },
    image: {
      height: 200,
    },
});

class ImageView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedImg: 0
        }
    }

    handleChangeImage = event => {
        this.setState({ selectedImg: event.target.value });
    };

    render(){

        let { classes, children, images } = this.props;

        return(
            <div className={ classes.root}>

                <CardMedia className={classes.image} image={images[this.state.selectedImg]} />

                {images.length > 1 ? <div className='change'>
                                        {images.map((el, index) => {
                                            return <Radio checked={this.state.selectedImg == index}
                                                          onChange={this.handleChangeImage}
                                                          value={index}
                                                          name="image" 
                                                          key={index}
                                                          />
                                        })}
                                    </div>
                                    : false } 

                <div className='children'>{children}</div>

            </div>
        )
    }
}

export const Image = withStyles(imageStyled)(ImageView)


export const Address = (props) => (
    <div>
        <Typography variant='subtitle1' 
                    internalDeprecatedVariant={true}>
            <b>Адресс:</b> {props.full_address} 
        </Typography>
        <div className='children'>{props.children}</div>
    </div>
)

export const Price = (props) => (
    <div>
        <Typography variant='subtitle1' 
                    internalDeprecatedVariant={true}>
            <b>Цена:</b> {props.price} грн.
        </Typography>
        <div className='children'>{props.children}</div>
    </div>
)

export const Area = (props) => (
    <div>
        <Typography variant='subtitle1' 
                    internalDeprecatedVariant={true}>
            <b>Площадь:</b> {props.area} 
        </Typography>
        <div className='children'>{props.children}</div>
    </div>
)