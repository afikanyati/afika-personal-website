import React  from 'react';

export default class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----NavItem");
    }

    render() {


        return (
            <li
                className="nav-item"
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
                            className={this.props.navItem.contentVisible ? "crossbar": "crossbar show"}/>
                    </h3>
                    <h4 className="nav-verb">{this.props.navItem.verb}</h4>
    			</div>
    		</li>
        );
    }

    componentDidMount() {
        console.log("+++++NavItem");

    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

NavItem.propTypes = {
    navItem: React.PropTypes.object.isRequired,
    toggleContent: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
};
