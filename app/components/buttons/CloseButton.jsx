// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * The close button is a button that is primarily used within the Dialog components
 * as a component that initiates the Dialog's closure upon click. It appears
 * as a purple text written 'Close' at the top right corner of each Dialog.
 */
export default class CloseButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++CloseButton");
    }

    render() {
        let transform = "none";
        if (this.props.vertCenter && this.props.horCenter) {
            transform = "translate(-50%, -50%)";
        } else if (this.props.vertCenter) {
            transform = "translateY(-50%)";
        } else if (this.props.horCenter) {
            transform = "translateX(-50%)";
        }

        return (
            <button
                onClick={this.props.onClick}
                onTouchTap={this.props.onClick}
                className="close-button"
                style={{
                    position: this.props.position,
                    top: this.props.top,
                    bottom: this.props.bottom,
                    left: this.props.left,
                    right: this.props.right,
                    transform: transform
                }}>
                Close
            </button>
        );
    }

    componentDidMount() {
        console.log("+++++CloseButton");
    }
}

// ============= PropTypes ==============

CloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    position: PropTypes.string.isRequired,
    top: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
    ]),
    bottom: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
    ]),
    left: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
    ]),
    right: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
    ]),
    vertCenter: PropTypes.bool.isRequired,
    horCenter: PropTypes.bool.isRequired
};
