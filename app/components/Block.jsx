// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class Block extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Block");
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
            <div
                style={{
                    position: this.props.position,
                    top: this.props.top,
                    left: this.props.left,
                    transform: transform,
                    width: this.props.width,
                    height: this.props.height,
                    backgroundColor: this.props.color
                }}/>
        );
    }

    componentDidMount() {
        console.log("+++++Block");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

}

// ============= PropTypes ==============

Block.propTypes = {
    position: PropTypes.string.isRequired,
    top: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    left: PropTypes.number.isRequired,
    vertCenter: PropTypes.bool.isRequired,
    horCenter: PropTypes.bool.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    color: PropTypes.string.isRequired
};
