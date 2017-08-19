// Libs
import React                from 'react';
import firebase             from 'firebase';
import PropTypes            from 'prop-types';
import Img                  from 'react-image';
import JsxParser            from 'react-jsx-parser';

// Components
import DialogTypes          from '../../constants/dialogTypes';
import CloseButton          from '../buttons/CloseButton';
import ImagePlaceholder     from '../feed/ImagePlaceholder';
import Italic               from './Italic';
import Bold                 from './Bold';
import Link                 from './Link';
import Code                 from './Code';

/**
 * The Accordion is a helper function for the EducationDialog. It creates
 * an accordion UI element to house nested education particulars.
 */
export default class Accordion extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Accordion");
    }

    render() {
        return (
            <div className="accordion">
                {this.props.sections.map((section, index, sections) => {
                    return (
                        <div>
                            <div
                                id={section.title}
                                className="accordion-item"
                                onClick={this.toggleOpen.bind({}, section.title)}
                                onTouchTap={this.toggleOpen.bind({}, section.title)}
                                style={{
                                    zIndex: sections.length + 1
                                }}>
                                <div className="education-logo-wrapper">
                                    <Img
                                        src={section.thumbnail}
                                        loader={<ImagePlaceholder category={"image"} height={"auto"}/>} />
                                </div>
                                <div className="education-info-wrapper">
                                    <h2 className="accordion-item-title">{section.title}</h2>
                                    <h3 className="accordion-item-subtitle">{section.subtitle}</h3>
                                </div>
                                <div className="education-years-wrapper">
                                    <h3 className="education-years">{section.date}</h3>
                                </div>
                            </div>
                            <div
                                className="accordion-content"
                                style={{
                                    zIndex: sections.length - index
                                }}>
                                <div className="sub-accordion">
                                {section.semesters.map((semester, index, semesters)  => {
                                        return (
                                            <div>
                                                <div
                                                    id={semester.title}
                                                    className="sub-accordion-item"
                                                    onClick={this.toggleOpen.bind({}, semester.title)}
                                                    onTouchTap={this.toggleOpen.bind({}, semester.title)}
                                                    style={{
                                                        zIndex: semesters.length + 1
                                                    }}>
                                                    <h2 className="sub-accordion-title">{semester.title}</h2>
                                                    <h3 className="sub-accordion-subtitle">{semester.date}</h3>
                                                    <img className="sub-accordion-arrow" src="assets/images/icons/arrow_right_gray.svg" />
                                                </div>
                                                <div
                                                    className="sub-accordion-content"
                                                    style={{
                                                        zIndex: semesters.length - index
                                                    }}>
                                                    <div className="classes-wrapper">
                                                        {semester.classes.map(subject => {
                                                            return (
                                                                <p className="class">
                                                                    <span className="class-name"
                                                                        style={
                                                                            subject.number == "" && subject.grade == "" ?
                                                                            {
                                                                                flex: "auto"
                                                                            }
                                                                        :
                                                                            null
                                                                        }>
                                                                        <JsxParser
                                                                            bindings={{}}
                                                                            components={{Italic, Link, Bold, Code}}
                                                                            jsx={subject.title}/>
                                                                    </span>
                                                                    <span className="class-number"
                                                                        style={
                                                                            subject.number == "" && subject.grade == "" ?
                                                                            {
                                                                                flex: "auto"
                                                                            }
                                                                        :
                                                                            null
                                                                        }>{subject.number}</span>
                                                                    <span className="class-grade">{subject.grade}</span>
                                                                </p>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++Accordion");
    }

    /**
     * Toggles CSS open tag to clicked elements
     * @param  {string} id HTML id of clicked element
     */
    toggleOpen = (id) => {
        let element = document.getElementById(id);
        if (element.classList.contains('open')) {
            element.classList.remove('open');
        } else {
            element.classList.add('open');
        }
    }
}

// ============= PropTypes ==============

Accordion.propTypes = {
    sections: PropTypes.array.isRequired
};
