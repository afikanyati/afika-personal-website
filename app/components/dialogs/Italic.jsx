// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class Italic extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++Italic");
    }

    render() {
        return (
            <span className="article-italic">
                {this.props.text}
            </span>
        );
    }

    componentDidMount() {
        console.log("+++++Italic");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

Italic.propTypes = {
    text: PropTypes.string.isRequired
};
