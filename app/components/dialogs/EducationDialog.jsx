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
import Accordion            from './Accordion';

/**
 * The EdcuationDialog is one of various Dialog components used to render
 * the Education asset. It makes use of the Material UI Dialog Component.
 */
export default class EducationDialog extends React.Component {

    state = {

    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----EducationDialog");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.EDUCATION)}
                        open                        ={this.props.educationDialogIsOpen}
                        autoScrollBodyContent       ={true}
                        titleClassName              ="education-dialog-title"
                        actionsContainerClassName   ="education-dialog-actions"
                        bodyClassName               ="education-dialog-body"
                        contentClassName            ="education-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.EDUCATION)}
                            onTouchTap={this.props.toggleDialog.bind({}, DialogTypes.EDUCATION)} />
                        <div className="education-wrapper">
                            <h1 className="education-title">
                                Education
                            </h1>
                            <Accordion
                                sections={this.props.currentItem.institutes} />
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++EducationDialog");
    }
}

// ============= PropTypes ==============

EducationDialog.propTypes = {
    educationDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
