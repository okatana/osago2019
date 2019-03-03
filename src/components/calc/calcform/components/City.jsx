import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcView} from '../../../App.jsx'

export default class City extends React.Component {
    constructor(props) {
        super(props)
       // console.warn('city constructor props=', props)
        this.state = {
            selected: props.city.value,
            disabled: props.city.disabled,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.disabled != this.props.city.disabled){
            this.setState({
                selected: this.props.city.value,
                disabled: this.props.city.disabled
            })
        }
    }

    render() {
        const options = calcView.getOptions("city", this.props.regions.value);

//                    const options = contextValue.calcView.getOptions("city", this.state.regions)
//                    console.log('options=', options)
                    return (
                        <FormSelect name="city" formlabel="Территория преимущественного использования ТС"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите место регистрации ТС"
                                    assigned={(v) => this.props.setCity({value:v})}
                                    selected={this.state.selected}
                                    enabled={!this.state.disabled}
                        />
                    )

    }
}
