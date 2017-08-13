// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';
// Files

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Feed");
    }

    render() {
        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <div className={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>

                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Feed");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

Feed.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired
};
