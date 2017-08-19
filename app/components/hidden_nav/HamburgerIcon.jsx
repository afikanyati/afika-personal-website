// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * The HamburgerIcon is a button which opens the HiddenNav panel on the left of the interface.
 * The icon is visually located on the far right of App.jsx, and appears as 3 parallel
 * horizontal line segments.
 */
export default class HamburgerIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++HamburgerIcon");
    }

    render() {
        return (
            <div>
                <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={this.props.navIsOpen} />
            	<label
                    className={
                        this.props.contactIsOpen ?
                            "nav-trigger-icon contact-open"
                        :
                            this.props.navIsOpen ?
                                "nav-trigger-icon is-active"
                            :
                                "nav-trigger-icon"}
                    htmlFor="nav-trigger">
            		<button
                        onClick={this.props.toggleNav}
                        className={this.props.navIsOpen ? "hamburger is-active" : "hamburger"}>
            			<span> </span>
            		</button>
            	</label>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++HamburgerIcon");
    }
}

// ============= PropTypes ==============

HamburgerIcon.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
};
