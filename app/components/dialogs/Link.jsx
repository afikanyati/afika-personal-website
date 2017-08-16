// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

export default class Link extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("+++++Link");
    }

    render() {
        return (
            <a
                className="article-link"
                href={this.props.src}
                target="_blank">
                {this.props.text}
            </a>
        );
    }

    componentDidMount() {
        console.log("+++++Link");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }
}

// ============= PropTypes ==============

Link.propTypes = {
    text: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};
