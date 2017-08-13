// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';
// Files

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Feed");
    }

    render() {
        return (
            <div className={
                    this.props.contactIsOpen ?
                        "feed-wrapper contact-open"
                    :
                        this.props.navIsOpen ?
                            "feed-wrapper"
                            :
                            "feed-wrapper padded"}>
                <div className={this.props.navIsOpen ? "feed-box" : "feed-box enlarge"}>
                    <article className="feed-item">
                        <div className="feed-image">
                            <img src="https://firebasestorage.googleapis.com/v0/b/afika-nyati-website.appspot.com/o/vr%2Flife%2Fafika_front.png?alt=media&token=32909dcb-a2ef-44e9-9f90-ab92eb1fb905" />
                        </div>
                        <div className="feed-overlay">
                            <div className="feed-overlay-info">
                                <div className="feed-overlay-icon">
                                    <img src ="assets/images/icons/vr_cream.svg" />
                                </div>
                                <div className="feed-overlay-text">
                                    <h3 className="feed-overlay-title">Life</h3>
                                    <h4 className="feed-overlay-description">VR Short Film</h4>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Feed");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

Feed.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    contactIsOpen: PropTypes.bool.isRequired
};
