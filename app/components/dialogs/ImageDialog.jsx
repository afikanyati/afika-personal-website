// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Files
import DialogTypes     from '../../constants/dialogTypes';
import CloseButton     from '../buttons/CloseButton';
import Loader          from '../Loader';
import ArrowButton     from '../buttons/ArrowButton';

export default class ImageDialog extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ImageDialog");
    }

    render() {
        let showLeftArrow;

        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            let imageIndex = parseInt(str.substring(lastSlash + 1, str.length));
            showLeftArrow = imageIndex != "0";
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        open                        ={this.props.imageDialogIsOpen}
                        titleClassName              ="image-dialog-title"
                        actionsContainerClassName   ="image-dialog-actions"
                        bodyClassName               ="image-dialog-body"
                        contentClassName            ="image-dialog-content" >
                        <CloseButton
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.IMAGE)} />
                        <Loader size="medium" />
                        <div className="image-wrapper">
                            <div className="image"
                                style={{
                                    backgroundImage: `url(${this.props.currentItem.data})`
                                }} />
                        </div>
                        <h3 className="image-description">
                            {this.props.currentItem.title} <span>{this.props.currentItem.date}</span>
                        </h3>
                        {showLeftArrow ?
                            <ArrowButton
                                top={"50%"}
                                bottom={"auto"}
                                left={20}
                                right={"auto"}
                                direction="left"
                                transform="translate(0, -50%)"
                                onClick={this.props.browseTo.bind({}, "left")} />
                        :
                            null
                        }
                        <ArrowButton
                            top={"50%"}
                            bottom={"auto"}
                            left={"auto"}
                            right={20}
                            direction="right"
                            transform="translate(0, -50%)"
                            onClick={this.props.browseTo.bind({}, "right")} />
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ImageDialog");
    }

    componentWillReceiveProps(nextProps) {

    }
}

// ============= PropTypes ==============

ImageDialog.propTypes = {
    imageDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
