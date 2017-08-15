// Libs
import React            from 'react';
import firebase         from 'firebase';
import PropTypes        from 'prop-types';
import JsxParser        from 'react-jsx-parser';

// Files
import AssetTypes       from '../../constants/assetTypes.js';

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
                {this.props.asset.asset.data}
            </div>
        );
    }

    headingAsset = () => {
        return (
            <div></div>
        );
    }

    youtubeAsset = () => {
        return (
            <div></div>
        );
    }

    imageAsset = () => {
        return (
            <div></div>
        );
    }

    quoteAsset = () => {
        return (
            <div></div>
        );
    }

    dictionaryAsset = () => {
        return (
            <div></div>
        );
    }

    sliderAsset = () => {
        return (
            <div></div>
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
