const React = require('react')
const PropTypes = require('prop-types')

class BaseElement extends React.Component {
    constructor(props) {
        super(props);

    }
    sanitizeProps() {
        var exclude = this.getExcludeProps();
        if (exclude.length == 0)
            return this.props;
        var props0 = {};

        //этот костыль из-за IE кот. не поддерживает entries   --begin--
        if (!Object.entries)
            Object.entries = function( obj ){
                var ownProps = Object.keys( obj ),
                    i = ownProps.length,
                    resArray = new Array(i); // preallocate the Array
                while (i--)
                    resArray[i] = [ownProps[i], obj[ownProps[i]]];

                return resArray;
            };
         //   --end--

        for (let [key, value] of Object.entries(this.props)) {
            if (exclude.indexOf(key) == -1)
                props0[key] = value;
        }
        return props0;
    }
    getExcludeProps() {
//    console.log("getExcludeProps(): BaseElement-"+this.getName());
        return [];
    }


}
BaseElement.propTypes = {
  enabled: PropTypes.bool
}

BaseElement.defaultProps = {
  enabled: true

}


module.exports = BaseElement