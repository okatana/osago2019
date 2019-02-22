export default class Calculator{
    constructor(calcModel){
        this.model = calcModel;

    }

    calculate(formParameters, factorKeys){
        console.log('**********calculate  formParameters=', formParameters)
        this.params = formParameters;
        this.factors = this.getDefaultFactors(factorKeys);

        this.loadFromModel();
        this.calculateFactors();
    }

    /**
     * Начальные значения коэффициентов калькулятора
     */
    getDefaultFactors(factorKeys) {
        var factors = {};
        var keys = factorKeys;
        for (var i in keys) {
            factors[keys[i]] = null; //no value
        }
        return factors;
    }

    getFactors() {
        console.warn('this.factors', this.factors)
        return this.factors;
    }

    loadFromModel() {
        this.typeTC = this.model.getTypeTC(this.params.typeTC, this.params.owner);//value
        this.regions = this.model.getRegions(this.params.regions);
        /*if(this.params.city)
            this.city = this.model.getCity(this.params.city);*/
        this.powerTC = this.model.getPowerTC(this.params.powerTC);//value
        if (this.params.term)
            this.term = this.model.getTerm(this.params.term);//value
        if (this.params.period)
            this.period = this.model.getPeriod(this.params.period);

        this.kbm = this.model.getKbm(this.params.kbm);  // value ??

        console.log('loadFromModel() this.params=', this.params)
//        this.driving_experience = this.model.getDriving_experience(this.params.driving_experience); // value ??
    }

    /**
     * Рассчитать коэффициенты
     */
    calculateFactors() {
        this.factors.typeTC = this.getTypeTC();
        this.factors.powerTC = this.getPowerTC();
        this.factors.term = this.getTerm();
        this.factors.period = this.getPeriod();
        this.factors.city = this.getCity();
        this.factors.crime = this.getCrime();
        this.factors.trailer = this.getTrailer();
        this.factors.limit = this.getLimit();


    }

    getLimit(){
        if(this.params.owner=='yur'){
            return 1.8
        }
        if(this.params.limit.value){
            return 1.87
        }
        return 1;
    }
    getTypeTC() {
        var tTC=this.params.typeTC;
        var reg=this.params.regions;
        var tb =  this.model.getBaseTariff(tTC,reg)

        return this.typeTC ? tb :null //this.model.getBaseTariff(this.params.typeTC,this.params.regions) : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }
    getPowerTC() {
        console.log('getPowerTC() this.params.powerTC=', this.params.powerTC)
        return this.powerTC ? this.powerTC.coeff : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }

    getCrime() {
        console.log('getCrime() this.params.crime=', this.params.crime)
        return (this.params.crime.value==true)? 1.5 : null;//стр. 19 п.9 коэфф КН = 1.5
    }
    getTerm() {
        console.log('getTerm() this.params.term=', this.params.term)
        return this.term ? this.term.coeff : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }
    getCity() {
        var cityKoeff = this.model.getCityCoeff(this.params.regions, this.params.city.value, this.params.typeTC);
        return cityKoeff ? cityKoeff : null;  //вернет null если физ лицо, Россия, на 1 год, ТС кат В

    }

    getTrailer(){
        console.log('getTrailer() this.params.owner=', this.params.owner)
        console.log('getTrailer() this.params.typeTC=', this.params.typeTC)
        console.log('getTrailer() this.params.trailer=', this.params.trailer)
        if(this.params.trailer.value) {
            if (this.params.owner == 'yur' && (this.params.typeTC == 'tc21' || this.params.typeTC == 'tc23')) {
                return 1.16;// стр.18 п.6
            }
            if (this.params.typeTC == 'tc31') {
                return 1.40
            }
            if (this.params.typeTC == 'tc32') {
                return 1.25
            }
            if (this.params.typeTC == 'tc7') {
                return 1.24
            }

        }
        return 1;
    }
    getPeriod() {
        console.log('getPeriod() this.params.period=', this.params.period)
        return this.period ? this.period.coeff : null;
    }
    /*getCrime() {
        console.log('getCrime() this.params.crime=', this.params.crime)
        return this.crime ? this.crime.coeff : null;
    }*/
    calcPremium(){
        let premium = 0;
        premium+=this.calcTypeTCPremium();
        premium+=this.calcPowerTCPremium();
        premium+=this.calcPeriodPremium();
        premium+=this.calcTermPremium();
        premium+=this.calcKbmPremium();
        premium+=this.calcTrailerPremium();
        premium+=this.calcRegionsPremium();
        premium+=this.calcLimitPremium();
        premium+=this.calcCrimePremium();
        premium+=this.calcAgeStagePremium();

        return premium
    }

    calcTypeTCPremium(){
         const {typeTC} = this.state
        console.log('this.state>>>typeTC'+typeTC)
         /* const {st_group} = regions
       const baseTariff = typeTC[st_group]
        console.log('st_group'+st_group)

        const ssObj = this.calcModel.getTypeTcPremium(mainBuildingSS)
        if(ssObj && buildingType){
            return buildingType==='wood'? ssObj.wood : ssObj.stone;
        }
       */ return 10;
    }
    calcPowerTCPremium(){
        return 0
    }
    calcPeriodPremium(){
        return 0
    }
    calcTermPremium(){
        return 0
    }
    calcKbmPremium(){
        return 0
    }
    calcTrailerPremium(){
        return 0
    }
    calcRegionsPremium(){
        return 0
    }
    calcLimitPremium(){
        return 0
    }
    calcCrimePremium(){
        return 0
    }
    calcAgeStagePremium(){
        return 0
    }


}