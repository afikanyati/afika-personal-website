// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import JsxParser        from 'react-jsx-parser';
import YouTube          from 'react-youtube';
import Img              from 'react-image';

// Components
import DesignAssetTypes         from '../../constants/designAssetTypes.js';
import Italic                   from './Italic';
import Bold                     from './Bold';
import Link                     from './Link';
import Code                     from './Code';
import ImagePlaceholder         from '../feed/ImagePlaceholder';
import Block                    from '../Block';

/**
 * The DesignAsset is a multi-purpose asset used by DesignDialog component to display
 * the various types of article assets used in an article, namely:
 *  - Paragraph asset: A paragraph of text
 *  - Heading asset: A heading within the entry
 *  - Image asset: An embeded full-width image
 *  - Double Image asset: A couplet consisting of two images
 *  - Video asset: An embedded full-width video
 *  - Double Video asset: A couplet consisting of two videos
 *  - Image Video asset: A couplet consisting of an image to the left and a video to the right
 *  - Video Image asset: A couplet consisting of an video to the left and a image to the right
 *  - Right Image Block Asset: A text and image/video couple with the image/video on the right
 *  - Left Image Block Asset: A text and image/video couple with the image/video on the left
 *  - Quote asset: Text in a stylized quote layout
 *  - Dictionary asset: A dictionary definition (with sub-definitions) in a stylized layout
 */
export default class DesignAsset extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----DesignAsset");
    }

    render() {
        if (this.props.asset.type == DesignAssetTypes.HEADING) {
            return this.headingAsset();
        } else if (this.props.asset.type == DesignAssetTypes.PARAGRAPH) {
            return this.paragraphAsset();
        } else if (this.props.asset.type == DesignAssetTypes.VIDEO) {
            return this.videoAsset();
        } else if (this.props.asset.type == DesignAssetTypes.IMAGE) {
            return this.imageAsset();
        } else if (this.props.asset.type == DesignAssetTypes.LEFT_BLOCK) {
            return this.leftBlockAsset();
        } else if (this.props.asset.type == DesignAssetTypes.RIGHT_BLOCK) {
            return this.rightBlockAsset();
        } else if (this.props.asset.type == DesignAssetTypes.DOUBLE_IMAGE) {
            return this.doubleImageAsset();
        } else if (this.props.asset.type == DesignAssetTypes.DOUBLE_VIDEO) {
            return this.doubleVideoAsset();
        } else if (this.props.asset.type == DesignAssetTypes.IMAGE_VIDEO) {
            return this.imageVideoAsset();
        } else if (this.props.asset.type == DesignAssetTypes.VIDEO_IMAGE) {
            return this.VideoImageAsset();
        } else if (this.props.asset.type == DesignAssetTypes.QUOTE) {
            return this.quoteAsset();
        } else if (this.props.asset.type == DesignAssetTypes.DICTIONARY) {
            return this.dictionaryAsset();
        } else {
            // should not reach this point
            return (
                <div></div>
            );
        }
    }

    componentDidMount() {
        // console.log("+++++DesignAsset");
    }

    // ========== Methods ===========

    /**
     * Renderer for heading asset
     * @return React component heading asset div
     */
    headingAsset = () => {
        return (
            <h2 className="heading-asset">
                {this.props.asset.asset.data}
            </h2>
        );
    }

    /**
     * Renderer for paragraph asset
     * @return React component paragraph asset div
     */
    paragraphAsset = () => {
        return (
            <div className="design-block-text">
                <JsxParser
                    bindings={{}}
                    components={{Italic, Link, Bold, Code}}
                    jsx={this.props.asset.asset.data}/>
            </div>
        );
    }

    /**
     * Renderer for video asset
     * @return React component video asset div
     */
    videoAsset = () => {
        return (
            <div
                className="design-video-asset">
                <video className="design-video" autoPlay loop>
                     <source src={this.props.asset.asset.data} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <h3 className="design-video-caption">
                    {this.props.asset.asset.caption}
                </h3>
            </div>
        );
    }

    /**
     * Renderer for image asset
     * @return React component image asset div
     */
    imageAsset = () => {
        return (
            <div className="design-image-asset">
                <Img
                    src={this.props.asset.asset.data}
                    loader={<ImagePlaceholder category={this.props.asset.type} height={"30vw"}/>} />
                <h3 className="design-image-caption">
                    {this.props.asset.asset.caption}
                </h3>
            </div>
        );
    }

    /**
     * Renderer for double image asset
     * @return React component double image asset div
     */
    doubleImageAsset = () => {
        return (
            <div className="design-block-double">
                <div className="block-image">
                    <Img
                        src={this.props.asset.asset.image_1}
                        loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                    <h3 className="design-image-caption">
                        {this.props.asset.asset.caption_1}
                    </h3>
                </div>
                <div className="block-image">
                    <Img
                        src={this.props.asset.asset.image_2}
                        loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                    <h3 className="design-image-caption">
                        {this.props.asset.asset.caption_2}
                    </h3>
                </div>
            </div>
        );
    }

    /**
     * Renderer for double video asset
     * @return React component double video asset div
     */
    doubleVideoAsset = () => {
        return (
            <div className="design-block-double">
                <div className="block-video">
                    <video autoPlay loop>
                         <source src={this.props.asset.asset.video_1} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <h3 className="design-video-caption">
                        {this.props.asset.asset.caption_1}
                    </h3>
                </div>
                <div className="block-video">
                    <video autoPlay loop>
                         <source src={this.props.asset.asset.video_2} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <h3 className="design-video-caption">
                        {this.props.asset.asset.caption_2}
                    </h3>
                </div>
            </div>
        );
    }

    /**
     * Renderer for video image asset
     * @return React component video image asset div
     */
    videoImageAsset = () => {
        return (
            <div className="design-block-double">
                <div className="block-video">
                    <video autoPlay loop>
                         <source src={this.props.asset.asset.video} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <h3 className="design-video-caption">
                        {this.props.asset.asset.video_caption}
                    </h3>
                </div>
                <div className="block-image">
                    <Img
                        src={this.props.asset.asset.image}
                        loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                        <h3 className="design-image-caption">
                            {this.props.asset.asset.image_caption}
                        </h3>
                </div>
            </div>
        );
    }

    /**
     * Renderer for image video asset
     * @return React component image video asset div
     */
    imageVideoAsset = () => {
        return (
            <div className="design-block-double">
                <div className="block-image">
                    <Img
                        src={this.props.asset.asset.image}
                        loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                    <h3 className="design-image-caption">
                        {this.props.asset.asset.image_caption}
                    </h3>
                </div>
                <div className="block-video">
                    <video autoPlay loop>
                         <source src={this.props.asset.asset.video} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <h3 className="design-video-caption">
                        {this.props.asset.asset.video_caption}
                    </h3>
                </div>
            </div>
        );
    }

    /**
     * Renderer for left block asset
     * @return React component left block asset div
     */
    leftBlockAsset = () => {
         let isImage = this.props.asset.asset.hasOwnProperty("image");
        return (
            <div className="design-block">
                {isImage ?
                    <div className="block-image">
                        <Img
                            src={this.props.asset.asset.image}
                            loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                        <h3 className="design-image-caption">
                            {this.props.asset.asset.image_caption}
                        </h3>
                    </div>
                :
                    <div className="block-video">
                        <video autoPlay loop>
                             <source src={this.props.asset.asset.video} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        <h3 className="design-video-caption">
                            {this.props.asset.asset.video_caption}
                        </h3>
                    </div>
                }

                <div
                    className="block-description"
                    style={
                        window.innerWidth > 630 ?
                            {paddingLeft: 40}
                        :
                            null}>
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.text}/>
                </div>
            </div>
        );
    }

    /**
     * Renderer for right block asset
     * @return React component right block asset div
     */
    rightBlockAsset = () => {
        let isImage = this.props.asset.asset.hasOwnProperty("image");
        return (
            <div className="design-block right">
                <div
                    className="block-description"
                    style={
                        window.innerWidth > 630 ?
                            {paddingRight: 40}
                        :
                            null}>
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.text}/>
                </div>
                {isImage ?
                    <div className="block-image">
                        <Img
                            src={this.props.asset.asset.image}
                            loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                        <h3 className="design-image-caption">
                            {this.props.asset.asset.image_caption}
                        </h3>
                    </div>
                :
                    <div className="block-video">
                        <video autoPlay loop>
                             <source src={this.props.asset.asset.video} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        <h3 className="design-video-caption">
                            {this.props.asset.asset.video_caption}
                        </h3>
                    </div>
                }
            </div>
        );
    }

    /**
     * Renderer for quote asset
     * @return React component quote asset div
     */
    quoteAsset = () => {
        return (
            <div className="quote-asset">
                <Block
                    position={"absolute"}
                    display={"block"}
                    top={"50%"}
                    bottom={"auto"}
                    left={0}
                    right={"auto"}
                    vertCenter={true}
                    horCenter={false}
                    width={3}
                    height={"100%"}
                    color={"#989898"}/>
                <div className="quote">
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.data}/>
                </div>
                <h3 className="reference">
                    {this.props.asset.asset.reference}
                </h3>
            </div>
        );
    }

    /**
     * Renderer for dictionary asset
     * @return React component dictionary asset div
     */
    dictionaryAsset = () => {
        // Create string for dictionary definition
        // composed of numbered sub-definitions

        let definitionString = "";

        // Run loop for distinct definitions
        for (let i in this.props.asset.asset.definitions) {
            // Distinct definition is an array when it has sub-definitions
            if (Array.isArray(this.props.asset.asset.definitions[i])) {
                // Run loop for sub-definitions
                for (let j in this.props.asset.asset.definitions[i]) {
                    let definitionNum = `${parseInt(i)+1}.${parseInt(j)+1}.`;
                    definitionString += `<Bold text={"${definitionNum}"} /> `;
                    definitionString += this.props.asset.asset.definitions[i][j];
                    definitionString += " ";
                }
            } else {
                // Definition has no sub-definitions
                let definitionNum = `${parseInt(i)+1}.`;
                definitionString += `<Bold text={"${definitionNum}"} /> `;
                definitionString += this.props.asset.asset.definitions[i];
                definitionString += " ";
            }
        }

        // Remove trailing space
        definitionString = definitionString.substring(0, definitionString.length - 1);
        let entireDef = `<Bold text={"${this.props.asset.asset.term}"} /> <Italic text={"${this.props.asset.asset.phonetic}"} /> ${definitionString}`;

        return (
            <div className="dictionary-asset">
                <Block
                    position={"absolute"}
                    display={"block"}
                    top={"50%"}
                    bottom={"auto"}
                    left={0}
                    right={"auto"}
                    vertCenter={true}
                    horCenter={false}
                    width={3}
                    height={"100%"}
                    color={"#989898"}/>
                <p className="dic-definition">
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={entireDef}/>
                </p>
            </div>
        );
    }
}

// ============= PropTypes ==============

DesignAsset.propTypes = {
    key: PropTypes.string.isRequired,
    asset: PropTypes.object.isRequired
};
