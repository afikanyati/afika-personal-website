// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

// Components
import DialogTypes          from '../../constants/dialogTypes';
import CloseButton          from '../buttons/CloseButton';

/**
 * The ResumeDialog is one of various Dialog components used to render
 * the Resume download link. It makes use of the Material UI Dialog Component.
 */
export default class ResumeDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ResumeDialog");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.RESUME)}
                        open                        ={this.props.resumeDialogIsOpen}
                        titleClassName              ="resume-dialog-title"
                        actionsContainerClassName   ="resume-dialog-actions"
                        bodyClassName               ="resume-dialog-body"
                        contentClassName            ="resume-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.RESUME)}
                            onTouchTap={this.props.toggleDialog.bind({}, DialogTypes.RESUME)} />
                        <h1 className="resume-title">
                            Resume
                        </h1>
                        <div className="resume-wrapper">
                            <button className="resume-download" target="_blank">
                                <a href={this.props.currentItem.data}>
                                    Download
                                </a>
                            </button>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ResumeDialog");
    }
}

// ============= PropTypes ==============

ResumeDialog.propTypes = {
    resumeDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
