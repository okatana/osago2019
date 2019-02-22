import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Kbm from '../components/Kbm.jsx'
import { setKbm } from '../../../../actions'

const mapStateToProps = (state, props) => {
    return {
        kbm: state.kbm,
        /* registration: state.registration,
        fixedTerm: state.fixedTerm,*/
    }
}
const mapDispatchToProps = (dispatch, props) =>
    bindActionCreators({ setKbm }, dispatch)

const ConnectedKbm= connect(mapStateToProps,mapDispatchToProps)(Kbm)
export default ConnectedKbm
