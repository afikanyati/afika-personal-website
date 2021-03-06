// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import Img              from 'react-image';
import { Link }         from "react-router-dom";

// Components
import ImagePlaceholder from './ImagePlaceholder';

/**
 * FeedItem is a component housed within the Feed component. It displays all the various
 * types of content, namely: VR, Art, Music, Design, Resume, Writing in a car fashion
 * with a thumbanail, and title and category that become visible on hover.
 *
 * For content that has no thumbnail, the component generates a random thumbnail in the
 * color theme of the website (Dark Purple, Light Purple and White). The component ensures
 * that the font and backgroud of the thumbnail contrast effectively for readability
 * purposes.
 */
export default class FeedItem extends React.Component {

    state = {
        randomColor: "",        // Stores the random background color of a generated thumbnail
        randomFontColor: ""     // Stores the random font color of a generated thumbnail
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----FeedItem");
        this.generateRandomColorAndFont();
    }

    render() {
        let noThumbnail = this.props.item.thumbnail == "-1";

        if (noThumbnail) {
            return this.generateThumbnail();
        } else {
            return this.thumbnail();
        }
    }

    componentDidMount() {
        // console.log("+++++FeedItem");
    }

    // ========== Methods ===========

    /**
     * Fenerates a random thumbnail in the color theme of the
     * website (Dark Purple, Light Purple and White)
     * Ensures font and backgroud of the thumbnail contrast
     * effectively for readability purposes.
     */
    generateRandomColorAndFont = () => {
        let thumbnailColors = ["white", "light-purple", "dark-purple"];
        let randomColorIndex = Math.floor(Math.random() * thumbnailColors.length);
        let randomColor = thumbnailColors[randomColorIndex];

        let randomFontColor = "white";
        let randomFontIndex;

        if (randomColor != "light-purple") {
            thumbnailColors.splice(randomColorIndex,1);
            randomFontIndex = Math.floor(Math.random() * thumbnailColors.length);
            randomFontColor = thumbnailColors[randomFontIndex];
        }

        this.setState({
            randomColor: randomColor,
            randomFontColor: randomFontColor
        });
    }

    /**
     * Renderer for feed item with no thumbnail
     * @return React component feed item article
     */
    generateThumbnail = () => {
        let category = this.props.item.path.split("/")[1];

        return (
            <Link to={this.props.item.path.replace("content", "")}>
                <article
                    className={
                        this.props.item.category == "standalone" ?
                            "feed-item no-thumbnail animated fadeInUp standalone"
                        :
                            "feed-item no-thumbnail animated fadeInUp"}
                    onClick={this.handleItemClick}>
                    <div
                        className={
                        this.props.item.category == "standalone" ?
                            `generate-thumb ${this.state.randomColor} standalone`
                        :
                            `generate-thumb ${this.state.randomColor}`}>
                        <div className="thumb-writing-wrapper">
                            <h3
                                className={`thumb-writing ${this.state.randomFontColor}`}>
                                {this.props.item.title}
                            </h3>
                        </div>
                        <div
                            className={
                                this.props.item.category != "standalone" && this.props.item.category != "standalone resume" ?
                                    "feed-overlay-info"
                                :
                                    "remove"}>
                            <div className="feed-overlay-icon">
                                {this.state.randomColor == "dark-purple" ?
                                    <img src ={`assets/images/icons/${category}_purple.svg`} />
                                :
                                    <img src ={`assets/images/icons/${category}_cream.svg`} />
                                }
                            </div>
                            {this.state.randomColor == "dark-purple" ?
                                <div
                                    className="feed-overlay-text">
                                    <h4 className="feed-overlay-title no-thumbnail cream">{this.props.item.category}</h4>
                                </div>
                            :
                            <div
                                className={`feed-overlay-text ${this.state.randomColor}`}>
                                <h4 className="feed-overlay-title no-thumbnail">{this.props.item.category}</h4>
                            </div>
                            }
                            <div className="feed-overlay-hearts">
                                <svg
                                    onClick={this.handleHeartClick}
                                    version="1.1"
                                    id="heart-icon"
                                    x="0px"
                                    y="0px"
                                    width="50px"
                                    height="50px"
                                    viewBox="-1 0 50 50"
                                    enableBackground="new -1 0 50 50">
                                    <path id ="heart-fill" fill="#FFFFFF" d="M24,47.953l-3.627-3.302C7.489,32.968-1.017,25.263-1.017,15.806c0-7.705,6.054-13.759,13.759-13.759
                                     c4.353,0,8.531,2.026,11.258,5.229c2.727-3.202,6.905-5.229,11.258-5.229c7.705,0,13.759,6.054,13.759,13.759
                                     c0,9.456-8.506,17.162-21.39,28.87L24,47.953z"/>
                                </svg>
                                <h3 className="heart-count">{
                                        this.props.item.hearts ?
                                            this.props.item.hearts.length
                                        :
                                            "0"
                                    }</h3>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    /**
     * Renderer for feed item with thumbnail
     * @return React component feed item article
     */
    thumbnail = () => {
        let category = this.props.item.path.split("/")[1];

        return (
            <Link to={this.props.item.path.replace("content", "")}>
                <article
                    className={
                        this.props.item.category == "standalone resume" ?
                            "feed-item animated fadeInUp standalone resume"
                        :
                            this.props.item.category == "standalone" ?
                                "feed-item animated fadeInUp standalone"
                            :
                                "feed-item animated fadeInUp"}
                    onClick={this.handleItemClick}>
                    <div className="feed-image">
                        <Img
                            src={this.props.item.thumbnail}
                            loader={<ImagePlaceholder category={category} height={"30vw"}/>} />
                    </div>
                    <div
                        className={this.props.item.category != "standalone" ? "feed-overlay" : "remove"}>
                        <div className="feed-overlay-info">
                            <div className="feed-overlay-icon">
                                <img src ={`assets/images/icons/${category}_cream.svg`} />
                            </div>
                            <div
                                className="feed-overlay-text">
                                <h3 className="feed-overlay-title">{this.props.item.title}</h3>
                                <h4 className="feed-overlay-description">{this.props.item.category}</h4>
                            </div>
                            <div className="feed-overlay-hearts">
                                <svg
                                    onClick={this.handleHeartClick}
                                    version="1.1"
                                    id="heart-icon"
                                    x="0px"
                                    y="0px"
                                    width="50px"
                                    height="50px"
                                    viewBox="-1 0 50 50"
                                    enableBackground="new -1 0 50 50">
                                    <path id ="heart-fill" fill="#FFFFFF" d="M24,47.953l-3.627-3.302C7.489,32.968-1.017,25.263-1.017,15.806c0-7.705,6.054-13.759,13.759-13.759
                                     c4.353,0,8.531,2.026,11.258,5.229c2.727-3.202,6.905-5.229,11.258-5.229c7.705,0,13.759,6.054,13.759,13.759
                                     c0,9.456-8.506,17.162-21.39,28.87L24,47.953z"/>
                                </svg>
                                <h3 className="heart-count">{
                                        this.props.item.hearts ?
                                            this.props.item.hearts.length
                                        :
                                            "0"
                                    }</h3>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    /**
     * Filters out standalone content that should not have any click events
     */
    handleItemClick = (e) => {
        let targetId = e.target.id;

        if (this.props.item.category === "standalone" && this.props.item.title != "Resume Download" || targetId == "heart-fill") {
            return;
        }

        this.props.openItem(this.props.item);
        this.props.incrementor("clicks", this.props.item);
    }

    handleHeartClick = (e) => {
        let item = this.props.item;
        item['feedIndex'] = this.props.index;
        this.props.incrementor("hearts", item);

        let element = e.target;
        element.classList.add('run-heart-animation');

        setTimeout(() => {
            element.classList.remove('run-heart-animation');
        }, 1000);
    }
}

// ============= PropTypes ==============

FeedItem.propTypes = {
    item: PropTypes.object.isRequired,
    openItem: PropTypes.func.isRequired,
    incrementor: PropTypes.func.isRequired
};
