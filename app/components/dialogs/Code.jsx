// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

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

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

Code.propTypes = {
    text: PropTypes.string.isRequired
};
