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
import Loader               from '../Loader';
import ArrowButton          from '../buttons/ArrowButton';

/**
 * The ImageDialog is one of various Dialog components used to render
 * Image assets. It makes use of the Material UI Dialog Component.
 */
export default class ImageDialog extends React.Component {

    state = {
        lengthArtList: 0    // Keeps track of the number of images in album/collection
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ImageDialog");
    }

    render() {
        let showLeftArrow;
        let showRightArrow;

        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            let imageIndex = parseInt(str.substring(lastSlash + 1, str.length));
            showLeftArrow = imageIndex > 3; // Artworks start at index 3
            showRightArrow = imageIndex < this.state.lengthArtList - 1;
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.IMAGE)}
                        open                        ={this.props.imageDialogIsOpen}
                        titleClassName              ="image-dialog-title"
                        actionsContainerClassName   ="image-dialog-actions"
                        bodyClassName               ="image-dialog-body"
                        contentClassName            ="image-dialog-content" >
                        <CloseButton
                            position={"fixed"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
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
                                position={"fixed"}
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
                        {showRightArrow ?
                            <ArrowButton
                                position={"fixed"}
                                top={"50%"}
                                bottom={"auto"}
                                left={"auto"}
                                right={20}
                                direction="right"
                                vertCenter={true}
                                horCenter={false}
                                onClick={this.props.browseTo.bind({}, "right")} />
                            :
                                null
                        }
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ImageDialog");

        // Get length of artworks list
        firebase.database().ref('content/art').once(
            'value',
            (snapshot) => {
                let lenArt = snapshot.val().length;
                this.setState({
                    lengthArtList: lenArt
                });
            },
            () => {
                return;
            }
        );
    }
}

// ============= PropTypes ==============

ImageDialog.propTypes = {
    imageDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    browseTo: PropTypes.func.isRequired
};
