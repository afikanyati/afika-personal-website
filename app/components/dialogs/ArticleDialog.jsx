// Libs
import React                from 'react';
import ReactDOM             from 'react-dom';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import uuid                 from 'uuid';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import JsxParser            from 'react-jsx-parser';


// Components
import DialogTypes                  from '../../constants/dialogTypes';
import CloseButton                  from '../buttons/CloseButton';
import Block                        from '../Block';
import Italic                       from './Italic';
import Bold                         from './Bold';
import Link                         from './Link';
import Code                         from './Code';
import ArticleAsset                 from './ArticleAsset';
import ArrowButton                  from '../buttons/ArrowButton';
import ArticleAssetTypes            from '../../constants/articleAssetTypes.js';

/**
 * The ArticleDialog is one of various Dialog components used to render
 * Article assets. It makes use of the Material UI Dialog Component and renders
 * the assets with the helper ArticleAsset component.
 */
export default class ArticleDialog extends React.Component {

    state = {
        assets: [],             // A list of various article assets used in the article
        currentSlide: 0         // Used by slider assets to keep track of current slide
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----ArticleDialog");
    }

    render() {
        let lenSlides = -1;
        let type = "";
        if (this.state.assets.length == 1) {
            lenSlides = this.state.assets[0]["asset"]["data"].length;
        }

        if (this.props.currentItem.path) {
            type = this.props.currentItem.path.substring(8, this.props.currentItem.path.indexOf("/", 8));
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.closeDialog}
                        open                        ={this.props.articleDialogIsOpen}
                        autoScrollBodyContent       ={true}
                        titleClassName              ="article-dialog-title"
                        actionsContainerClassName   ="article-dialog-actions"
                        bodyClassName               ="article-dialog-body"
                        contentClassName            ="article-dialog-content" >
                        <CloseButton
                            position={"fixed"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.closeDialog} />
                        <div className="article-wrapper">
                            <h1 className={`article-title ${type}`}>
                                {this.props.currentItem.title}
                            </h1>
                            <p className={`article-description ${type}`}>
                                <JsxParser
                                    bindings={{}}
                                    components={{Italic, Link, Bold, Code}}
                                    jsx={this.props.currentItem.subtitle} />
                            </p>
                            <div className={`article-date-wrapper ${type}`}>
                                <Block
                                    id={type === "music" ? "music-date-block" : "article-date-block"}
                                    position={"static"}
                                    display={"inline-block"}
                                    top={"auto"}
                                    bottom={"auto"}
                                    left={"auto"}
                                    right={"auto"}
                                    vertCenter={false}
                                    horCenter={false}
                                    width={40}
                                    height={3}
                                    color={"#5a4570"}/>
                                <h4 className={type === "music" ? "music-date" : "article-date"}>
                                    {this.props.currentItem.date}
                                    <span className="article-time">{`(${this.props.determineReadTime(this.props.currentItem).toString()} min)`}</span>
                                </h4>
                                <Block
                                    position={"static"}
                                    display={type === "music" ? "inline-block" : "none"}
                                    top={"auto"}
                                    bottom={"auto"}
                                    left={"auto"}
                                    right={"auto"}
                                    vertCenter={false}
                                    horCenter={false}
                                    width={40}
                                    height={3}
                                    color={"#5a4570"}/>
                            </div>
                            <div className="article-body">
                                {this.state.assets.map(asset => {
                                    return (
                                        <ArticleAsset
                                            key={uuid.v4()}
                                            asset={asset}
                                            currentSlide={this.state.currentSlide} />
                                    );
                                })}
                            </div>
                            {this.state.currentSlide > 0 && this.state.assets[0]["type"] == ArticleAssetTypes.SLIDER ?
                                <ArrowButton
                                    position={"fixed"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={20}
                                    right={"auto"}
                                    direction="left"
                                    vertCenter={true}
                                    horCenter={false}
                                    onClick={this.previousSlide} />
                            :
                                null
                            }
                            {this.state.currentSlide < lenSlides && this.state.assets[0]["type"] == ArticleAssetTypes.SLIDER ?
                                <ArrowButton
                                    position={"fixed"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={"auto"}
                                    right={20}
                                    direction="right"
                                    vertCenter={true}
                                    horCenter={false}
                                    onClick={this.nextSlide} />
                            :
                                null
                            }
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        // console.log("+++++ArticleDialog");

        if (this.props.currentItem.assets) {
            this.setState({
                assets: this.props.currentItem.assets,
                currentSlide: 0
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentItem.assets) {
            this.setState({
                assets: nextProps.currentItem.assets
            });
        }
    }

    // ======== METHODS ========

    /**
     * Closes the ArticleDialog component by toggling relevant value in App.jsx
     * Also resets currentSlide to zero to clear state
     */
    closeDialog = () => {
        this.setState({
            currentSlide: 0
        }, () => {this.props.toggleDialog(DialogTypes.ARTICLE)});
    }

    /**
     * For slider assets, it navigates to the next successive slide
     */
    nextSlide = () => {
        let newIndex = this.state.currentSlide + 1;
        let lenSlides = this.state.assets[0]["asset"]["data"].length;

        if (newIndex == lenSlides) {
            return;
        }

        this.setState({
            currentSlide: newIndex
        });
    }

    /**
     * For slider assets, it navigates to the last preceding slide
     */
    previousSlide = () => {
        let newIndex = this.state.currentSlide - 1;

        if (newIndex < 0) {
            return;
        }

        this.setState({
            currentSlide: newIndex
        });
    }
}

// ============= PropTypes ==============

ArticleDialog.propTypes = {
    articleDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    determineReadTime: PropTypes.func.isRequired
};
