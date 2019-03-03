import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setRegions} from "../../../../actions";

export default class Regions extends React.Component {
    constructor(props) {
        super(props)
      //  console.warn('constructor props=', props)
        this.state = {
            selected: props.regions.value,
            disabled: props.regions.disabled,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.disabled != this.props.regions.disabled){
            this.setState({
                selected: this.props.regions.value,
                disabled: this.props.regions.disabled
            })
        }
    }
    render() {

                    const options = this.state.disabled ? [] :calcView.getOptions("regions")
                 //  console.log('options=', options)
                    return (
                        <FormSelect name="regions" formlabel="Регион регистрации ТС"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите регион регистрации ТС"
                                    assigned={(v) => this.props.setRegions({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )
    }
}
