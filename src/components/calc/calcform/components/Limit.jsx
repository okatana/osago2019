import React from 'react'
import {calcView} from '../../../App.jsx'
import FormCheckbox1 from "../../../form/FormCheckbox1.jsx";

export default class Limit extends React.Component {
    constructor(props) {
        super(props)
       // console.warn('constructor props=', props)
        this.state = {
           // limit: {selected: false,enabled:true,
            selected: props.limit.value

        }
    }
   /* assignedHandler(key, value) {
        this.props.view.assign(key, value);
    }*/

assignedHandler(value) {
    this.props.setLimit({value:value});
    this.setState({selected:value})
}
componentDidUpdate(prevProps) {
    if (this.state.selected != this.props.limit.value)
        this.setState({selected:this.props.limit.value})
}
    render() {

        return (

            <FormCheckbox1 name="limit" formlabel="Количество водителей ограничено"
                           id="limit"
                           labelProps={{className: "col-lg-12 label label-info"}}
                           label="Нет, не ограничено"
                           selected={this.state.selected}
                           enabled={this.props.limit.disabled}
                           assigned={(v)=>this.assignedHandler(v)}
                           />


        )
    }
}


