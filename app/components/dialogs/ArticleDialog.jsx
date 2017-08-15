// Libs
import React                from 'react';
import ReactDOM             from 'react-dom';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Files
import DialogTypes      from '../../constants/dialogTypes';
import CloseButton      from '../buttons/CloseButton';
import Block            from '../Block';
import ArticleAsset     from './ArticleAsset';

export default class ArticleDialog extends React.Component {

    state = {
        assets: []
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ArticleDialog");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.ARTICLE)}
                        open                        ={this.props.articleDialogIsOpen}
                        titleClassName              ="article-dialog-title"
                        actionsContainerClassName   ="article-dialog-actions"
                        bodyClassName               ="article-dialog-body"
                        contentClassName            ="article-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.ARTICLE)} />
                        <div className="article-wrapper">
                            <h1 className="article-title">
                                {this.props.currentItem.title}
                            </h1>
                            <p className="article-description">
                                {this.props.currentItem.subtitle}
                            </p>
                            <div className="article-date-wrapper">
                                <Block
                                    position={"absolute"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={0}
                                    right={"auto"}
                                    vertCenter={true}
                                    horCenter={false}
                                    width={40}
                                    height={3}
                                    color={"#5a4570"}/>
                                <h4 className="article-date">
                                    {this.props.currentItem.date}
                                </h4>
                            </div>
                            <div
                                className="article-body"
                                >
                                {this.state.assets.map(asset => {
                                    return (
                                        <ArticleAsset asset={asset} />
                                    );
                                })}
                            </div>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ArticleDialog");

        if (this.props.currentItem.assets) {
            this.setState({
                assets: this.props.currentItem.assets
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
}

// ============= PropTypes ==============

ArticleDialog.propTypes = {
    articleDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
