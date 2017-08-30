// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * Code is a component used inline within article strings to transform sections of
 * article text that should be stylized with a monospace typeface, used to
 * represent the aesthetic of typical programmng IDES. It is parsed with assistance
 * from the JsxParser library.
 */
export default class Code extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++Code");
    }

    render() {
        return (
            <span className="code">
                {this.props.text}
            </span>
        );
    }

    componentDidMount() {
        console.log("+++++Code");
    }
}

// ============= PropTypes ==============

Code.propTypes = {
    text: PropTypes.string.isRequired
};
