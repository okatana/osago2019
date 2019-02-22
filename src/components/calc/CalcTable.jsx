import React from 'react'
import Table from '../html/Table.jsx'
import {calculator} from '../App.jsx'
export default class CalcTable extends React.Component{
    constructor(props){
        super(props)
//        console.warn('constructor props=', props)
        this.colHeaders = ["Наименование", "Коэффициент"];
        this.state = {data: []};
    }

    componentDidMount() {
//        this.setFactors([]);
        this.calculate()
    }

    setFactors(factors) {
        var data = [];
        var factorData = this.factorData();
        for (var key in factorData) {
            var value = factors[key] ? factors[key] : 'не используется';
            data.push([factorData[key], value]);
        }
        this.setState({data: data});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
//            console.warn('CalcTable.componentDidUpdate() props=', this.props)
            this.calculate()
        }
    }

    calculate() {
        calculator.calculate(this.props, this.getFactorKeys())
        const {typeTC,powerTC,term, period,city,crime,kbm, limit,trailer} = calculator.getFactors();

        this.setFactors({
            powerTC:powerTC,
            term: term,
            period:period,
            trailer:trailer,
           // kbm:kbm,


            city:city,
            limit:limit,
            crime:crime,


           // driving_experience: driving_experience,
            typeTC:typeTC,
        })
    }

    factorData() {
        return {
            powerTC: 'По мощности',
            term: 'По сроку страхования',
            period: 'По периоду использования',
            kbm: 'По КБМ',
            trailer: 'По наличию прицепа',
            city: 'По территории использования',
            limit: 'По ограничению лиц, допущенных к управлению ТС',
            crime: 'По наличию грубых нарушений условий страхования',
            driving_experience: 'По минимальному возрасту и стажу лица, допущенного к управлению ТС',

            typeTC: 'Базовый тариф',
        }
    }

    /**
     * Выдать массив ключей коэффициентов (для контроллера)
     * @returns {Array}
     */
    getFactorKeys() {
        return Object.keys(this.factorData());
    }

    render(){
        return(
            <div>
                <Table id="coeff_table" colHeaders={this.colHeaders} data={this.state.data} enabled='false'/>

            </div>
        )
    }

}
