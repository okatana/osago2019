import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'
import {setTerm} from "../../../../actions";

export default class Term extends React.Component {
    constructor(props) {
        super(props)
        console.warn('constructor props=', props)
        this.state = {
            selected: props.term.value,
            disabled: props.term.disabled,
        }
    }

    componentDidUpdate(prevProps) {

        if (this.state.disabled != this.props.term.disabled){
            this.setState({
                selected: this.props.term.value,
                disabled: this.props.term.disabled
            })
        }
    }

    render() {

                    const options = this.state.disabled ? [] :calcView.getOptions("term")
//                    console.log('options=', options)
                    return (
                        <FormSelect name="term" formlabel="Срок договора"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите срок договора"
                                    assigned={(v) => this.props.setTerm({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )
    }
}
