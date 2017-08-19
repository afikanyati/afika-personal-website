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
                    <svg
                        version="1.1"
                        id="afika-logo-no-feed"
                        x="0px"
                        y="0px"
                        viewBox="0 40 1318 650"
                        enableBackground="new 0 40 1318 650">
                        <polygon id="A" className="animated bounceInDown" fill="#EDEDED" points="4.157,340.001 151.675,40.001 284.157,340.001 210.348,340.001 119.326,134.271 18.161,339.997 "/>
                        <rect id="K" className="animated bounceInDown" x="717.157" y="40" fill="#EDEDED" width="68" height="300"/>
                        <polygon id="F" className="animated bounceInDown" fill="#EDEDED" points="339.157,40.019 339.157,340.001 407.161,340.001 407.161,53.019 539.157,53.019 539.157,40.019 "/>
                        <polygon id="A_2_" className="animated bounceInDown" fill="#EDEDED" points="964.157,340.001 1111.675,40.001 1244.157,340.001 1170.348,340.001 1079.326,134.271 978.161,339.997 "/>
                        <rect id="I_1_" className="animated bounceInUp" x="1176.157" y="381" fill="#EDEDED" width="68" height="300.001"/>
                        <polygon id="A_1_" className="animated bounceInUp" fill="#EDEDED" points="592.157,681.001 739.675,381.001 872.157,681.001 798.348,681.001 707.326,475.271 606.161,680.997 "/>
                        <rect id="purple" className="animated fadeIn" x="-3.924" y="243.969" transform="matrix(0.9915 -0.1298 0.1298 0.9915 -26.9631 87.3597)" fill="#9d7cb8" width="1320.865" height="13"/>
                        <rect id="black" className="animated fadeIn" x="545.966" y="524.521" fill="#000000" width="377.981" height="9.979"/>
                        <rect id="grey" className="animated fadeIn" x="682.471" y="270.766" transform="matrix(0.8717 0.49 -0.49 0.8717 248.371 -391.2902)" fill="#808080" width="377.98" height="15.842"/>
                        <rect id="I" className="animated bounceInDown" x="594.157" y="40.001" fill="#EDEDED" width="68.004" height="300"/>
                        <polygon id="N" className="animated bounceInUp" fill="#EDEDED" points="4.157,380.001 3.655,681.032 16.655,681.032 16.655,478.853 264.161,680.032 263.659,381.001 250.659,381.001 250.659,581.23 "/>
                        <polygon id="Y" className="animated bounceInUp" fill="#EDEDED" points="283.604,381.001 391.259,381.001 500.855,470.47 610.167,381.001 630.721,381.001 511.156,478.846 511.156,681.001 443.156,681.001 443.156,511.178 "/>
                        <polygon id="T" className="animated bounceInUp" fill="#EDEDED" points="886.654,381.001 886.654,394.001 953.156,394.001 953.156,681.001 1021.156,681.001 1021.156,394.001 1086.654,394.001 1086.654,381.001 "/>
                    </svg>
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
