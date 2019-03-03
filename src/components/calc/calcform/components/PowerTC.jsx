import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setPowerTC} from "../../../../actions";

export default class PowerTC extends React.Component {
    constructor(props) {
        super(props)
      //  console.warn('constructor props=', props)
        this.state = {
            selected: props.powerTC.value,
            disabled: props.powerTC.disabled,
        }
    }

    componentDidUpdate(prevProps) {

        if (this.state.disabled != this.props.powerTC.disabled){
     //       console.log('!!!!componentDidUpdate')
            this.setState({
                selected: this.props.powerTC.value,
                disabled: this.props.powerTC.disabled
            })
        }
      }


    render() {

                    const options = this.state.disabled ? [] : calcView.getOptions("powerTC")
//                    console.log('options=', options)
                    return (
                        <FormSelect name="powerTC" formlabel= "Мощность ТС"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите мощность двигателя ТС"
                                    assigned={(v) => this.props.setPowerTC({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )
    }
}
