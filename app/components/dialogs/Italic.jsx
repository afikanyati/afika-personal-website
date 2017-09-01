// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * Italic is a component used inline within article strings to transform sections of
 * article text that should be italicized. It is parsed with assistance from
 * the JsxParser library.
 */
export default class Italic extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("+++++Italic");
    }

    render() {
        return (
            <span className="article-italic">
                {this.props.text}
            </span>
        );
    }

    componentDidMount() {
        // console.log("+++++Italic");
    }
}

// ============= PropTypes ==============

Italic.propTypes = {
    text: PropTypes.string.isRequired
};
