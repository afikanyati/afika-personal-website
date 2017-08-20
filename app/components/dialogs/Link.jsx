// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * Link is a component used inline within article strings to render parts of an article
 * as a link with a src reference to another webpage.It makes use a '_blank' target <a> attribute
 * opening the page in a new tab. They are parsed with assistance from the JsxParser library.
 */
export default class Link extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("+++++Link");
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
        // console.log("+++++Link");
    }
}

// ============= PropTypes ==============

Link.propTypes = {
    text: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};
