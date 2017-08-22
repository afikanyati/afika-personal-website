// Libs
import React            from 'react';
import PropTypes        from 'prop-types';

/**
 * The NavItem component is used by the NavItems components mapping function to
 * render each indivial navigation item in the viewport. Clicking on a NavItem will
 * call the App component's toggleContent function that filters out the content category
 * in question. When this is done, the NavItem is crossed off by a cream-colored bar.
 */
export default class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----NavItem");
    }

    render() {
        return (
            <li
                className={this.props.navIsOpen ? "nav-item" : "nav-item remove"}
                onClick={this.props.toggleContent.bind({}, this.props.index)}>
    			<div
                    style={this.props.navItem.contentVisible ?
                        {
                            borderLeft: "3px solid var(--dark-purple)"
                        }
                        :
                        {
                            borderLeft: "3px solid var(--white)"
                        }}>
    				<h3 className="nav-writing">
                        {this.props.navItem.item}
                        <div
                            className={this.props.navItem.contentVisible ? "crossbar": "crossbar appear"}/>
                    </h3>
                    <h4 className="nav-verb">{this.props.navItem.verb}</h4>
    			</div>
    		</li>
        );
    }

    componentDidMount() {
        // console.log("+++++NavItem");

    }
}

// ============= PropTypes ==============

NavItem.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    navItem: PropTypes.object.isRequired,
    toggleContent: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
