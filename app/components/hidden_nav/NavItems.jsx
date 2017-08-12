import React            from 'react';
import NavItem          from './NavItem';
import PropTypes        from 'prop-types';

export default class NavItems extends React.Component {

    state = {
        navigationWidth: 500
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

    componentWillReceiveProps(nextProps) {
        //pass
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.adjustNavWidth);
    }

    // ========== Methods ===========
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
