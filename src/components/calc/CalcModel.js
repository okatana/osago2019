const baseCoeff = require ('./baseCoeff.js')

export default class CalcModel {
    constructor() {
        this.load();
    }
    load() {
        this.typeTC = baseCoeff.typeTC;
        this.powerTC = baseCoeff.powerTC;
        this.term = baseCoeff.term;
        this.period = baseCoeff.period;
        this.regions = baseCoeff.regions;
        this.city = baseCoeff.regions;
        this.age = baseCoeff.age;
        this.drivingstage = baseCoeff.age;
        this.kbm = baseCoeff.kbm;
        this.periodKbm = baseCoeff.kbm;
        /*this.mainBuildingPremium = baseCoeff.mainBuildingPremium;
        this.saunaPremium = baseCoeff.saunaPremium;
        this.dop1Premium = baseCoeff.dop1Premium;
        this.dop2Premium = baseCoeff.dop2Premium;
        this.imPremium = baseCoeff.imPremium;
        this.goPremium = baseCoeff.goPremium;*/

    }

    getTypeTC(key=null){
        if(key)
            return this.typeTC[key];
        return this.typeTC;
    }
    getBaseTariff(tc_key, regions_key){
        if(this.regions[regions_key]) {
            var stGroup = this.regions[regions_key].st_group;
            return this.typeTC[tc_key][stGroup]
        }else{
            return null;
        }
    }

    getPowerTC(key=null){
        if(key)
            return this.powerTC[key];
        return this.powerTC;
    }
    getCityCoeff(regionKey, cityName, typeTCKey){
        if(this.regions[regionKey]){
             var str = this.regions[regionKey].city[cityName]
             if(str!=undefined) {
                var arr = str.split(', ')
                if (typeTCKey != 'tc7') {
                    return arr[0]
                 } else {
                    return arr[1]
                }
        }}
        return null;
    }
    getDrivingstageCoeff(ageKey, drivingstageName){
        console.log('this.age[ageKey] ',this.age[ageKey])
        if(this.age[ageKey]){
            var str = this.age[ageKey].drivingstage[drivingstageName]
            if(str!=undefined) {
                return str
            }}
        return null;
    }
    getTerm(key=null){
        if(key)
            return this.term[key];
        return this.term;
    }

    getPeriod(key=null){
        if(key)
            return this.period[key];
        return this.period;
    }

    getRegions(key=null){
        if(key)
            return this.regions[key];
        return this.regions;
    }

    getCity(regionKey, key=null){
        var region = this.getRegions(regionKey);
        if(key)
            return region.city[key];
        return region.city;
    }

    getAge(key=null){

        console.log('>>>>>>getAge  key='+key)
        if(key)
            return this.age[key];
        return this.age;
    }
    getDrivingstage(ageKey='de0', key=null){
        console.log('>>>>>>getDrivingstage  ageKey='+ageKey)
        console.log('>>>>>>getDrivingstage  key='+key)
        var age = this.getAge(ageKey);
        console.log('+++>>>+++',age)
        if(key)
            return age.drivingstage[key];
        return age.drivingstage;
    }

    getKbm(key=null){
        if(key)
            return this.kbm[key];
        return this.kbm;
    }
    getPeriodKbm(kbmKey, key=null){
        console.log('>>>>>>getPeriodKbm  kbmKey'+kbmKey)
        console.log('>>>>>>getPeriodKbm  key'+key)
        var kbm = this.getKbm(kbmKey);
        if(key)
            return kbm.periodKbm[key];
        return kbm.periodKbm;
    }
}


















