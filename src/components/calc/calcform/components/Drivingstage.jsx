import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setDrivingstage} from "../../../../actions";

export default class Drivingstage extends React.Component {
    constructor(props) {
        super(props)
        console.warn('drivingstage constructor props=', props)
        this.state = {
            selected: props.drivingstage.value,
            disabled: props.drivingstage.disabled,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.disabled != this.props.drivingstage.disabled){
            this.setState({
                selected: this.props.drivingstage.value,
                disabled: this.props.drivingstage.disabled
            })
        }
    }

    render() {

                    const options = this.state.disabled ? [] :calcView.getOptions("drivingstage", this.props.age);

                   console.log('options=', options)
                    return (
                        <FormSelect name="drivingstage" formlabel="Стаж водителя, выбранного выше по возрасту"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите стаж водителя"
                                    assigned={(v) => this.props.setDrivingstage({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )

    }
}
