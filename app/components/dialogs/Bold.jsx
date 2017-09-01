// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * Bold is a component used inline within article strings to transform sections of
 * article text that should be bolded. It parsed with assistance from
 * the JsxParser library.
 */
export default class Bold extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("+++++Bold");
    }

    render() {
        return (
            <span className="article-bold">
                {this.props.text}
            </span>
        );
    }

    componentDidMount() {
        // console.log("+++++Bold");
    }
}

// ============= PropTypes ==============

Bold.propTypes = {
    text: PropTypes.string.isRequired
};
