// Libs
import React                        from 'react';
import firebase                     from 'firebase';
import PropTypes                    from 'prop-types';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

/**
 * The scroll button is a button that is housed within the App component (bottom right) as appears
 * when the Feed component has been scrolled down upon. By pressing this button,
 * the scroll position of the Feed component returns to 0. It is a light purple square
 * with a white triangle within it.
 */
export default class ScrollButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("+++++ScrollButton");
    }

    render() {
        const scrollTooltip = (
            <Tooltip
                className="tooltip">
                Back to Top
            </Tooltip>
        );

        return (
            <div className={this.props.contactIsOpen || this.props.feedScroll == 0 ? "remove" : "show" }>
                <OverlayTrigger
                        placement   ="left"
                        overlay     ={scrollTooltip}>
                    <div
                        className="scroll-button"
                        onClick={this.scrollTo.bind({}, this.props.elementID, 0, 500)}>
                        <svg
                            version="1.1"
                            id="scroll-button-icon"
                            x="0px"
                            y="0px"
                            width="50px"
                            height="50px"
                            viewBox="0 0 50 50"
                            enableBackground="new -1 0 50 50">
                            <path fill="#FFFFFF" d="M13.6,30.2L24,19.8l10.4,10.4H13.6z"/>
                        </svg>
                    </div>
                </OverlayTrigger>
            </div>
        );
    }

    componentDidMount() {
        // console.log("+++++ScrollButton");
    }

    // ========== Methods ===========

    /**
     * Animates element with 'elementID' id from current
     * position to the 'to' positon in 'duration' seconds
     * @param  {str} elementID HTML element ID of element to be scrolled
     * @param  {int} to        y-value of element that must be at the top
     * @param  {int} duration  time (in seconds) animation must take
     */
    scrollTo = (elementID, to, duration) => {
        let element = document.getElementById(elementID);

        if (duration <= 0) {
            return;
        }

        let difference = to - element.scrollTop;
        let perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;

            if (element.scrollTop === to) {
                return;
            }
            this.scrollTo(elementID, to, duration - 10);
        }, 10);
    }
}

// ============= PropTypes ==============

ScrollButton.propTypes = {
    elementID: PropTypes.string.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    feedScroll: PropTypes.number.isRequired
};
