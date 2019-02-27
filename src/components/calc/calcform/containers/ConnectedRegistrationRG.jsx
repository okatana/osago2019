import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RegistrationRG from '../components/RegistrationRG.jsx'
import { setRegistration } from '../../../../actions'

const mapStateToProps = (state, props) => {
    return {
       // registration: state.registration,
    }
}
const mapDispatchToProps = (dispatch, props) =>
    bindActionCreators({ setRegistration }, dispatch)


const ConnectedRegistrationRG = connect(mapStateToProps,mapDispatchToProps)(RegistrationRG)
export default ConnectedRegistrationRG