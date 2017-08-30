// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';

// Components
import NavItems       from './NavItems';

/**
 * HiddenNav is a component used to display the various types of content on the web
 * application. The application is single-page, so clicking a navigation item does not
 * direct a user to a new page. Instead, it FILTERS OUT the selected type of content,
 * leaving all the rest to be rendered within the Feed component. It can be summoned
 * in and out of the left of the viewport by toggling the HamburgerIcon component.
 */
export default class HiddenNav extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----HiddenNav");
    }

    render() {
        return (
            <nav
                id="hiddenNav"
                className={
                    this.props.contactIsOpen ?
                        "navigation contact-open"
                    :
                        this.props.navIsOpen ?
                            "navigation"
                        :
                            "navigation closed"}>
                <img id="afika-logo-nav" src="assets/images/my_logos/afika_logo_gray.svg"/>
                <NavItems
                    navIsOpen={this.props.navIsOpen}
                    navItems={this.props.navItems}
                    toggleContent={this.props.toggleContent} />
            </nav>
        );
    }

    componentDidMount() {
        console.log("+++++HiddenNav");
    }
}

// ============= PropTypes ==============

HiddenNav.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    navItems: PropTypes.array.isRequired,
    toggleContent: PropTypes.func.isRequired

};
