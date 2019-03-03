import React from 'react'
//import {calcContext} from '../../../App.jsx'
import FormRadioGroup from "../../../form/FormRadioGroup.jsx";

export default class RegistrationRG extends React.Component {
    constructor(props) {
        super(props)
       // console.warn('constructor props=', props)
        this.state = {
            owner: {buttonChecked: "fiz"},

        }
    }


    getButtons() {
        return [
            {value: "regRu", label: "ТС зарегистрировано в России", checked: true},
            {value: "regFo", label: "ТС зарегистрировано в иностранном государстве", checked: false},
            {value: "regNo", label: "ТС следует к месту регистрации", checked: false},
        ];
    }
    render() {
        return (
             <FormRadioGroup name="registration" formlabel="Регистрация ТС"
                            buttons={this.getButtons()}
                            checked={this.state.owner.buttonChecked}
                            labelProps={{className: "col-lg-12 label label-info"}}
                            orientation="vertical"
                            assigned={(v) => this.props.setRegistration(v)}/>
         )
    }
}