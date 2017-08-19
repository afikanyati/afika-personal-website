// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import Masonry              from 'react-masonry-component';
import Img                  from 'react-image';

// Components
import DialogTypes          from '../../constants/dialogTypes';
import CloseButton          from '../buttons/CloseButton';
import ImagePlaceholder     from '../feed/ImagePlaceholder';

/**
 * The SkillsDialog is one of various Dialog components used to render
 * the Skills asset. It makes use of the Material UI Dialog Component.
 */
export default class SkillsDialog extends React.Component {

    state = {
        skills: [],
        skillIcon: "assets/images/icons/skill_gray.svg",
        skillName: "Skill Name",
        skillProficiency: "Proficiency Level"
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SkillsDialog");
    }

    render() {
        let masonryOptions = {
            transitionDuration: 0
        };

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Dialog
                        modal                       ={true}
                        onRequestClose              ={this.props.toggleDialog.bind({}, DialogTypes.SKILLS)}
                        open                        ={this.props.skillsDialogIsOpen}
                        autoScrollBodyContent       ={true}
                        titleClassName              ="skills-dialog-title"
                        actionsContainerClassName   ="skills-dialog-actions"
                        bodyClassName               ="skills-dialog-body"
                        contentClassName            ="skills-dialog-content" >
                        <CloseButton
                            position={"fixed"}
                            top={20}
                            bottom={"auto"}
                            left={"auto"}
                            right={30}
                            vertCenter={false}
                            horCenter={false}
                            onClick={this.handleClose} />
                        <div className="skills-wrapper">
                            <h1 className="skills-title">
                                Skills
                            </h1>
                            <div className="skill-viewport">
                                <div className="skill-image-wrapper">
                                    <Img
                                        className="skill-icon"
                                        src={this.state.skillIcon}
                                        loader={<ImagePlaceholder category={"skill"} height={"30vw"}/>} />
                                </div>
                                <h3 className="skill-name">
                                    {this.state.skillName}
                                </h3>
                                <h3 className="skill-proficiency">
                                    {this.state.skillProficiency}
                                </h3>
                            </div>
                            <div className="wordcloud-wrapper">
                                <Masonry
                                    className       ="wordcloud"
                                    elementType={'div'}
                                    options={masonryOptions}
                                    disableImagesLoaded={false}
                                    updateOnEachImageLoad={false}
                               >
                                {this.state.skills.map(skill => {
                                    return (
                                        <h3 className="word"
                                            style={{
                                                fontSize: skill.value * 10,
                                                color: skill.color,
                                                margin: skill.margin
                                            }}
                                            onClick={this.toggleSkill.bind({}, skill)}>
                                            {skill.text}
                                        </h3>
                                    );
                                })}
                                </Masonry>
                            </div>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++SkillsDialog");
        if (this.props.currentItem.skills) {
            let shuffledSkills = this.props.currentItem.skills.sort(function() { return 0.5 - Math.random() });

            this.setState({
                skills: shuffledSkills
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentItem.skills) {
            let skills = this.assignRandomColorAndMargin(nextProps.currentItem.skills);
            let shuffledSkills = skills.sort(function() { return 0.5 - Math.random() });

            this.setState({
                skills: shuffledSkills
            });
        }
    }

    /**
     * Imports a clicked skills information to the skill viewport
     * @param  {str} skill selected skill
     */
    toggleSkill = (skill) => {
        this.setState({
            skillIcon: skill.data,
            skillName: skill.text,
            skillProficiency: skill.proficiency
        });
    }

    /**
     * Assigns a random margin and color from the color theme to each skill
     * @param  {array} skillsList array of skills
     * @return {array}            array of skills with color and margins
     */
    assignRandomColorAndMargin = (skillsList) => {
        for (let i in skillsList) {
            let colors = ["#190f27", "#5a4570", "#dbd7cf", "#989898"];
            let margins = ["5px", "10px", "15px"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            let randomMargin = margins[Math.floor(Math.random() * margins.length)];
            skillsList[i]["color"] = randomColor;
            skillsList[i]["margin"] = randomMargin;
        }

        return skillsList;
    }

    /**
     * Resets state variables and closes dialog
     */
    handleClose = () => {
        this.setState({
            skillIcon: "assets/images/icons/skill_gray.svg",
            skillName: "Skill Name",
            skillProficiency: "Skill Proficiency"
        }, () => {this.props.toggleDialog(DialogTypes.SKILLS)});
    }
}

// ============= PropTypes ==============

SkillsDialog.propTypes = {
    skillsDialogIsOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired
};
