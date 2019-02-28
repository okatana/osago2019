const React = require('react')
const BaseElement = require('../html/BaseElement.jsx')
const Select = require('../html/Select.jsx')
const PropTypes = require('prop-types')

class FormSelect extends BaseElement {
    constructor(props) {
        super(props);
    }

    getExcludeProps() {
        return ['labelProps', 'divlabelProps', 'formlabel'];
    }

    render() {
        return <div className="formElement" style={{overflow: "auto"}}>
            <div className="no-padding-left no-border col-lg-4">
              <label htmlFor={this.props.id} {...this.props.labelProps}>
                {this.props.formlabel}
            </label>
            </div>

            <Select {...this.sanitizeProps()}/>

        </div>

    }
}

FormSelect.propTypes = {
    assigned: PropTypes.func,
    formlabel: PropTypes.string,
    label: PropTypes.string,
    labelProps: PropTypes.object,
    divlabelProps: PropTypes.object,
//    orientation: PropTypes.string,
    enabled:PropTypes.bool,
    options: PropTypes.array,
}
FormSelect.defaultProps = {
   // wrapperProps: {},
    labelProps: {},
    divlabelProps: {},
    options: [],
}

module.exports = FormSelect;