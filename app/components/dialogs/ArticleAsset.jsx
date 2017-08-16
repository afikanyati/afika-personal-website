// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import JsxParser        from 'react-jsx-parser';
import YouTube          from 'react-youtube';
import Img              from 'react-image';

// Files
import AssetTypes       from '../../constants/assetTypes.js';
import Italic           from './Italic.jsx';
import Bold             from './Bold.jsx';
import Link             from './Link.jsx';
import ImagePlaceholder from '../feed/ImagePlaceholder';
import Block            from '../Block';

export default class ArticleAsset extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ArticleAsset");
    }

    render() {
        if(this.props.asset.type == AssetTypes.PARAGRAPH) {
            return this.paragraphAsset();
        } else if (this.props.asset.type == AssetTypes.HEADING) {
            return this.headingAsset();
        } else if (this.props.asset.type == AssetTypes.YOUTUBE) {
            return this.youtubeAsset();
        } else if (this.props.asset.type == AssetTypes.IMAGE) {
            return this.imageAsset();
        } else if (this.props.asset.type == AssetTypes.QUOTE) {
            return this.quoteAsset();
        } else if (this.props.asset.type == AssetTypes.DICTIONARY) {
            return this.dictionaryAsset();
        } else if (this.props.asset.type == AssetTypes.LIST) {
            return this.listAsset();
        } else if (this.props.asset.type == AssetTypes.SLIDER) {
            return this.sliderAsset();
        } else if (this.props.asset.type == AssetTypes.CODE) {
            return this.codeAsset();
        } else if (this.props.asset.type == AssetTypes.SECTION_END) {
            return this.sectionEndAsset();
        } else {
            // should not reach this point
            return (
                <div></div>
            );
        }
    }

    componentDidMount() {
        console.log("+++++ArticleAsset");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    paragraphAsset = () => {
        return (
            <div className="paragraph-asset">
                <JsxParser
                    bindings={{}}
                    components={{Italic, Link, Bold}}
                    jsx={this.props.asset.asset.data}/>
            </div>
        );
    }

    headingAsset = () => {
        return (
            <h2 className="heading-asset">
                {this.props.asset.asset.data}
            </h2>
        );
    }

    youtubeAsset = () => {
        return (
            <div className={`youtube-asset ${this.props.asset.asset.layout}`}>
                <YouTube
                    videoId={this.props.asset.asset.data}
                    className="youtube-video"
                />
                <h3 className="youtube-caption">
                    {this.props.asset.asset.caption}
                </h3>
            </div>

        );
    }

    imageAsset = () => {
        return (
            <div className={`image-asset ${this.props.asset.asset.layout}`}>
                <Img
                    src={this.props.asset.asset.data}
                    loader={<ImagePlaceholder category={this.props.asset.type} height={"30vw"}/>} />
                <h3 className="image-caption">
                    {this.props.asset.asset.caption}
                </h3>
            </div>
        );
    }

    quoteAsset = () => {
        return (
            <div className="quote-asset">
                <Block
                    position={"absolute"}
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
                    {this.props.asset.asset.data}
                </div>
                <h3 className="reference">
                    {this.props.asset.asset.reference}
                </h3>
            </div>
        );
    }

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
                        components={{Italic, Link, Bold}}
                        jsx={entireDef}/>
                </p>
            </div>
        );
    }

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

    listAsset = () => {
        return (
            <div></div>
        );
    }
    codeAsset = () => {
        return (
            <div></div>
        );
    }

    sectionEndAsset = () => {
        return (
            <div></div>
        );
    }
}

// ============= PropTypes ==============

ArticleAsset.propTypes = {
    asset: PropTypes.object.isRequired
};
