import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drivingstage from '../components/Drivingstage.jsx'
import { setDrivingstage } from '../../../../actions'

const mapStateToProps = (state, props) => {
    return {
        age: state.age,
        drivingstage:state.drivingstage,
        /* registration: state.registration,
        fixedTerm: state.fixedTerm,*/
    }
}
const mapDispatchToProps = (dispatch, props) =>
    bindActionCreators({ setDrivingstage }, dispatch)

const ConnectedDrivingstage = connect(mapStateToProps,mapDispatchToProps)(Drivingstage)
export default ConnectedDrivingstage
