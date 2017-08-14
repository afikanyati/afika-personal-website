// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import Masonry          from 'react-masonry-component';

// Files
import FeedItem         from './FeedItem';

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Feed");
    }

    render() {
        let masonryOptions = {
            transitionDuration: 0
        };

        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <Masonry
                className       ={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}
                elementType={'div'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                    {this.props.feed.map(item => {
                        return (
                            <FeedItem
                                item={item} />
                        );
                    })}
                </Masonry>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Feed");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

}

// ============= PropTypes ==============

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired
};
