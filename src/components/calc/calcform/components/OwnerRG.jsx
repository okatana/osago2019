import React from 'react'
//import {calcContext} from '../../../App.jsx'
import FormRadioGroup from "../../../form/FormRadioGroup.jsx";

export default class OwnerRG extends React.Component {
    constructor(props) {
        super(props)
    //    console.warn('constructor props=', props)
        this.state = {
            owner: {buttonChecked: "fiz"}
        }
    }
    getButtons() {
        return  [
            {value: "fiz", label: "Физическое лицо", checked: true},
            {value: "yur", label: "Юридическое лицо", checked: false},
        ];
    }
    render() {
        return (
            <FormRadioGroup name="owner" formlabel="Владелец"
                            buttons={this.getButtons()}
                            checked={this.state.owner.buttonChecked}
                            labelProps={{className: "col-lg-12 label label-info"}}
                            orientation="vertical"
                            assigned={(v) => this.props.setOwner(v)}/>

        )
    }
}

//export default connect(({ setOwner }) => ({ setOwner }))(OwnerRG);
