// Libs
import React            from 'react';
import PropTypes        from 'prop-types';

// Components
import NavItem          from './NavItem';

/**
 * The NavItems component is used by the HiddenNav component as a intermediary
 * component that maps a list of navigation items into a list of NavItem components
 * to be rendered.
 */
export default class NavItems extends React.Component {

    state = {
        navigationWidth: 500    // Stores the width of the HiddenNav proportionate nav-locker
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----NavItems");
    }

    render() {
        return (
            <ul
                className="nav-locker"
                style={{
                    width: this.state.navigationWidth - 40 // 40px = Left Margin
                }}
                >
                {this.props.navItems.map((item,index) => {
                    return (
                        <NavItem
                            key={item.id}
                            navItem={item}
                            index={index}
                            toggleContent={this.props.toggleContent}
                            navIsOpen={this.props.navIsOpen}
                         />
                    );
                })}

            </ul>
        );
    }

    componentDidMount() {
        console.log("+++++NavItems");
        window.addEventListener("resize", this.adjustNavWidth);

        let navigationWidth = document.getElementById('hiddenNav').clientWidth;
        this.setState({
            navigationWidth : navigationWidth
        });

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.adjustNavWidth);
    }

    // ========== Methods ===========

    /**
     * Fetches with of hidden navigation element and stores
     * in state to be used by navigation items style
     */
    adjustNavWidth = () => {
        let navigationWidth = document.getElementById('hiddenNav').clientWidth;
        this.setState({
            navigationWidth : navigationWidth
        });
    }
}

// ============= PropTypes ==============

NavItems.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    navItems: PropTypes.array.isRequired,
    toggleContent: PropTypes.func.isRequired
};
