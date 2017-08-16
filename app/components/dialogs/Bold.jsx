// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class Bold extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++Bold");
    }

    render() {
        return (
            <span className="article-bold">
                {this.props.text}
            </span>
        );
    }

    componentDidMount() {
        console.log("+++++Bold");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

Bold.propTypes = {
    text: PropTypes.string.isRequired
};
