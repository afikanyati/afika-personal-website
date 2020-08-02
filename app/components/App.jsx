/*
 *  Root of afikanyati.com: Web framework build on
 *  Firebase + ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  written by Afika Nyati.
 */

// Libs
import React                from 'react';
import firebase             from 'firebase';
import config               from '../../firebase_config.json';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import uuid                 from 'uuid';
import initReactFastclick   from 'react-fastclick';
import { withRouter }       from 'react-router-dom';

// Initializing to enable Touch Tap events. It is global
// Used by Material UI
initReactFastclick();

// Initialize Firebase
firebase.initializeApp(config);

// Components
import HiddenNav            from './hidden_nav/HiddenNav';
import HamburgerIcon        from './hidden_nav/HamburgerIcon';
import Block                from './Block';
import ContentTypes         from '../constants/contentTypes';
import DesignAssetTypes     from '../constants/designAssetTypes';
import DialogTypes          from '../constants/dialogTypes';
import Feed                 from './feed/Feed';
import SocialBar            from './SocialBar';
import ContactIcon          from './ContactIcon';
import ContactView          from './ContactView';
import ScrollButton         from './buttons/ScrollButton';
import ImageDialog          from './dialogs/ImageDialog';
import ArticleDialog        from './dialogs/ArticleDialog';
import MusicDialog          from './dialogs/MusicDialog';
import VideoDialog          from './dialogs/VideoDialog';
import DesignDialog         from './dialogs/DesignDialog';
import SkillsDialog         from './dialogs/SkillsDialog';
import EducationDialog      from './dialogs/EducationDialog';
import ResumeDialog         from './dialogs/ResumeDialog';

/**
 * Root of App.
 * NOTE: default signifies that this is the only class exported from this file.
 * The majority of the web application's logic and state variables are housed in this
 * component. It is the topmost component in the App tree.
 */
class App extends React.Component {
    state = {
        navIsOpen: false,                   // Used to track whether Hidden Navigation is open
        contactIsOpen: false,               // Used to track whether the ContactView is open
        feed: [],                           // Stores all media assets to be visualized in Feed component
        feedScroll: 0,                      // Stores the amount of pixels the Feed component scrolled
        imageDialogIsOpen: false,           // Used to track whether Image Dialog is open
        musicDialogIsOpen: false,           // Used to track whether Music Dialog is open
        articleDialogIsOpen: false,         // Used to track whether Art Dialog is open
        designDialogIsOpen: false,          // Used to track whether Design Dialog is open
        videoDialogIsOpen: false,           // Used to track whether Video Dialog is open
        skillsDialogIsOpen: false,          // Used to track whether Skills Dialog is open
        educationDialogIsOpen: false,       // Used to track whether Education Dialog is open
        resumeDialogIsOpen: false,          // Used to track whether Resume Download Dialog is open
        currentItem: {},                    // Stores the data of the the current item in a dialog
        sortByPopularity: false,             // Used to track which sort algorithm is used for Feed content
        showFeedItemAtPath: null,           // Used to show a feed item that's waiting for feed results
        navItems: [                         // Stores a list of all items in Hidden Navigation
            {
                id   : uuid.v4(),
                item : 'xr',
                verb : 'experience',
                contentVisible: false,
                href : ContentTypes.XR
            },
            {
                id   : uuid.v4(),
                item : 'art',
                verb : 'see',
                contentVisible: false,
                href : ContentTypes.ART
            },
            {
                id   : uuid.v4(),
                item : 'music',
                verb : 'hear',
                contentVisible: false,
                href : ContentTypes.MUSIC
            },
            {
                id   : uuid.v4(),
                item : 'design',
                verb : 'analyze',
                contentVisible: false,
                href : ContentTypes.DESIGN
            },
            {
                id   : uuid.v4(),
                item : 'resumé',
                verb : 'scrutinize',
                contentVisible: false,
                href : ContentTypes.RESUME
            },
            {
                id   : uuid.v4(),
                item : 'writing',
                verb : 'read',
                contentVisible: false,
                href : ContentTypes.WRITING
            }
        ]
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----App");
        console.log("You are no ordinary web surfer. Catch me in the console, how bow dah?");

        if (this.props.location.pathname.length > 1) {
            this.toggleNav();
            const content = this.props.location.pathname.split("/")[1];
            let index;
            switch (content) {
                case "xr":
                    index = 0;
                    break;
                case "art":
                    index = 1;
                    break;
                case "music":
                    index = 2;
                    break;
                case "design":
                    index = 3;
                    break;
                case "resume":
                case "standalones":
                    index = 4;
                    break;
                case "writing":
                    index = 5;
                    break;
                default:
                    break;
            }

            this.toggleContent(index);
            this.setState({
                showFeedItemAtPath: `content${this.props.location.pathname}`
            });
        }
    }

    render() {

        return(
            <div className={this.state.navIsOpen ? "main" : "main white"}>
                <HamburgerIcon
                    toggleNav={this.toggleNav}
                    navIsOpen={this.state.navIsOpen}
                    contactIsOpen={this.state.contactIsOpen} />
                <HiddenNav
                    navIsOpen={this.state.navIsOpen}
                    contactIsOpen={this.state.contactIsOpen}
                    navItems={this.state.navItems}
                    toggleContent={this.toggleContent}
                    toggleSort={this.toggleSort}
                    sortByPopularity={this.state.sortByPopularity} />
                <Block
                    id="left-main-block"
                    position={"fixed"}
                    display={"block"}
                    top={0}
                    bottom={"auto"}
                    left={0}
                    right={"auto"}
                    vertCenter={false}
                    horCenter={false}
                    width={8}
                    height={"100vh"}
                    color={"#212323"}/>
                <Feed
                    feed={this.state.feed}
                    navIsOpen={this.state.navIsOpen}
                    navItems={this.state.navItems}
                    contactIsOpen={this.state.contactIsOpen}
                    feedScroll={this.state.feedScroll}
                    updateFeedScroll={this.updateFeedScroll}
                    openItem={this.openItem}
                    incrementor={this.incrementor} />
                <SocialBar
                    navIsOpen={this.state.navIsOpen}
                    contactIsOpen={this.state.contactIsOpen} />
                <ContactIcon
                    navIsOpen={this.state.navIsOpen}
                    toggleContact={this.toggleContact}
                    contactIsOpen={this.state.contactIsOpen}
                    feedScroll={this.state.feedScroll} />
                <ContactView
                    contactIsOpen={this.state.contactIsOpen}
                    saveContact={this.saveContact} />
                <ScrollButton
                     elementID="feed"
                     contactIsOpen={this.state.contactIsOpen}
                     feedScroll={this.state.feedScroll}/>
                 <ImageDialog
                     imageDialogIsOpen={this.state.imageDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}
                     browseTo={this.browseTo}/>
                 <ArticleDialog
                     articleDialogIsOpen={this.state.articleDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}
                     determineReadTime={this.determineReadTime}/>
                 <MusicDialog
                     musicDialogIsOpen={this.state.musicDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}
                     browseTo={this.browseTo}
                     incrementor={this.incrementor}/>
                 <VideoDialog
                     videoDialogIsOpen={this.state.videoDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}
                     browseTo={this.browseTo}
                     incrementor={this.incrementor}/>
                 <DesignDialog
                     designDialogIsOpen={this.state.designDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}
                     determineReadTime={this.determineReadTime}/>
                 <SkillsDialog
                     skillsDialogIsOpen={this.state.skillsDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}/>
                 <EducationDialog
                     educationDialogIsOpen={this.state.educationDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}/>
                 <ResumeDialog
                     resumeDialogIsOpen={this.state.resumeDialogIsOpen}
                     currentItem={this.state.currentItem}
                     toggleDialog={this.toggleDialog}/>
            </div>
        );
    }

    componentDidMount() {
        // console.log("++++++App");
        window.addEventListener("resize", this.rerender);
        this.populateFeed();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.showFeedItemAtPath && nextState.feed.length > 0) {
            const path = nextState.showFeedItemAtPath;
            let item;
            for (let i = 0; i < nextState.feed.length; i++) {
                const itemPath = nextState.feed[i].path;
                if (path === itemPath) {
                    item = nextState.feed[i];
                    break;
                }
            }

            this.openItem(item);
            this.incrementor("clicks", item);
            this.setState({
                showFeedItemAtPath: null,
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.rerender);
    }

    // ========== Methods ===========

     /**
      * Function attached to a listener connected to window element
      * Rerenders entire app when visitor adjusts browser size
      */
    rerender = () => {
        this.setState({});
    }

    /**
     * Used by the HamburgerIcon component to
     * toggle the boolean value of this.state.navIsOpen
     * to change the state of the Hidden Navigation component
     * from open to closed
     */
    toggleNav = () => {
        this.setState({
            navIsOpen: !this.state.navIsOpen
        });
    };

    /**
     * Toggles 'category' type in navigation section
     * @param  {str} category type of content to be toggled
     */
    toggleContent = (category) => {
        let navItems = this.state.navItems;
        navItems[category]["contentVisible"] = !navItems[category]["contentVisible"]

        this.setState({
            navItems: navItems,
            feed: []
        }, () => {this.populateFeed()});
    }

    /**
     * Toggles this.state.contactIsOpen variable, which in turne
     * toggles ContactView component in and out of viewport
     */
    toggleContact = () => {
        this.setState({
            contactIsOpen: !this.state.contactIsOpen
        });
    }

    /**
     * Stores the contact of a visitor onto Firebase database
     * @param  {obj} contact information of visitor
     */
    saveContact = (contact) => {
        firebase.database().ref('contacts/').transaction((data) => {
            if (data){
                data.push(contact);
            } else {
                data = [contact];
            }
            return data;
        });
    }

    /**
     * Fetches all data objects in feed
     */
    populateFeed = () => {
        let feed = [];

        let map = [
            {"ref": "content/xr","navItemIndex": 0},
            {"ref": "content/music/projects/ep","navItemIndex": 2},
            {"ref": "content/music/projects/lp","navItemIndex": 2},
            {"ref": "content/music/projects/formal_education","navItemIndex": 2},
            {"ref": "content/music/projects/freshmen","navItemIndex": 2},
            {"ref": "content/music/scores","navItemIndex": 2},
            {"ref": "content/design","navItemIndex": 3},
            {"ref": "content/resume","navItemIndex": 4},
            {"ref": "content/standalones","navItemIndex": 4},
            {"ref": "content/writing","navItemIndex": 5}
        ];

        this.asyncLoop(
            map.length,
            (loop, i) => {
                if (this.state.navItems[map[i]["navItemIndex"]]["contentVisible"]) {
                    firebase.database().ref(map[i]["ref"]).once('value', (snapshot) => {
                        for (let key in snapshot.val()) {
                            if (snapshot.val().hasOwnProperty(key)) {
                                feed.push(snapshot.val()[key]);
                            }
                        }
                        loop();
                    });
                } else {
                    loop();
                }
            },
            () => {
                // ART
                if (this.state.navItems[1]["contentVisible"]) {
                    firebase.database().ref('/content/art').once('value', (snapshot) => {
                        feed = feed.concat(snapshot.val())

                        // Set feed to state
                        this.setState({
                            feed: feed
                        }, () => {
                            this.sortFeed();
                        });
                    });
                } else {
                    // Set feed to state
                    this.setState({
                        feed: feed
                    }, () => {
                        this.sortFeed();
                    });
                }
            }
        );
    }

    /**
     * An asynchronous loop that enters next loop iteration
     * only once previous loop has completed all jobs
     * @param  {int}   length         number of iterations in loop
     * @param  {Function}   functionToLoop function to be looped
     * @param  {Function} callback       function to be executed once loop terminates
     */
    asyncLoop = (length, functionToLoop, callback) => {
        let i = -1;

        let loop = () => {
            i++;

            if (i==length) {
                callback();
                return;
            }

            functionToLoop(loop, i);
        }

        loop();
    }

    /**
     * Updates the scroll position of the feed element
     * @param  {int} scroll amount of pixels that feed has been scrolled
     */
    updateFeedScroll = (scroll) => {
        this.setState({
            feedScroll: scroll
        });
    }

    /**
     * Toggles dialogs in and out of viewport
     * @param  {str} dialog type of dialog to be toggled
     */
    toggleDialog = (dialog) => {
        switch (dialog) {
            case DialogTypes.IMAGE:
                this.setState({
                    imageDialogIsOpen: !this.state.imageDialogIsOpen
                });

                return;

            case DialogTypes.MUSIC:
                this.setState({
                    musicDialogIsOpen: !this.state.musicDialogIsOpen
                });

                return;

            case DialogTypes.ARTICLE:
                this.setState({
                    articleDialogIsOpen: !this.state.articleDialogIsOpen
                });

                return;

            case DialogTypes.DESIGN:
                this.setState({
                    designDialogIsOpen: !this.state.designDialogIsOpen
                });

                return;

            case DialogTypes.VIDEO:
                this.setState({
                    videoDialogIsOpen: !this.state.videoDialogIsOpen
                });

                return;

            case DialogTypes.SKILLS:
                this.setState({
                    skillsDialogIsOpen: !this.state.skillsDialogIsOpen
                });

                return;

            case DialogTypes.EDUCATION:
                this.setState({
                    educationDialogIsOpen: !this.state.educationDialogIsOpen
                });

                return;
            case DialogTypes.RESUME:
                this.setState({
                    resumeDialogIsOpen: !this.state.resumeDialogIsOpen
                });

                return;
        }
    }

    /**
     * Opens a feed item
     * @param  {obj} item information of feed item
     */
    openItem = (item) => {
        this.setState({
            currentItem: item
        }, () => {this.toggleDialog(item.dialog)});
    }

    /**
     * Navigates to previous or next item in an album/collection
     * Used by Dialog components
     * @param  {str} direction left or right
     */
    browseTo = (direction) => {
        let str = this.state.currentItem.path;
        let lastSlash = str.lastIndexOf("/");
        let imageIndex = parseInt(str.substring(lastSlash + 1, str.length));
        let newPath = str.substring(0, lastSlash);

        if (direction == "left") {
            newPath += `/${imageIndex - 1}`
        } else {
            newPath += `/${imageIndex + 1}`
        }

        firebase.database().ref(newPath).once(
            'value',
            (snapshot) => {
                let newItem = snapshot.val();

                if (newItem) {
                    this.setState({
                        currentItem: newItem
                    }, () => {
                        this.incrementor("clicks", this.state.currentItem);
                    });
                }
            },
            () => {
                return;
            }
        );
    }

    /**
     * Increments the heart count, clicks or plays of a feed item
     * @param  {obj} item JSON object of feed item
     */
    incrementor = (type, item) => {
        firebase.database().ref(item.path).transaction((node)=>{
            let timestamp = new Date().toISOString();

            if (node && node.hasOwnProperty(type)) {
                node[type].push(timestamp);
            } else if (node) {
                node[type] = [timestamp];
            }
            return node;
        }).then(() => {
            this.updateItem(item);
        });
    }

    /**
     * Updates an item in the feed state key
     * @param  {obj} item JSON object of updated feed item
     */
    updateItem = (item) => {
        firebase.database().ref(item.path).once(
            'value',
            (snapshot) => {
                let currentItem = snapshot.val();
                let feed = this.state.feed;
                feed[item.feedIndex] = currentItem;
                this.setState({
                    feed: feed,
                    currentItem: currentItem
            }, () => {
                this.sortFeed();
            });
        });
    }

    /**
     * Sorts the feed based on the state of sortByPopularity
     * If True, will sort by linear combination of clicks and hearts
     * and if False, will sort by reverse chronological order
     */
    sortFeed = () => {
        let feed = this.state.feed;
        let heartWeight = 5;
        let playWeight = 5;
        let clickWeight = 1;

        if (this.state.sortByPopularity) {
            // Sort by Popularity
            feed.sort((a,b) => {
                let aClicks = 0;
                let aHearts = 0;
                let aPlays = 0;
                let bClicks = 0;
                let bHearts = 0;
                let bPlays = 0;

                if (a.clicks) {
                    aClicks = a.clicks.length;
                }

                if (a.hearts) {
                    aHearts = a.hearts.length;
                }

                if (a.plays) {
                    aPlays = a.plays.length;
                }

                if (b.clicks) {
                    bClicks = b.clicks.length;
                }

                if (b.hearts) {
                    bHearts = b.hearts.length;
                }

                if (b.plays) {
                    bPlays = b.plays.length;
                }

                a = clickWeight * aClicks + heartWeight * aHearts + playWeight * aPlays;
                b = clickWeight * bClicks + heartWeight * bHearts + playWeight * bPlays;

                return b - a;
            });
        } else {
            // Sort by Reverse Chronological Order
            feed.sort((a,b) => {
                a = parseInt(a.date.substring(a.date.length - 4));
                b = parseInt(b.date.substring(b.date.length - 4));
                return b - a;
            });
        }

        this.setState({
            feed: feed
        });
    }

    /**
     * Toogles the sort method for the feed
     */
    toggleSort = () => {
        let sortByPopularity = !this.state.sortByPopularity;
        this.setState({
            sortByPopularity: sortByPopularity
        }, () => {
            this.sortFeed();
        });
    }

    /**
     * Used by DesignDialog and ArticleDialog components to
     * estimate the length (in minutes) of currentAsset item
     * @return {str} length (in minutes) of article
     */
    determineReadTime = (article) => {
        let avgWPM = 275;   // Reading speed og an adult (roughly 275 WPM)
        let numWords = 0;   // Number of detected words
        let numImages = 0;  // Number of detected images
        let imgSecs = 12;   // Number of seconds applied for current images. Decrements as a function of seen images
        let readTime = 0;   // Stores final read time

        // Accumulate number of words and images
        for (let i in article.assets) {
            switch (article.assets[i]["type"]) {
                case DesignAssetTypes.HEADING:
                    numWords += this.wordCount(article.assets[i]["asset"]["data"]);
                    continue;

                case DesignAssetTypes.LEFT_BLOCK:
                    numWords += this.wordCount(article.assets[i]["asset"]["text"]);
                    continue;

                case DesignAssetTypes.RIGHT_BLOCK:
                    numWords += this.wordCount(article.assets[i]["asset"]["text"]);
                    continue;

                case DesignAssetTypes.PARAGRAPH:
                    numWords += this.wordCount(article.assets[i]["asset"]["data"]);
                    continue;

                case DesignAssetTypes.IMAGE:
                    numImages += 1;
                    continue;

                case DesignAssetTypes.DOUBLE_IMAGE:
                    numImages += 2;
                    continue;

                case DesignAssetTypes.IMAGE_VIDEO:
                    numImages += 1;
                    // We don't count video times
                    continue;

                case DesignAssetTypes.VIDEO_IMAGE:
                    numImages += 1;
                    // We don't count video times
                    continue;

                case DesignAssetTypes.VIDEO:
                    // We don't count video times
                    continue;

                case DesignAssetTypes.DOUBLE_VIDEO:
                    // We don't count video times
                    continue;

                case DesignAssetTypes.QUOTE:
                    numWords += this.wordCount(article.assets[i]["asset"]["data"]);
                    continue;

                case DesignAssetTypes.DICTIONARY:
                    numWords += article.assets[i]["asset"]["term"].length;
                    for (let j in article.assets[i]["asset"]["definitions"]) {
                        if (article.assets[i]["asset"]["definitions"][j] instanceof Array) {
                            for (let k in article.assets[i]["asset"]["definitions"][j]) {
                                numWords += this.wordCount(article.assets[i]["asset"]["definitions"][j][k]);
                            }
                        } else {
                            numWords += this.wordCount(article.assets[i]["asset"]["definitions"][j]);
                        }
                    }
                    continue;

                case DesignAssetTypes.YOUTUBE:
                    // We don't count video times
                    continue;

                case DesignAssetTypes.LIST:
                    for (let j in article.assets[i]["asset"]["data"]) {
                        numWords += this.wordCount(article.assets[i]["asset"]["data"][j]);
                    }
                    continue;
            }
        }

        // Translate word and image count into time measurement
        readTime = numWords / avgWPM;

        // Count 12 seconds for the first image
        // 11 for the second
        // and minus an additional second for each subsequent image
        //  Any images after the tenth image are counted at three seconds.
        let imgTime = 0
        while (imgSecs > 3 && numImages > 0){
            imgTime += imgSecs;
            imgSecs -= 1;
            numImages -= 1;
        }

        if (numImages > 0) {
            imgTime += numImages * imgSecs;
        }

        readTime += imgTime / 60;
        readTime = Math.ceil(readTime);

        return readTime;
    }
    /**
     * A helper function for this.determineReadTime() that
     * counts the number of words in a string
     * @param  {str} str string of words
     * @return {int}     number of words in 'str'
     */
    wordCount = (str) => {
        return str.split(" ").length;
    }

} //END App

export default withRouter(App);
