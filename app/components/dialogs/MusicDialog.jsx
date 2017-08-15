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
import ArrowButton     from '../buttons/ArrowButton';

export default class MusicDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----MusicDialog");
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
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.MUSIC)}
                        open                        ={this.props.musicDialogIsOpen}
                        titleClassName              ="image-dialog-title"
                        actionsContainerClassName   ="image-dialog-actions"
                        bodyClassName               ="image-dialog-body"
                        contentClassName            ="image-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.MUSIC)} />
                            {showLeftArrow ?
                                <ArrowButton
                                    position={"absolute"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={20}
                                    right={"auto"}
                                    direction="left"
                                    vertCenter={true}
                                    horCenter={false}
                                    onClick={this.props.browseTo.bind({}, "left")} />
                            :
                                null
                            }
                            <ArrowButton
                                position={"absolute"}
                                top={"50%"}
                                bottom={"auto"}
                                left={"auto"}
                                right={20}
                                direction="right"
                                vertCenter={true}
                                horCenter={false}
                                onClick={this.props.browseTo.bind({}, "right")} />
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++MusicDialog");
    }

    componentWillReceiveProps(nextProps) {

    }
}

// ============= PropTypes ==============

MusicDialog.propTypes = {
    musicDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
