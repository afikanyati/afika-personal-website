// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import Img              from 'react-image';

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
        console.log("-----FeedItem");
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
        console.log("+++++FeedItem");
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
        let category = this.props.item.path.split("/")[0];

        return (
            <article
                className="feed-item no-thumbnail animated fadeInUp"
                onClick={this.props.openItem.bind({}, this.props.item)}
                onTouchTap={this.props.openItem.bind({}, this.props.item)}>
                <div className={`generate-thumb ${this.state.randomColor}`}>
                    <div className="thumb-writing-wrapper">
                        <h3 className={`thumb-writing ${this.state.randomFontColor}`}>
                            {this.props.item.title}
                        </h3>
                    </div>
                    <div className="feed-overlay-info">
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
                    </div>
                </div>
            </article>
        );
    }

    /**
     * Renderer for feed item with thumbnail
     * @return React component feed item article
     */
    thumbnail = () => {
        let category = this.props.item.path.split("/")[0];

        return (
            <article
                className="feed-item animated fadeInUp"
                onClick={this.props.openItem.bind({}, this.props.item)}
                onTouchTap={this.props.openItem.bind({}, this.props.item)}>
                <div className="feed-image">
                    <Img
                        src={this.props.item.thumbnail}
                        loader={<ImagePlaceholder category={category} height={"30vw"}/>} />
                </div>
                <div className="feed-overlay">
                    <div className="feed-overlay-info">
                        <div className="feed-overlay-icon">
                            <img src ={`assets/images/icons/${category}_cream.svg`} />
                        </div>
                        <div
                            className="feed-overlay-text">
                            <h3 className="feed-overlay-title">{this.props.item.title}</h3>
                            <h4 className="feed-overlay-description">{this.props.item.category}</h4>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

// ============= PropTypes ==============

FeedItem.propTypes = {
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    openItem: PropTypes.func.isRequired
};
