import React from 'react'
//import PropTypes from 'prop-types'
import ConnectedOwnerRG from './calcform/containers/ConnectedOwnerRG.jsx'
import ConnectedRegistrationRG from './calcform/containers/ConnectedRegistrationRG.jsx'
import ConnectedTypeTC from './calcform/containers/ConnectedTypeTC.jsx'
import ConnectedPowerTC from './calcform/containers/ConnectedPowerTC.jsx'
import ConnectedTerm from './calcform/containers/ConnectedTerm.jsx'
import ConnectedPeriod from './calcform/containers/ConnectedPeriod.jsx'
import ConnectedRegions from './calcform/containers/ConnectedRegions.jsx'
import {context} from '../App.jsx'

export default class CalcForm extends React.Component {
    constructor(props) {
        super(props)
        console.warn('constructor props=', props)
    }

    render(){
        return(
            <div className="well">
                <div><ConnectedOwnerRG context={context} /></div>
                <div><ConnectedRegistrationRG context={context} /></div>
                <div><ConnectedTypeTC context={context} /></div>
                <div><ConnectedPowerTC context={context} /></div>
                <div><ConnectedTerm context={context} /></div>
                <div><ConnectedPeriod context={context} /></div>
                <div><ConnectedRegions context={context} /></div>
            </div>
         )
    }

}