// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class ArrowButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++ArrowButton");
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
                className="arrow-button"
                style={{
                    position: this.props.position,
                    top: this.props.top,
                    bottom: this.props.bottom,
                    left: this.props.left,
                    right: this.props.right,
                    transform: transform
                }}>
                {this.props.direction == "left" ?
                    <svg
                        version="1.1"
                        id="left-arrow"
                        x="0px"
                        y="0px"
                        width="50px"
                        height="50px"
                        viewBox="0 0 50 50"
                        enableBackground="new 0 0 50 50">
                        <path fill="#dededd" d="M39.421,44.077L20.358,24.973L39.421,5.869L33.552,0L8.579,24.973l24.973,24.973L39.421,44.077z"/>
                    </svg>
                :
                    <svg
                        version="1.1"
                        id="right-arrow"
                        x="0px"
                        y="0px"
                        width="50px"
                        height="50px"
                        viewBox="0 0 50 50"
                        enableBackground="new 0 0 50 50">
                        <path fill="#dededd" d="M8.579,44.077l19.063-19.104L8.579,5.869L14.448,0l24.973,24.973L14.448,49.946L8.579,44.077z"/>
                    </svg>
                }
            </button>
        );
    }

    componentDidMount() {
        console.log("+++++ArrowButton");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

ArrowButton.propTypes = {
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
    horCenter: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired
};
