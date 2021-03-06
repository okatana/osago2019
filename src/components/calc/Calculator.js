export default class Calculator{
    constructor(calcModel){
        this.model = calcModel;

    }

    calculate(formParameters, factorKeys){
       // console.log('**********calculate  formParameters=', formParameters)
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
       // console.warn('this.factors', this.factors)
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

       // console.log('loadFromModel() this.params=', this.params)
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
        this.factors.drivingstage = this.getDrivingstage();
      //  this.factors.crime = this.getCrime();
        this.factors.trailer = this.getTrailer();
        this.factors.limit = this.getLimit();
        this.factors.kbm = this.getKbm().toFixed(2);


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
     //   console.log('*** *** tTC=',tTC)
     //   console.log('*** *** reg=',reg)
        if(reg==null){

            reg = 'r99'
        }
        var tb =  this.model.getBaseTariff(tTC,reg)

        return this.typeTC ? tb : null;
    }
    getPowerTC() {
      //  console.log('getPowerTC() this.params.powerTC=', this.params.powerTC)
        return this.powerTC ? this.powerTC.coeff : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }

   /* getCrime() {
        console.log('getCrime() this.params.crime=', this.params.crime)
        return (this.params.crime.value==true)? 1.5 : null;//стр. 19 п.9 коэфф КН = 1.5
    }*/
    getTerm() {
      //  console.log('getTerm() this.params.term=', this.params.term)
        return this.term ? this.term.coeff : null;//вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }
    getCity() {
        if(this.params.registration==='regFo'){
            return 1.7
        }
        var cityKoeff = this.model.getCityCoeff(this.params.regions, this.params.city.value, this.params.typeTC);
        return cityKoeff ? cityKoeff : null;  //вернет null если физ лицо, Россия, на 1 год, ТС кат В

    }
    getDrivingstage(){
        var drivingstageKoeff = this.model.getDrivingstageCoeff(this.params.age, this.params.drivingstage);
        return drivingstageKoeff ? drivingstageKoeff : null;  //вернет null если физ лицо, Россия, на 1 год, ТС кат В
    }

    getTrailer(){
       // console.log('getTrailer() this.params.owner=', this.params.owner)
       // console.log('getTrailer() this.params.typeTC=', this.params.typeTC)
       // console.log('getTrailer() this.params.trailer=', this.params.trailer)
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
       // console.log('getPeriod() this.params.period=', this.params.period)
        return this.period ? this.period.coeff : null;
    }

    getKbm(){
       // return   this.model.getKbmCoeff(this.params.kbm, this.params.periodKbm);
        return   this.model.getKbmCoeff(this.params.kbm);
    }
    /*getCrime() {
        Qconsole.log('getCrime() this.params.crime=', this.params.crime)
        return this.crime ? this.crime.coeff : null;
    }*/
    calcPremium(){
        let premium=1
        for (let [key, value] of Object.entries(this.factors)) {
           // console.log('++++ key='+key)
           // console.log('++++ value='+value)

            if (value) {
                premium*=value
            }
        }
        var maxPremium = 3*this.factors.typeTC* this.factors.regions;

        if(premium>maxPremium)
            premium = maxPremium

        return Math.round(premium*100)/100
    }

    /*calcTypeTCPremium(){
         const {typeTC} = this.state
        console.log('this.state>>>typeTC'+typeTC)
         /* const {st_group} = regions
       const baseTariff = typeTC[st_group]
        console.log('st_group'+st_group)

        const ssObj = this.calcModel.getTypeTcPremium(mainBuildingSS)
        if(ssObj && buildingType){
            return buildingType==='wood'? ssObj.wood : ssObj.stone;
        }
       return 10;* /
}*/
 getTariffObj(props){
     var owner = props.owner=='fiz' ? 'физ.лицо':'юр.лицо';
     var typTC = this.model.getTypeTC(props.typeTC).label;
     var trailer = props.trailer.value ? 'да':'нет'
     var powerTC = this.model.getPowerTC(props.powerTC).label;
     var term = this.model.getTerm(props.term).label;
     var period = this.model.getPeriod(props.period).label;
     var kbm = this.model.getKbm(props.kbm).label;
     var limit = props.limit ? 'да, ограничено' : "нет, не ограничено";
     var drivingAge = props.age ? this.model.getAge(props.age).label:'не выбрано';
     var drivingStage = props.age ? this.model.getDrivingstage(props.age, props.drivingstage).label:'не выбрано';

     var str = '<table>' +
         '<tbody>' +
         '<tr>' +
         '<th>Владелец:</th>' +
         '<th>Тип ТС:</th>' +
         '<th>Прицеп:</th>' +
         '<th>Мощность ТС:</th>' +
         '<th>Срок договора:</th>' +
         '<th>Период использования ТС:</th>' +
         '<th>КБМ:</th>' +
         '<th>Кол-во водителей ограничено:</th>' +
         '<th>Минимальный возраст/стаж:</th>' +
         '</tr>' +
         '<tr>' +
         '<td>'+owner+'</td>' +
         '<td>'+typTC+'</td>' +
         '<td>'+trailer+'</td>' +
         '<td>'+powerTC+'</td>' +
         '<td>'+term+'</td>' +
         '<td>'+period+'</td>' +
         '<td>'+kbm+'</td>' +
         '<td>'+limit+'</td>' +
         '<td>'+drivingAge+'  '+drivingStage+'</td>' +
         '</tr>' +
         '</tbody>' +
         '</table>';


     return {baseTariff:this.model.getBaseTariff(props.typeTC, props.regions),
             region:this.model.getRegions(props.regions).label,
             city:  props.city.value,
             values:str,
             premium: this.calcPremium()



             }
 }

}