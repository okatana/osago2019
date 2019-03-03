import React from 'react'
import {calcView} from '../../../App.jsx'
import FormCheckbox1 from "../../../form/FormCheckbox1.jsx";
//import {setCrime} from "../../../../actions";

export default class Crime extends React.Component {
    constructor(props) {
        super(props)
      //  console.warn('constructor props=', props)
        this.state = {
            selected: props.crime.value
        }
    }
    assignedHandler(value) {
        this.props.setCrime({value:value});
        this.setState({selected:value})
    }
    componentDidUpdate(prevProps) {
        if (this.state.selected != this.props.crime.value)
            this.setState({selected:this.props.crime.value})
    }
    render() {
        return (

            <FormCheckbox1 name="crime" formlabel="Имеются грубые нарушения условий страхования"
                id="crime"
                labelProps={{className: "col-lg-12 label label-info"}}
                label="Да, имеются грубые нарушения условий страхования"
                selected={this.state.selected}
                enabled={!this.props.crime.disabled}
                assigned={(v)=>this.assignedHandler(v)}
            />
        )
    }
}


