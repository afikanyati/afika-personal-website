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
import Block           from '../Block';
import Loader          from '../Loader';

export default class VideoDialog extends React.Component {

    state = {
        lengthVideoList: 2,
        isPlaying: false,
        duration: 0,
        timeElapsed: "0:00",
        timeLeft: "",
        scrubberWidth: "0%",
        reload: false
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----VideoDialog");
    }

    render() {
        let showLeftArrow;
        let showRightArrow;

        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            let videoIndex = parseInt(str.substring(lastSlash + 1, str.length));
            showLeftArrow = videoIndex > 0;
            showRightArrow = videoIndex < this.state.lengthVideoList - 1;
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.closeDialog}
                        open                        ={this.props.videoDialogIsOpen}
                        autoScrollBodyContent       ={true}
                        titleClassName              ="video-dialog-title"
                        actionsContainerClassName   ="video-dialog-actions"
                        bodyClassName               ="video-dialog-body"
                        contentClassName            ="video-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.closeDialog} />
                        <Loader size="medium" />
                        <div className="video-wrapper">
                            <h1 className="video-title">
                                {this.props.currentItem.title}
                            </h1>
                            <div className="video-date-wrapper">
                                <Block
                                    position={"absolute"}
                                    display={"block"}
                                    top={"50%"}
                                    bottom={"auto"}
                                    left={0}
                                    right={"auto"}
                                    vertCenter={true}
                                    horCenter={false}
                                    width={40}
                                    height={3}
                                    color={"#5a4570"}/>
                                <h4 className="video-date">
                                    {this.props.currentItem.date}
                                </h4>
                            </div>
                            <div className="video-body">
                                <div className="video-player">
                                    <video ref="video">
                                         <source src={this.props.currentItem.data} type="video/mp4" />
                                        Your browser does not support HTML5 audio.
                                    </video>
                                    <button
                                        className="play-button video"
                                        onClick={this.togglePlayback}>
                                        {this.state.isPlaying ?
                                            <svg
                                                version="1.1"
                                                id="pause-button-icon"
                                                x="0px"
                                                y="0px"
                                                width="50px"
                                                height="50px"
                                                viewBox="0 0 50 50"
                                                enableBackground="new 0 0 50 50">
                                                <path fill="#FFFFFF" d="M22.518,34.93h-4.965V15.07h4.965V34.93z M32.447,34.93h-4.965V15.07h4.965V34.93z"/>
                                            </svg>
                                        :
                                            <svg
                                                version="1.1"
                                                id="play-button-icon"
                                                x="0px"
                                                y="0px"
                                                width="50px"
                                                height="50px"
                                                viewBox="0 0 50 50"
                                                enableBackground="new 0 0 50 50">
                                                <path fill="#FFFFFF" d="M19.999,36.252V13.748L35.002,25L19.999,36.252z"/>
                                            </svg>
                                        }
                                    </button>
                                    <div className="video-progress">
                                        <div
                                            className="scrubber"
                                            style={{
                                                width: this.state.scrubberWidth
                                            }} />
                                        <p className="play-time left">
                                            {this.state.timeElapsed}
                                        </p>
                                        <p className="play-time right">
                                            {this.state.timeLeft == "" ?
                                                ""
                                            :
                                                `-${this.state.timeLeft}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        {showRightArrow ?
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
                            :
                                null
                        }
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++VideoDialog");
    }

    componentWillReceiveProps(nextProps) {
    }

    togglePlayback = () => {
        let video = this.refs.video;

        if(this.state.isPlaying) {
            video.pause();
            // Stop updating

        } else {
            video.play();
            // Call updateTime on a setInterval
            setInterval(() => {
                this.updateTime(video);
            }, 100);
        }

        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    convertTime = (timestamp) => {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }

    updateTime = (video) => {
        let duration = video.duration;
        let currentTime = video.currentTime
        let timeElapsedTimestamp = Math.floor(currentTime);
        let timeLeftTimestamp = Math.floor(duration-timeElapsedTimestamp);
        let timeElapsed = this.convertTime(timeElapsedTimestamp);
        let timeLeft = this.convertTime(timeLeftTimestamp);
        let percent = currentTime/duration;

        this.updateScrubber(percent);
        this.setState({
            timeElapsed: timeElapsed,
            timeLeft: timeLeft
        });
    }

    updateScrubber = (percent) => {
        let convertedPercent = percent * 100;
        let stringPercent = convertedPercent.toString().concat("%");
        this.setState({
            scrubberWidth: stringPercent
        });
    }

    closeDialog = () => {
        this.setState({
            isPlaying: false,
            duration: 0,
            timeElapsed: "0:00",
            timeLeft: "",
            scrubberWidth: "0%"
        });

        this.props.toggleDialog(DialogTypes.VIDEO);
    }
}

// ============= PropTypes ==============

VideoDialog.propTypes = {
    videoDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    browseTo: PropTypes.func.isRequired
};
