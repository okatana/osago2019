import {
    SET_OWNER, SET_REGISTRATION, SET_TYPETC, SET_TRAILER, SET_POWERTC,
    SET_TERM, SET_FIXED_TERM, DISABLE_TERM,
    SET_PERIOD, SET_REGIONS, SET_CITY,
    SET_CRIME, SET_LIMIT, SET_AGE, SET_DRIVINGSTAGE,
    SET_KBM, SET_PERIOD_KBM,
} from '../actions/actionTypes'


export function ownerReducer (state = 'fiz', action) {
    switch (action.type) {
        case SET_OWNER:
            return action.owner

        default:
            return state
    }
}

export function registrationReducer (state = 'regRu', action) {
    switch (action.type) {
        case SET_REGISTRATION:
            return action.registration

        default:
            return state
    }
}

export function typeTCReducer (state = 'tc22', action) {
//    console.error('typeTCReducer action.type='+action.type)
    switch (action.type) {
        case SET_TYPETC:
            return action.typeTC

        default:
            return state
    }
}
export function crimeReducer (state = {value: false, disabled: false}, action) {
    switch (action.type) {
        case SET_CRIME:
            //return {...state, ...{value:action.crime}}
            return {...state, ...action.crime}

        default:
            return state
    }
}
export function powerTCReducer (state = {value: 'p0', disabled: false}, action) {
    switch (action.type) {
        case SET_POWERTC:
            return {...state, ...action.powerTC}

        default:
            return state
    }
}
export function trailerReducer (state = {value: false, disabled: true}, action) {
    switch (action.type) {
        case SET_TRAILER:
            return {...state, ...action.trailer}
        default:
            return state
    }
}



export function termReducer (state = {value: 't10', fixed: false, disabled: false}, action) {
    switch (action.type) {
        case SET_TERM:
            return {...state, ...{value:action.term}}
        case SET_FIXED_TERM:
            return {...state, ...{fixed:action.term}}
        case DISABLE_TERM:
            return {...state, ...{disabled:action.disabled}}
        default:
            return state
    }
}



export function periodReducer (state = {value: 't0', disabled: false}, action) {
    switch (action.type) {
        case SET_PERIOD:
            return {...state, ...action.period}

        default:
            return state
    }
}

export function regionsReducer (state = {value: 'r90', disabled: false},  action) {
    switch (action.type) {
        case SET_REGIONS:
            return {...state, ...action.regions}

        default:
            return state
    }
}





export function limitReducer (state = false, action) {
    switch (action.type) {
        case SET_LIMIT:
            return action.limit

        default:
            return state
    }
}

/*export function ageReducer (state = 'de0', action) {
    switch (action.type) {
        case SET_AGE:
            return action.age

        default:
            return state
    }
}*/
export function ageReducer (state = {value: 'de0', disabled: false},  action) {
    switch (action.type) {
        case SET_AGE:
            return {...state, ...action.age}

        default:
            return state
    }
}

export function cityReducer (state = {value: null, disabled: false}, action) {
    switch (action.type) {
        case SET_CITY:
            return {...state, ...action.city}

        default:
            return state
    }
}


//export function drivingstageReducer (state = 'de0', action) {
export function drivingstageReducer (state = {value: 'СТАЖ 0', disabled: false},  action) {
    switch (action.type) {
        case SET_DRIVINGSTAGE:
            return {...state, ...action.drivingstage}

        default:
            return state
    }
}

export function kbmReducer (state = 'kbm1', action) {
    switch (action.type) {
        case SET_KBM:
            return action.kbm

        default:
            return state
    }
}

export function periodKbmReducer (state = null, action) {
    switch (action.type) {
        case SET_PERIOD_KBM:
            return action.periodKbm

        default:
            return state
    }
}