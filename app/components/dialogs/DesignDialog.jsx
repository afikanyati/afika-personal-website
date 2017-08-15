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

export default class DesignDialog extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----DesignDialog");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.DESIGN)}
                        open                        ={this.props.designDialogIsOpen}
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
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.DESIGN)} />

                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++DesignDialog");
    }

    componentWillReceiveProps(nextProps) {

    }
}

// ============= PropTypes ==============

DesignDialog.propTypes = {
    designDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
