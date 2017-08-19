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
 * The SkillsDialog is one of various Dialog components used to render
 * the Skills asset. It makes use of the Material UI Dialog Component.
 */
export default class SkillsDialog extends React.Component {

    state = {

    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SkillsDialog");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.SKILLS)}
                        open                        ={this.props.skillsDialogIsOpen}
                        titleClassName              ="skills-dialog-title"
                        actionsContainerClassName   ="skills-dialog-actions"
                        bodyClassName               ="skills-dialog-body"
                        contentClassName            ="skills-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.SKILLS)}
                            onTouchTap={this.props.toggleDialog.bind({}, DialogTypes.SKILLS)} />

                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++SkillsDialog");

    }
}

// ============= PropTypes ==============

SkillsDialog.propTypes = {
    skillsDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
