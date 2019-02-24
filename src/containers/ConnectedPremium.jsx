import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Premium from '../components/Premium.jsx'
import { setErrorMessage, clearErrorMessage } from '../actions'

const mapStateToProps = (state, props) => {
    return {
        premium:state.premium,


    }
}
const mapDispatchToProps = (dispatch, props) =>
    bindActionCreators({ setErrorMessage, clearErrorMessage }, dispatch)


const ConnectedPremium = connect(mapStateToProps,mapDispatchToProps)(Premium)
export default ConnectedPremium