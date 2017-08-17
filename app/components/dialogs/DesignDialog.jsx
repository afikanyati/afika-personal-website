// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import Img                  from 'react-image';

// Components
import DialogTypes          from '../../constants/dialogTypes';
import CloseButton          from '../buttons/CloseButton';
import Block                from '../Block';
import ImagePlaceholder     from '../feed/ImagePlaceholder';

/**
 * The DesignDialog is one of various Dialog components used to render
 * Design projects. It makes use of the Material UI Dialog Component.
 */
export default class DesignDialog extends React.Component {
    state = {
        blocks: []          // A list of block assets: an image/video and text pairing
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
                        autoScrollBodyContent       ={true}
                        titleClassName              ="design-dialog-title"
                        actionsContainerClassName   ="design-dialog-actions"
                        bodyClassName               ="design-dialog-body"
                        contentClassName            ="design-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.props.toggleDialog.bind({}, DialogTypes.DESIGN)}
                            onTouchTap={this.props.toggleDialog.bind({}, DialogTypes.DESIGN)} />
                        <div className="design-wrapper">
                            <h1 className="design-title">
                                {this.props.currentItem.title}
                            </h1>
                            <p className="design-description">
                                {this.props.currentItem.subtitle}
                            </p>
                            <div className="design-date-wrapper">
                                <Block
                                    position={"relative"}
                                    display={"inline-block"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={0}
                                    right={"auto"}
                                    vertCenter={true}
                                    horCenter={false}
                                    width={50}
                                    height={3}
                                    color={"#5a4570"}/>
                                <h4 className="design-date">
                                    {this.props.currentItem.date}
                                </h4>
                                <Block
                                    position={"relative"}
                                    display={"inline-block"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={0}
                                    right={"auto"}
                                    vertCenter={true}
                                    horCenter={false}
                                    width={50}
                                    height={3}
                                    color={"#5a4570"}/>
                            </div>
                            <div className="design-body">
                                {this.state.blocks.map((item, index) => {
                                    let isEven = index == 0 || !!(index && !(index%2));

                                    return (
                                        <div>
                                            {item.type == "image" ?
                                                isEven ?
                                                    <div className="design-block">
                                                        <div className="block-image">
                                                            <Img
                                                                src={item.data}
                                                                loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                                                        </div>
                                                        <div className="block-description">
                                                            {item.description}
                                                        </div>
                                                    </div>

                                                :

                                                    <div className="design-block right">
                                                        <div className="block-description">
                                                            {item.description}
                                                        </div>
                                                        <div className="block-image">
                                                            <Img
                                                                src={item.data}
                                                                loader={<ImagePlaceholder category={"image"} height={"30vw"}/>} />
                                                        </div>
                                                    </div>

                                            :
                                                null
                                            }
                                            {item.type == "text" ?
                                                <div className="design-block-text">
                                                    {item.data}
                                                </div>
                                            :
                                                null
                                            }
                                        </div>
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
        console.log("+++++DesignDialog");

        if (this.props.currentItem.blocks) {
            this.setState({
                blocks: this.props.currentItem.blocks
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentItem.blocks) {
            this.setState({
                blocks: nextProps.currentItem.blocks
            });
        }
    }
}

// ============= PropTypes ==============

DesignDialog.propTypes = {
    designDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
