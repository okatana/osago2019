import React from 'react'
import {calculator} from "./App.jsx";

export default class Premium extends React.Component{
    constructor(props){
        super(props)
        //console.warn('constructor props=', props)
    }

    render(){
        return(
            <div className='premium-block'>
                страховая премия: <br/> <span>{this.props.premium}</span>
            </div>
        )
    }

}
