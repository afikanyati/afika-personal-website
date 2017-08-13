// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';
// Files

export default class ContactIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ContactIcon");
    }

    render() {
        return (
            <div
                className={this.props.navIsOpen ? "contact-icon-wrapper" : "contact-icon-wrapper remove"}>
                <svg
                    onClick={this.props.toggleContact}
                    version="1.1"
                    id="contact-icon"
                    x="0px"
                    y="0px"
                	width="50px"
                    height="50px"
                    viewBox="0 0 50 50"
                    enable-background="new 0 0 50 50">
                    <path fill="#FFFFFF" d="M44.999,0H5.001c-2.75,0-5,2.25-5,5v44.998l10-10h34.998c2.75,0,5-2.25,5-5V5C49.999,2.25,47.749,0,44.999,0
                    	z M44.999,34.998H10.001l-5,5V5h39.998V34.998z"/>
                </svg>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ContactIcon");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

ContactIcon.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    toggleContact: PropTypes.func.isRequired
};
