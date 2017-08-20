// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * The Loader component simply houses the animated loading icon
 * used in various places on the web application, such as in the Feed component.
 */
export default class Loader extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++Loader");
    }

    render() {

        return (
            <div
                id={this.props.id}
                className="square-split">
                <div className={`loader ${this.props.size}`}>
                    <div className="square-1"></div>
                    <div className="square-2"></div>
                    <div className="square-3"></div>
                    <div className="square-4"></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Loader");
    }
}

// ============= PropTypes ==============

Loader.propTypes = {
    size: PropTypes.string.isRequired,
    id: PropTypes.string
};
