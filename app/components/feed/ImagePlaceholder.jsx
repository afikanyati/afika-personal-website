// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

/**
 * The ImagePlaceholder component is used by Img components (third-party React component)
 * that displays a generic thumbnail in place of an image that is still laoding.
 * Centered in the placeholder is an icon representing the type of content that is loading,
 * namely: VR, Art, Music, Design, Resume, or Writing.
 */
export default class ImagePlaceholder extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ImagePlaceholder");
    }

    render() {

        return (
            <div
                className="img-placeholder"
                style={{
                    height: this.props.height
                }}>
                <img src ={`assets/images/icons/${this.props.category}_gray.svg`} />
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ImagePlaceholder");
    }
}

// ============= PropTypes ==============

ImagePlaceholder.propTypes = {
    category: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
    ])
};
