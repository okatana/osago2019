import React from 'react'
import {calcView} from '../../../App.jsx'
import FormCheckbox1 from "../../../form/FormCheckbox1.jsx";
//import {setTrailer} from "../../../../actions";

export default class Trailer extends React.Component {
    constructor(props) {
        super(props)
      //  console.warn('constructor props=', props)
        this.state = {
            selected: props.trailer.value
        }
    }
    assignedHandler(value) {
        this.props.setTrailer({value:value});
        this.setState({selected:value})
    }
    componentDidUpdate(prevProps) {
        if (this.state.selected != this.props.trailer.value)
            this.setState({selected:this.props.trailer.value})
    }
    render() {

        return (

            <FormCheckbox1 name="trailer" formlabel="ТС с прицепом"
                           id="trailer"
                           labelProps={{className: "col-lg-12 label label-info"}} label="Да, есть прицеп"
                           selected={this.state.selected}
                           enabled={!this.props.trailer.disabled}
                           assigned={(v)=>this.assignedHandler(v)}
            />

        )
    }
}


