// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class CloseButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++CloseButton");
    }

    render() {

        return (
            <button
                onClick={this.props.onClick}
                className="close-button"
                style={{
                    top: this.props.top,
                    bottom: this.props.bottom,
                    left: this.props.left,
                    right: this.props.right,
                    transform: this.props.transform
                }}>
                Close
            </button>
        );
    }

    componentDidMount() {
        console.log("+++++CloseButton");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

CloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    top: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
    ]),
    bottom: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
    ]),
    left: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
    ]),
    right: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
    ]),
    transform: PropTypes.string
};
