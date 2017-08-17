// Libs
import React            from 'react';
import ReactDOM         from 'react-dom';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import ReactList        from 'react-list';

// Components
import FeedItem         from './FeedItem';
import Loader           from '../Loader';

/**
 * Feed is a component used to house the FeedItem components. It borrows from the UI
 * standard of displaying content in a card-like layout a la Pinterest. With assistance
 * from the HiddenNav component, it can filter out various different content types.
 */
export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Feed");
    }

    render() {
        if(this.props.feed.length == 0 &&
            !this.props.navItems[0]["contentVisible"] &&
            !this.props.navItems[1]["contentVisible"] &&
            !this.props.navItems[2]["contentVisible"] &&
            !this.props.navItems[3]["contentVisible"] &&
            !this.props.navItems[4]["contentVisible"] &&
            !this.props.navItems[5]["contentVisible"]) {
            return this.logoView();
        } else if (this.props.feed.length == 0) {
            return this.loadingView();
        } else {
            return this.feedView();
        }
    }

    componentDidMount() {
        console.log("+++++Feed");
        const feed = ReactDOM.findDOMNode(this.refs.feed);
        feed.addEventListener('scroll', this.scrolled);
    }

    componentWillUnmount() {
        const feed = ReactDOM.findDOMNode(this.refs.feed);
        feed.removeEventListener('scroll', this.scrolled);
    }

    // ========== Methods ===========

     /**
      * Renderer for logo view
      * Occurs when all content types are disabled
      * Displays Afika's signature Logotype
      * @return React component logotype div
      */
    logoView = () => {
        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <div
                    id="feed"
                    ref="feed"
                    className       ={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>
                    <img
                        id="afika-logo-no-feed"
                        src="assets/images/my_logos/afika_logo_white.svg" />
                </div>
            </div>
        );
    }

    /**
     * Renderer for loading view
     * Occurs when feed is empty but content types aren't disabled
     * @return React component loading animation div
     */
    loadingView = () => {
        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <div
                    id="feed"
                    ref="feed"
                    className       ={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>
                    <Loader size="large" />
                </div>
            </div>
        );
    }

    /**
     * Renderer for regular feed view
     * @return React component feed div
     */
    feedView = () => {
        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <div
                    id="feed"
                    ref="feed"
                    className       ={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>
                    <ReactList
                        itemRenderer={this.renderItem}
                        length={this.props.feed.length}
                        type='simple' />
                </div>
            </div>
        );
    }

    /**
     * Used by ReactList component to create a list of feed items.
     * @param  {int} index index of item in list
     * @param  {int} key   unique identifier of given list item
     * @return FeedItem component       React component to be rendered
     */
    renderItem = (index, key) => {
        return (
            <FeedItem
                key={key}
                item={this.props.feed[index]}
                openItem={this.props.openItem} />
        );
    }

    /**
     * Function attached to a listener connected to feed element
     * Computes amount feed has scrolled
     */
    scrolled = () => {
        let element = this.refs.feed;
        if (element) {
            let scrollTop = element.scrollTop;
            if (scrollTop < 15) {
                this.props.updateFeedScroll(element.scrollTop);
            }
        }
    }
}

// ============= PropTypes ==============

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    navIsOpen: PropTypes.bool.isRequired,
    navItems: PropTypes.array.isRequired,
    contactIsOpen: PropTypes.bool.isRequired,
    feedScroll: PropTypes.number.isRequired,
    updateFeedScroll: PropTypes.func.isRequired,
    openItem: PropTypes.func.isRequired
};
