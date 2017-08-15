// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import Img              from 'react-image';

// Files
import Block            from '../Block';
import ImagePlaceholder from './ImagePlaceholder';

export default class FeedItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----FeedItem");
    }

    render() {
        let noThumbnail = this.props.item.thumbnail == "-1";

        if (noThumbnail) {
            return this.generateThumbnail();
        } else {
            return this.thumbnail();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.feedScroll == 0;
    }

    generateThumbnail = () => {
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

        let category = this.props.item.path.split("/")[0];

        return (
            <article className="feed-item no-thumbnail">
                <div className={`generate-thumb ${randomColor}`}>
                    <div className="thumb-writing-wrapper">
                        <h3 className={`thumb-writing ${randomFontColor}`}>
                            {this.props.item.title}
                        </h3>
                    </div>
                    <div className="feed-overlay-info">
                        <div className="feed-overlay-icon">
                            {randomColor == "dark-purple" ?
                                <img src ={`assets/images/icons/${category}_purple.svg`} />
                            :
                                <img src ={`assets/images/icons/${category}_cream.svg`} />
                            }
                        </div>
                        {randomColor == "dark-purple" ?
                            <div
                                className="feed-overlay-text">
                                <h4 className="feed-overlay-title no-thumbnail cream">{this.props.item.category}</h4>
                            </div>
                        :
                        <div
                            className={`feed-overlay-text ${randomColor}`}>
                            <h4 className="feed-overlay-title no-thumbnail">{this.props.item.category}</h4>
                        </div>
                        }
                    </div>
                </div>
            </article>
        );
    }

    thumbnail = () => {
        let category = this.props.item.path.split("/")[0];

        return (
            <article
                className="feed-item"
                onClick={this.props.openItem.bind({}, this.props.item)}>
                <div className="feed-image">
                    <Img
                        src={this.props.item.thumbnail}
                        loader={<ImagePlaceholder category={category}/>} />
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

    componentDidMount() {
        console.log("+++++FeedItem");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

}

// ============= PropTypes ==============

FeedItem.propTypes = {
    item: PropTypes.object.isRequired
};