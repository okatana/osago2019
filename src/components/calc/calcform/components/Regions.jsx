import React from 'react'
import FormSelect from "../../../form/FormSelect.jsx";
import {calcContext} from '../../../App.jsx'
import {setRegions} from "../../../../actions";

export default class Regions extends React.Component {
    constructor(props) {
        super(props)
        console.warn('constructor props=', props)
        this.state = {
            regions: {selected: "r90"}
        }
    }
    render() {
        return (
            <calcContext.Consumer>
                {(contextValue) => {
//                    console.log('contextValue=', contextValue)
                    const options = contextValue.calcView.getOptions("regions")
//                    console.log('options=', options)
                    return (
                        <FormSelect name="regions" formlabel="Регион регистрации ТС"
                                    labelProps={{className: "col-lg-12 label label-info mandatory-parameter"}}
                                    options={options}
                                    placeholder="Выберите регион регистрации ТС"
                                    assigned={(v) => this.props.setRegions(v)}
                                    selected={this.state.regions.selected}
                        />
                    )
                }}
            </calcContext.Consumer>
        )
    }
}
