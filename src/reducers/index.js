import { combineReducers } from 'redux'
import {premiumReducer, errorMessageReducer} from './premium'
import {ownerReducer, registrationReducer, typeTCReducer,trailerReducer, powerTCReducer,
        termReducer,periodReducer, regionsReducer, cityReducer,
        ageReducer,drivingstageReducer,limitReducer,crimeReducer,kbmReducer,//periodKbmReducer


} from './calcform'

const appReducer = combineReducers({
    premium: premiumReducer,
    errorMessage: errorMessageReducer,
    owner: ownerReducer,
    registration: registrationReducer,
    typeTC: typeTCReducer,
    trailer: trailerReducer,
    powerTC: powerTCReducer,
    term: termReducer,
    period: periodReducer,

    regions: regionsReducer,
    city: cityReducer,
    limit: limitReducer,
    crime: crimeReducer,
    age: ageReducer,
    drivingstage: drivingstageReducer,
    kbm: kbmReducer,
    //periodKbm: periodKbmReducer,
})

export default appReducer