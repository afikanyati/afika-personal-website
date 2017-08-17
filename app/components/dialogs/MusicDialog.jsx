// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import JsxParser            from 'react-jsx-parser';

// Files
import DialogTypes     from '../../constants/dialogTypes';
import CloseButton     from '../buttons/CloseButton';
import ArrowButton     from '../buttons/ArrowButton';
import Block           from '../Block';
import Italic           from './Italic';
import Bold             from './Bold';
import Link             from './Link';
import Code             from './Code';

export default class MusicDialog extends React.Component {

    state = {
        lengthMusicList: 0,
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
        console.log("-----MusicDialog");
    }

    render() {
        let showLeftArrow;
        let showRightArrow;

        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            let musicIndex = parseInt(str.substring(lastSlash + 1, str.length));
            showLeftArrow = musicIndex > 0;
            showRightArrow = musicIndex < this.state.lengthMusicList - 1;
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.closeDialog}
                        open                        ={this.props.musicDialogIsOpen}
                        autoScrollBodyContent       ={true}
                        titleClassName              ="music-dialog-title"
                        actionsContainerClassName   ="music-dialog-actions"
                        bodyClassName               ="music-dialog-body"
                        contentClassName            ="music-dialog-content" >
                        <CloseButton
                            position={"absolute"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.closeDialog} />
                        <div className="music-wrapper">
                            <h1 className="music-title">
                                {this.props.currentItem.title}
                            </h1>
                            <p className="music-details">
                                {`${this.props.currentItem.artist} - \
                                ${this.props.currentItem.project} (Track \
                                    ${this.props.currentItem.track})`}
                            </p>
                            <div className="music-date-wrapper">
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
                                <h4 className="music-date">
                                    {this.props.currentItem.year}
                                </h4>
                            </div>
                            <div className="music-body">
                                <div className="music-player">
                                    <audio ref="audio">
                                        <source src={this.props.currentItem.data} />
                                        Your browser does not support HTML5 audio.
                                    </audio>
                                    <div className="playback-buttons">
                                        <button
                                            className="play-button"
                                            onClick={this.togglePlayback}
                                            onTouchTap={this.togglePlayback}>
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
                                        <button
                                            className={showLeftArrow ? "prev-button" : "prev-button disable"}
                                            onClick={showLeftArrow ? this.handleArrowClick.bind({}, "left") : null}
                                            onTouchTap={showLeftArrow ? this.handleArrowClick.bind({}, "left") : null}>
                                            <svg
                                                version="1.1"
                                                id="prev-button-icon"
                                                x="0px"
                                                y="0px"
                                                width="50px"
                                                height="50px"
                                                viewBox="0 0 50 50"
                                                enableBackground="new 0 0 50 50">
                                                <path fill={showLeftArrow ? "rgba(90, 69, 112, 1)" : "rgba(90, 69, 112, 0.38)"} d="M0,0h8.333v50H0V0z M14.583,25L50,50V0L14.583,25z"/>
                                            </svg>
                                        </button>
                                        <button
                                            className={showRightArrow ? "next-button" : "next-button disable"}
                                            onClick={showRightArrow ? this.handleArrowClick.bind({}, "right") : null}
                                            onTouchTap={showRightArrow ? this.handleArrowClick.bind({}, "right") : null}>
                                            <svg
                                                version="1.1"
                                                id="next-button-icon"
                                                x="0px"
                                                y="0px"
                                                width="50px"
                                                height="50px"
                                                viewBox="0 0 50 50"
                                                enableBackground="new 0 0 50 50">
                                                <path fill={showRightArrow ? "rgba(90, 69, 112, 1)" : "rgba(90, 69, 112, 0.38)"} d="M0.005,49.99l35.41-24.995L0.005,0V49.99z M41.663,0v49.99h8.332V0H41.663z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="media-progress-bar">
                                        <div className="music-progress">
                                            <div
                                                className="scrubber"
                                                style={{
                                                    width: this.state.scrubberWidth
                                                }} />
                                        </div>
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
                                <div className="music-description">
                                    <JsxParser
                                        bindings={{}}
                                        components={{Italic, Link, Bold, Code}}
                                        jsx={
                                            `<Bold text={'Produced by ${this.props.currentItem.producer}'} />. \
                                            ${this.props.currentItem.text}`}
                                            />
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
                                onClick={this.handleArrowClick.bind({}, "left")}
                                onTouchTap={this.handleArrowClick.bind({}, "left")} />
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
                                onClick={this.handleArrowClick.bind({}, "right")}
                                onTouchTap={this.handleArrowClick.bind({}, "right")} />
                            :
                                null
                        }
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++MusicDialog");

        // Create path to project
        let path = "";
        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            path = str.substring(0, lastSlash + 1);
        }

        // Get length of artworks list
        firebase.database().ref(`content/${path}`).once(
            'value',
            (snapshot) => {
                let lenMusic = snapshot.val().length;
                this.setState({
                    lengthMusicList: lenMusic
                });
            },
            () => {
                return;
            }
        );
    }

    componentWillReceiveProps(nextProps) {

        // Create path to project
        let path = "";
        if (nextProps.currentItem.path) {
            let str = nextProps.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            path = str.substring(0, lastSlash + 1);
        }

        // Get length of artworks list
        firebase.database().ref(`content/${path}`).once(
            'value',
            (snapshot) => {
                let lenMusic = snapshot.val().length;
                this.setState({
                    lengthMusicList: lenMusic
                });
            },
            () => {
                return;
            }
        );
    }

    togglePlayback = () => {
        let audio = this.refs.audio;
        let reload = this.state.reload; // Necessary when we navigate to new track

        if (reload) {
            audio.load();
            reload = false;
        }

        if(this.state.isPlaying) {
            audio.pause();
        } else {
            audio.play();
            // Updates timestamps ona regular interval
            setInterval(() => {
                this.updateTime(audio);
            }, 100);
        }

        this.setState({
            isPlaying: !this.state.isPlaying,
            reload: reload
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

    updateTime = (audio) => {

        // audio.readyState = 4 => HAVE_ENOUGH_DATA - enough data available to start playing
        // Should not run if music is paused
        if (audio.readyState == 4 && this.state.isPlaying) {
            let duration = audio.duration;
            let currentTime = audio.currentTime;
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
            lengthMusicList: 0,
            isPlaying: false,
            duration: 0,
            timeElapsed: "0:00",
            timeLeft: "",
            scrubberWidth: "0%",
            reload: true
        }, () => {this.props.toggleDialog(DialogTypes.MUSIC)});
    }

    handleArrowClick = (direction) => {
        // Stop track if playing
        let audio = this.refs.audio;
        if(this.state.isPlaying) {
            audio.pause();
        }

        // Reload track so that new track plays
        // Instead of the old
        this.setState({
            isPlaying: false,
            duration: 0,
            timeElapsed: "0:00",
            timeLeft: "",
            scrubberWidth: "0%",
            reload: true
        }, () => {this.props.browseTo(direction)});
    }
}

// ============= PropTypes ==============

MusicDialog.propTypes = {
    musicDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    browseTo: PropTypes.func.isRequired
};
