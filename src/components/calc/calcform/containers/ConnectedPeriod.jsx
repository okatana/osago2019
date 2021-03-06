import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Period from '../components/Period.jsx'
import { setPeriod } from '../../../../actions'

const mapStateToProps = (state, props) => {
    return {
        period: state.period,
    }
}
const mapDispatchToProps = (dispatch, props) =>
    bindActionCreators({ setPeriod }, dispatch)

const ConnectedPeriod = connect(mapStateToProps,mapDispatchToProps)(Period)
export default ConnectedPeriod
