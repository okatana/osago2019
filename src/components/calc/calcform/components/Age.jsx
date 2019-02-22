import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setAge} from "../../../../actions";

export default class Age extends React.Component {
    constructor(props) {
        super(props)
//        console.warn('constructor props=', props)
       /* this.state = {
            age: {selected: "de0"}
        }*/

        this.state = {
            selected: props.age.value,
            disabled: props.age.disabled,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.disabled != this.props.age.disabled){
            this.setState({
                selected: this.props.age.value,
                disabled: this.props.age.disabled
            })
        }
    }


    render() {

                    const options = this.state.disabled ? [] :calcView.getOptions("age")
                    console.log('options=', options)
                    return (
                        <FormSelect name="age" formlabel="Возраст водителя (если водителей несколько, выбирать следует минимальный)"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите минимальный возраст водителя"
                                    assigned={(v) => this.props.setAge({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )
    }
}
