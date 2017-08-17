// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * The Block component is a convenient component used to specify a Block
 * of defined dimensions, color, and position in the Viewport.
 * It is used by various othe components in the web application including, but
 * not limited to ArticleAsset, ArticleDialog, DesignDialog, MusicDialog and VideoDialog.
 */
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
                    display: this.props.display,
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
}

// ============= PropTypes ==============

Block.propTypes = {
    position: PropTypes.string.isRequired,
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
    vertCenter: PropTypes.bool,
    horCenter: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    color: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
};
