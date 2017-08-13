// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';

// Files
import NavItems       from './NavItems';


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
                <img id="afika-logo" src="assets/images/my_logos/afika_logo_gray.svg"/>
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

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

HiddenNav.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    navItems: PropTypes.array.isRequired,
    toggleContent: PropTypes.func.isRequired

};
