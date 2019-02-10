import {SET_OWNER, SET_REGISTRATION, SET_TYPETC, SET_POWERTC } from './actionTypes'

export const setOwner = (owner)=>{
    return {
        type:SET_OWNER,
        owner,
    }
}

export const setRegistration = (registration)=>{
    return {
        type:SET_REGISTRATION,
        registration,
    }
}

export const setTypeTC = (typeTC)=>{
//    console.warn('setTypeTC', typeTC)
    return {
        type:SET_TYPETC,
        typeTC,
    }
}


export const setPowerTC = (powerTC)=>{
    console.warn('setPowerTC', powerTC)
    return {
        type:SET_POWERTC,
        powerTC,
    }
}
