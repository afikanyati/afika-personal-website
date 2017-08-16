// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';

// Files

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

    componentWillReceiveProps(nextProps) {
        //pass
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
