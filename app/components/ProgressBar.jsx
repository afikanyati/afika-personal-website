// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++ProgressBar");
    }

    render() {

        let progressPercent = this.props.scrollTop/this.props.scrollHeight * 100
        let progressWidth = progressPercent.toString() + "%";

        return (
            <div
                onClick={this.props.onClick}
                className="content-progress-bar"
                style={{
                    top: this.props.top,
                    bottom: this.props.bottom,
                    left: this.props.left,
                    right: this.props.right,
                    transform: this.props.transform,
                    width: this.props.width
                }}>
                <div className="progress-block"
                    style={{
                        width: progressWidth
                    }} />
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ProgressBar");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

ProgressBar.propTypes = {
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
    transform: PropTypes.string,
    width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
    ]),
    scrollHeight: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired
};
