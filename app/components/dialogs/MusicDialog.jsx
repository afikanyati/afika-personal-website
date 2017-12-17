// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import JsxParser            from 'react-jsx-parser';

// Components
import DialogTypes          from '../../constants/dialogTypes';
import CloseButton          from '../buttons/CloseButton';
import ArrowButton          from '../buttons/ArrowButton';
import Block                from '../Block';
import Italic               from './Italic';
import Bold                 from './Bold';
import Link                 from './Link';
import Code                 from './Code';

/**
 * The MusicDialog is one of various Dialog components used to render
 * music assets. It makes use of the Material UI Dialog Component and contains
 * a fully-coded music player that is cable of playing, pausing, fast-forwarding,
 * and rewinding the music files.
 */
export default class MusicDialog extends React.Component {

    state = {
        lengthMusicList: 0,     // Keeps track of the number of audio tracks
        isPlaying: false,       // Keeps track of whether the current track is playing
        duration: 0,            // Stores the duration of the track (in seconds)
        timeElapsed: "0:00",    // Used to store the amount of seconds that have played
        timeLeft: "",           // Used to store how much time is left in the song (duration - limeElapsed)
        scrubberWidth: "0%",    // Specifies the width of playback scrubber which is proportional to timeElapsed
        reload: false,          // Informs us when new audio must be reloaded (when navigated to new track)
        playCounted: false      // Ensures asong play is incremented once per open dialog
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----MusicDialog");
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
                            position={"fixed"}
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
                                    id="music-date-block"
                                    position={"static"}
                                    display={"inline-block"}
                                    top={"auto"}
                                    bottom={"auto"}
                                    left={"auto"}
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
                                        <button
                                            className={showLeftArrow ? "prev-button" : "prev-button disable"}
                                            onClick={showLeftArrow ? this.handleArrowClick.bind({}, "left") : null}>
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
                                            onClick={showRightArrow ? this.handleArrowClick.bind({}, "right") : null}>
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
                                        <div
                                            className="media-progress"
                                            onClick={this.moveScrubber}>
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
                                position={"fixed"}
                                top={"50%"}
                                bottom={"auto"}
                                left={20}
                                right={"auto"}
                                direction="left"
                                vertCenter={true}
                                horCenter={false}
                                onClick={this.handleArrowClick.bind({}, "left")} />
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
                                onClick={this.handleArrowClick.bind({}, "right")} />
                            :
                                null
                        }
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        // console.log("+++++MusicDialog");

        // Create path to project
        let path = "";
        if (this.props.currentItem.path) {
            let str = this.props.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            path = str.substring(0, lastSlash + 1);

            // Get length of artworks list
            firebase.database().ref(`${path}`).once(
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
    }

    componentWillReceiveProps(nextProps) {
        // Create path to project
        let path = "";
        if (nextProps.currentItem.path) {
            let str = nextProps.currentItem.path;
            let lastSlash = str.lastIndexOf("/");
            path = str.substring(0, lastSlash + 1);

            // Get length of artworks list
            firebase.database().ref(path).once(
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
    }

    // ========== Methods ===========

    /**
     * Fetches audio file, reloads file data if it is a new file
     * and toggles playback by envoking <audio> methods .play() and .pause()
     * Sets interval to update time state variables.
     */
    togglePlayback = () => {
        let audio = this.refs.audio;
        let reload = this.state.reload; // Necessary when we navigate to new track

        // Makes sure play only added once
        if (!this.state.playCounted || (this.state.playCounted && audio.ended)) {
            this.props.incrementor("plays", this.props.currentItem);
            this.setState({
                playCounted: true
            });
        }

        if (reload) {
            audio.load();
            reload = false;
        }

        if(this.state.isPlaying) {
            audio.pause();
        } else {
            audio.play();
            // Updates timestamps on a regular interval
            // Only issue is that setInterval will continue in background
            setInterval(() => {
                this.updateTime();
            }, 100);
        }

        this.setState({
            isPlaying: !this.state.isPlaying,
            reload: reload
        });
    }

    /**
     * Converts current time timestamp into an suitable minutes:seconds string for exhibition
     * @param  {int} timestamp current audio time elapsed
     * @return {str}           minutes:seconds formatted string
     */
    convertTime = (timestamp) => {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }

    /**
     * Runs logic of updating time elapsed and time left attributes
     */
    updateTime = () => {
        let audio = this.refs.audio;
        // audio.readyState = 4 => HAVE_ENOUGH_DATA - enough data available to start playing
        // Should not run if music is paused
        if (audio && audio.readyState == 4 && this.state.isPlaying) {
            let duration = audio.duration;
            let currentTime = audio.currentTime;
            let timeElapsedTimestamp = Math.floor(currentTime);
            let timeLeftTimestamp = Math.floor(duration-timeElapsedTimestamp);
            let timeElapsed = this.convertTime(timeElapsedTimestamp);
            let timeLeft = this.convertTime(timeLeftTimestamp);
            let percent = currentTime/duration;
            let isPlaying = true;
            if (percent == 1) {
                isPlaying = false;
            }

            this.updateScrubber(percent);
            this.setState({
                timeElapsed: timeElapsed,
                timeLeft: timeLeft,
                isPlaying: isPlaying
            });
        }
    }

    /**
     * Converts ratio of time elapsed and track duration to a width to
     * be injected into scrubber element width CSS attribute
     * @param  {float} percent ratio of time elapsed and track duration
     */
    updateScrubber = (percent) => {
        let stringPercent = 0;

        // Only update if song has not ended
        if (percent != 1) {
            let convertedPercent = percent * 100;
            stringPercent = convertedPercent.toString().concat("%");
        }

        this.setState({
            scrubberWidth: stringPercent
        });
    }

    /**
     * Closes the MusicDialog component by toggling relevant value in App.jsx
     * Also resets state variables
     */
    closeDialog = () => {
        // Stop track if playing
        let audio = this.refs.audio;
        if(this.state.isPlaying) {
            audio.pause();
        }

        this.setState({
            lengthMusicList: 0,
            isPlaying: false,
            duration: 0,
            timeElapsed: "0:00",
            timeLeft: "",
            scrubberWidth: "0%",
            reload: true,
            playCounted: false
        }, () => {this.props.toggleDialog(DialogTypes.MUSIC)});
    }

    /**
     * Navigates to the next successive or last preceding track
     * based on value of direction.
     * Will pause currently playing track.
     * @param  {str} direction left or right
     */
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
            reload: true,
            playCounted: false
        }, () => {this.props.browseTo(direction)});
    }

    /**
     * Fast forwards or rewinds to a particular point in track based
     * on position of mouse click/touch tap.
     * @param  {obj} e click event object
     */
    moveScrubber = (e) => {
        let className = e.target.className;
        let targetRect = e.target.getBoundingClientRect();
        let clickPosX = e.clientX;

        // If we clicked the Scrubber, and not Media Progress element
        if (className == "scrubber") {
            // We need to get .right of parent element
            let parentTarget = e.target.parentNode;
            targetRect = parentTarget.getBoundingClientRect();
        }

        let lengthLeftSideTarget = clickPosX - targetRect.left;
        let totalLengthTarget = targetRect.right - targetRect.left;
        let percent = lengthLeftSideTarget/totalLengthTarget;

        let audio = this.refs.audio;
        let duration = audio.duration;
        let newTime = Math.floor(duration * percent);
        audio.currentTime = newTime;
        this.updateTime();
    }
}

// ============= PropTypes ==============

MusicDialog.propTypes = {
    musicDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    browseTo: PropTypes.func.isRequired,
    incrementor: PropTypes.func.isRequired
};
