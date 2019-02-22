import watch from 'redux-watch'
import {
    setFixedTerm as setFixedTermAction,
    setTerm as setTermAction,
    setPeriod as setPeriodAction,
    setAge as setAgeAction,
    setDrivingstage as setDrivingstageAction,
    setCrime as setCrimeAction,
    setLimit as setLimitAction,
    setPeriodKbm as setPeriodKbmAction,
    setTrailer as setTrailerAction,
    setPowerTC as setPowerTCAction,
    setRegions as setRegionsAction,
    setCity as setCityAction,

} from '../../actions'

export default class CalcView{
    constructor(model){
        this.model = model;
//        this.stateChanged = this.stateChanged.bind(this)
/*        this.cnt = 0;
        this.isBusy = false;
        this.hasMoreChanges = false;
        this.statesToUpdate = {}; */
    }

    init(store) {
        this.store = store
//        store.subscribe(this.stateChanged)
        this.subscribe()
    }

    subscribe() {
        let registrationWatch = watch(this.store.getState, 'registration')
        this.store.subscribe(registrationWatch((newVal, oldVal, objectPath) => {
            this.handleRegistrationDependencies(newVal, oldVal)
        }))

        let ownerWatch = watch(this.store.getState, 'owner')
        this.store.subscribe(ownerWatch((newVal, oldVal, objectPath) => {
            this.handleOwnerDependencies(newVal, oldVal)
        }))

        let typeTCWatch = watch(this.store.getState, 'typeTC')
        this.store.subscribe(typeTCWatch((newVal, oldVal, objectPath) => {
            this.handleTypeTCDependencies(newVal, oldVal)
        }))
    }
    handleTypeTCDependencies(newVal, oldVal) {
        this.setTrailerDependency()
        this.setPowerTCDependency()
    }

    handleOwnerDependencies(newVal, oldVal) {
        //this.params.yurPeriod = false;
        switch (newVal) {
            case "yur":
                this.updateStates({
                    limit : {value: true, disabled:false}
//                    trailer: {value: false, disabled:false}
                    /*   age: null,
                       drivingstage: null,*/
                })
                break;

            case "fiz":
                this.updateStates({
                    limit : {value: false, disabled:true}
//                    trailer: {value: false, disabled:false}

                /*   age: null,
                   drivingstage: null,*/
                })
                break;
        }
        this.setTrailerDependency()
    }

    handleRegistrationDependencies(newVal, oldVal) {
        var term;  // = undefined
        var fixedPeriod;
        var period;
        var crime;
        var regions;
        var city;

        switch (newVal) {
            case "regRu":
//                fixedTerm = 't12';  // 1 год
//                term = 't12';
                term = {fixed: false};
                crime= {disabled:false};
                period = {disabled: false};
                regions = { disabled: false};
                city = { disabled: false};
                break;
            case "regNo":
                term = {term: 't20', fixed: 't20'};  // до 20 дней
                period = {value: null, disabled: true};
                crime={disabled:false};
                regions = { disabled: false};
                city = { disabled: false};
                break;
            case "regFo":
                term = {fixed: false};
                crime= {value: false, disabled:true}
                period = {value: null, disabled: true};
                regions = {value: null, disabled: true};
                city = {value: null, disabled: true};

                break;
            default:
                //Только при переходе на "regFo" с "regRu" или с "regRu" нужно сбросить:
                if (['t12', 't20'].indexOf(this.store.getState().term) >= 0)
                    term = {value: null};
        }
        this.updateStates({
            term: term,
            period: period,
            crime: crime,
            regions: regions,
            city: city,
        })
    }
    setPowerTCDependency(){
        const {typeTC} = this.store.getState()
        let obj = {value:null, disabled:true}

        if ( ['tc21','tc22', 'tc23'].indexOf(typeTC) >= 0) {
            obj={disabled:false }
        }
        this.updateStates({powerTC: obj})
    }
    setTrailerDependency() {
        const {owner, typeTC} = this.store.getState()
        let disabled = false
        if (owner == "fiz" && ['tc21','tc22', 'tc23'].indexOf(typeTC) >= 0) {
            disabled = true
        }
        this.updateStates({trailer: {value:false, disabled:disabled}})
    }

    /*
     * Обновить состояния из this.statesToUpdate в Redux store
     */
    updateStates(states) {
        console.warn('updateStates(): ', states)
        for (let [key, value] of Object.entries(states)) {
            if (value !== undefined) {  //Если value === undefined, то обновлять не чего
                this.updateState(key, value)
            }
        }
    }



    /*
     * Обновить состояния в Redux store
     * key - имя параметра состояния (см. reducers/index.js)
     * value - новое значение состояния
     */
    updateState(key, value) {
        const oldValue = this.store.getState()[key] // старое значение
//        var moreChanges = false;    // пока ничего не изменили
        if (this.hasStateChanged(oldValue, value)) {    // проверка, отличается ли новое состояние от старого
//            moreChanges = true // будем изменять
            switch (key) {
                case 'fixedTerm' :
                    this.store.dispatch(setFixedTermAction(value))
                    break;
                case 'term' :
                    this.store.dispatch(setTermAction(value))
                    break;
                 case 'period' :
                    this.store.dispatch(setPeriodAction(value))
                    break;
                case 'crime' :
                    this.store.dispatch(setCrimeAction(value))
                    break;
                case 'trailer' :
                    this.store.dispatch(setTrailerAction(value))
                    break;
                case 'limit' :
                    this.store.dispatch(setLimitAction(value))
                    break;
                case 'age' :
                    this.store.dispatch(setAgeAction(value))
                    break;
                case 'drivingstage':
                    this.store.dispatch(setDrivingstageAction(value))
                    break;
                case 'periodKbm':
                    this.store.dispatch(setPeriodKbmAction(value))
                    break;
                case 'powerTC' :
                    this.store.dispatch(setPowerTCAction(value))
                    break;
                case 'regions' :
                    this.store.dispatch(setRegionsAction(value))
                    break;
                case 'city' :
                    this.store.dispatch(setCityAction(value))
                    break;
                default:
//                    moreChanges = false;    // так ничего и не изменили
            }
        }
//        this.hasMoreChanges = this.hasMoreChanges || moreChanges    // если изменили, то this.hasMoreChanges = true
        // иначе оставим прежнее значение this.hasMoreChanges
    }

    /*
     * Проверка, отличается ли новое состояние от старого
     * oldState - старое состояния, берется из Redux store
     * newState - новое состояние, если объект, то м.б. часть параметров объекта состояния
     */
    hasStateChanged(oldState, newState) {
        if (typeof newState === 'object') { // тип состояния - объект?
            for (let [key, value] of Object.entries(newState)) { //цикл по параметрам объекта нового состояния
                // (новое состояние может иметь меньше параметров, чем старое полное из Redux store)
                if (newState[key] !== oldState[key]) {
                    return true
                }
            }
            return false
        } else {
            return oldState !== newState
        }
    }

    getOptions(name, parameter = null) {
        var options = [];
        console.log('CalcView.getOptions() name='+name)
        switch (name) {
            case "typeTC":
                var obj = this.model.getTypeTC();
                console.log('typeTC obj=', obj)
                var owner = this.store.getState().owner;
                console.log('owner='+owner);
                /* console.log("CalcView. getOptions() typeTC OBJ =");
                 console.dir(obj);*/
                for (var key in obj) {
                    if (owner==='yur'){
                        if(key==='tc22');
                        else{
                            options.push({value: key, label: obj[key].label, selected: false});
                        }

                    }else{
                        if(key==='tc21');
                        else{
                            options.push({value: key, label: obj[key].label, selected: false});
                        }
                    }
                }
                break;
            case "powerTC":
                var obj = this.model.getPowerTC();
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;

            case "term":
                /*  console.log("OsagoView.getOptions term this.params.fixedTerm=" + this.params.fixedTerm);*/
                var obj = this.model.getTerm();
                if (this.store.getState().term.fixedTerm) {  //это key или null
                    //для фиксированного key формируем единствееную опцию
                    var key = this.store.getState().term.fixedTerm;
                    if (obj.hasOwnProperty(key)) {
                        options.push({value: key, label: obj[key].label, selected: true});
                    }
                } else {
                    for (var key in obj) {
                        if (obj[key].hasOwnProperty('disabled') && obj[key].disabled);
                        else {
                            options.push({value: key, label: obj[key].label, selected: false});
                        }
                    }
                    //console.log("OsagoView. getOptions()");
                    //console.dir(options);
                }
                break;

            case "period":
               const  registration = this.store.getState().registration;
               if(registration==="regRu") {
                   const obj = this.model.getPeriod();
                   //  console.log('period obj=', obj);
                   for (var key in obj) {
                       options.push({value: key, label: obj[key].label, selected: false});
                   }
               }
                break;
            case "regions":
                var obj = this.model.getRegions();
                //  console.log('period obj=', obj);
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;
            case "city":
                var obj = this.model.getCity(parameter);
                console.log('view getOptions city parameter='+parameter)
                /* console.log('OsagoView.getOptions name=city, parameter=' + parameter);
                 console.log(obj);*/
                for (var key in obj) {
                    options.push({value: key, label: key, selected: false});
                }
                break;

            case "age":
                var obj = this.model.getAge();
                //  console.log('period obj=', obj);
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;

            case "drivingstage":
                var obj = this.model.getDrivingstage(parameter);
                console.log('view getOptions drivingstage  parameter='+parameter)
                for (var key in obj) {
                    options.push({value: key, label: key, selected: true});
                }
                break;
            case "kbm":
                var obj = this.model.getKbm();
                //  console.log('period obj=', obj);
                for (var key in obj) {
                    options.push({value: key, label: obj[key].label, selected: false});
                }
                break;

            case "periodKbm":
                var obj = this.model.getPeriodKbm(parameter);

                for (var key in obj) {
                    options.push({value: key, label: key, selected: true});
                }
                break;
        }
        return options;
    }
}