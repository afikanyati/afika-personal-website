// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import JsxParser        from 'react-jsx-parser';
import YouTube          from 'react-youtube';
import Vimeo            from 'react-vimeo';
import Img              from 'react-image';
import uuid             from 'uuid';

// Components
import ArticleAssetTypes        from '../../constants/articleAssetTypes.js';
import Italic                   from './Italic';
import Bold                     from './Bold';
import Link                     from './Link';
import Code                     from './Code';
import ImagePlaceholder         from '../feed/ImagePlaceholder';
import Block                    from '../Block';

/**
 * The ArticleAsset is a multi-purpose asset used by ArticleDialog component to display
 * the various types of article assets used in an article, namely:
 *  - Paragraph asset: A paragraph of text
 *  - Heading asset: A heading within the article
 *  - YouTube asset: An embeded YouTube video
 *  - Vimeo asset: An embeded Vimeo video
 *  - Image asset: An embeded image
 *  - Quote asset: Text in a stylized quote layout
 *  - Dictionary asset: A dictionary definition (with sub-definitions) in a stylized layout
 *  - List asset: A numbered or bulleted list of text
 *  - Slider asset: An image slider for Powerpoint-style presentations, etc.
 *  - Section Divider asset: A divider used at the end of a group of related paragraphs
 */
export default class ArticleAsset extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----ArticleAsset");
    }

    render() {
        if(this.props.asset.type == ArticleAssetTypes.PARAGRAPH) {
            return this.paragraphAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.HEADING) {
            return this.headingAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.YOUTUBE) {
            return this.youtubeAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.VIMEO) {
            return this.vimeoAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.IMAGE) {
            return this.imageAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.QUOTE) {
            return this.quoteAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.DICTIONARY) {
            return this.dictionaryAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.LIST) {
            return this.listAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.SLIDER) {
            return this.sliderAsset();
        } else if (this.props.asset.type == ArticleAssetTypes.SECTION_DIVIDER) {
            return this.sectionDividerAsset();
        } else {
            // should not reach this point
            return (
                <div></div>
            );
        }
    }

    componentDidMount() {
        // console.log("+++++ArticleAsset");
    }

    // ========== Methods ===========

    /**
     * Renderer for paragraph asset
     * @return React component paragraph asset div
     */
    paragraphAsset = () => {
        return (
            <div className="paragraph-asset">
                <JsxParser
                    bindings={{}}
                    components={{Italic, Link, Bold, Code}}
                    jsx={this.props.asset.asset.data}/>
            </div>
        );
    }

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
     * Renderer for YouTube asset
     * @return React component YouTube asset div
     */
    youtubeAsset = () => {
        return (
            <div className={`youtube-asset ${this.props.asset.asset.layout}`}>
                <YouTube
                    videoId={this.props.asset.asset.data}
                    className="youtube-video"
                />
                <h3 className="youtube-caption">
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.caption}/>
                </h3>
            </div>

        );
    }

    /**
     * Renderer for Vimeo asset
     * @return React component Vimeo asset div
     */
    vimeoAsset = () => {
        return (
            <div className={`vimeo-asset ${this.props.asset.asset.layout}`}>
                <Vimeo videoId={this.props.asset.asset.data} />
                <h3 className="vimeo-caption">
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.caption}/>
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
            <div className={`image-asset ${this.props.asset.asset.layout}`}>
                <Img
                    src={this.props.asset.asset.data}
                    loader={<ImagePlaceholder category={this.props.asset.type} height={"30vw"}/>} />
                <h3 className="image-caption">
                    <JsxParser
                        bindings={{}}
                        components={{Italic, Link, Bold, Code}}
                        jsx={this.props.asset.asset.caption}/>
                </h3>
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

    /**
     * Renderer for slider asset
     * @return React component slider asset div
     */
    sliderAsset = () => {
        return (
            <div className="slider-asset">
                <Img
                    src={this.props.asset.asset.data[this.props.currentSlide]}
                    loader={<ImagePlaceholder category={"image"} height={"100%"}/>} />
                <h2 className="slide-count">
                    {`${this.props.currentSlide + 1} of ${this.props.asset.asset.data.length}`}
                </h2>
            </div>
        );
    }

    /**
     * Renderer for list asset
     * @return React component list asset div
     */
    listAsset = () => {
        return (
            <div>
                {this.props.asset.asset.kind == "bullets" ?
                    <ul className="list-asset">
                        {this.props.asset.asset.data.map(item => {
                            return (
                                <JsxParser
                                    bindings={{}}
                                    components={{Italic, Link, Bold, Code}}
                                    jsx={`<li>${item}</li>`}/>
                            );
                        })}
                    </ul>
                :
                    <ol className="list-asset">
                        {this.props.asset.asset.data.map(item => {
                            return (
                                <JsxParser
                                    bindings={{}}
                                    components={{Italic, Link, Bold, Code}}
                                    jsx={`<li>${item}</li>`}/>
                            );
                        })}
                    </ol>
                }
            </div>
        );
    }

    /**
     * Renderer for section divider asset
     * @return React component section divider asset div
     */
    sectionDividerAsset = () => {
        return (
            <div className="section-divider-asset">
                <hr />
            </div>
        );
    }
}

// ============= PropTypes ==============

ArticleAsset.propTypes = {
    asset: PropTypes.object.isRequired,
    currentSlide: PropTypes.number
};
