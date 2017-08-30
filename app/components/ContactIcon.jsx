// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import PropTypes                    from 'prop-types';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

/**
 * ContactIcon is an icon that sits in the bottom left corner of the viewport.
 * It is an interface into the ContactView component from the regular web app
 * interface.
 */
export default class ContactIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ContactIcon");
    }

    render() {
        const contactTooltip = (
            <Tooltip
                className="tooltip">
                Send me a message!
            </Tooltip>
        );

        return (
            <div
                className={
                    this.props.navIsOpen ?
                        this.props.contactIsOpen || this.props.feedScroll == 0 ?
                            "contact-icon-wrapper contact-open"
                        :
                            "contact-icon-wrapper"
                    :
                        "contact-icon-wrapper remove"}>
                <OverlayTrigger
                        placement   ="left"
                        overlay     ={contactTooltip}>
                    <svg
                        onClick={this.props.toggleContact}
                        version="1.1"
                        id="contact-icon"
                        x="0px"
                        y="0px"
                    	width="50px"
                        height="50px"
                        viewBox="0 0 50 50"
                        enableBackground="new 0 0 50 50">
                        <path fill="#FFFFFF" d="M44.999,0H5.001c-2.75,0-5,2.25-5,5v44.998l10-10h34.998c2.75,0,5-2.25,5-5V5C49.999,2.25,47.749,0,44.999,0
                        	z M44.999,34.998H10.001l-5,5V5h39.998V34.998z"/>
                    </svg>
                </OverlayTrigger>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ContactIcon");
    }
}

// ============= PropTypes ==============

ContactIcon.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    toggleContact: PropTypes.func.isRequired,
    feedScroll: PropTypes.number.isRequired
};
