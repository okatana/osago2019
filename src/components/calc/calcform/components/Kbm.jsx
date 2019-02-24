import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setKbm} from "../../../../actions";

export default class Kbm extends React.Component {
    constructor(props) {
        super(props)
        console.warn('constructor props=', props)
        this.state = {
            selected: props.kbm.value,

        }
    }


    render() {
        var options = calcView.getOptions("kbm")
        if (this.props.kbm.fixed) {
            options = options.filter(function(elem){
                return elem.value === this.props.kbm.value
            }, this)
        }
        console.log('kbm options=', options)

        return (
            <FormSelect name="kbm" formlabel="КБМ"
                        labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                        options={options}
                        placeholder="Выберите свой коэффициент КБМ"
                        assigned={(v) => this.props.setKbm({value:v})}
                        selected={this.state.selected}
            />
        )
    }
}
