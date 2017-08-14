// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import uuid             from 'uuid';
import ReactList        from 'react-list';

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
        if(this.props.feed.length == 0) {
            return this.loadingView();
        } else {
            return this.feed();
        }
    }

    componentDidMount() {
        console.log("+++++Feed");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

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
                <div className="square-split">
                    <div className="loader">
        				<div className="square-1"></div>
        				<div className="square-2"></div>
        				<div className="square-3"></div>
        				<div className="square-4"></div>
        			</div>
                </div>
            </div>
        );
    }

    feed = () => {

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
                    className       ={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>
                    <ReactList
                        itemRenderer={this.renderItem}
                        length={this.props.feed.length}
                        type='simple' />
                </div>
            </div>
        );
    }

    renderItem = (index, key) => {
        return (
            <FeedItem
                key={key}
                item={this.props.feed[index]} />
        );
    }

}

// ============= PropTypes ==============

Feed.propTypes = {
    feed: PropTypes.array.isRequired,
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired
};
