// Libs
import React          from 'react';
import firebase       from 'firebase';
import PropTypes      from 'prop-types';
import Snackbar         from 'material-ui/Snackbar';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Files

export default class ContactView extends React.Component {

    state = {
        errors          : [],                   // Used to store Auth errors from Firebase and Registration errors
        errorType       : {},                   // Used to keep track of the type of error encountered to highlight relevant input field
        currentError    : "",                   // Used to store the current error to be displayed in the snackbar
        contactSent: false                      // Used by Send Arrow to know when to animate
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----ContactView");
    }

    render() {
        let errorStyle = {
            borderBottom: '3px solid #5a4570'
        };

        let contactFormStyle = {
            height: window.innerHeight - 130
        }

        return (
            <div
                className={this.props.contactIsOpen ? "contact-form-wrapper" : "contact-form-wrapper remove"}>
                <img
                    className="contact-form-logo"
                    src="assets/images/my_logos/afika_logo_white.svg" />
                <form
                    className={this.state.contactSent ? "contact-form sent" : "contact-form"}
                    style={contactFormStyle}>
                    <div className="left-form">
                        <p>
                            Name<span className="asterisk"> *</span><br/>
                        <span className="form-input-wrapper">
                                <input
                                    type="text"
                                    id="contact-name"
                                    ref="name"
                                    style={this.state.errorType.name ? errorStyle : null}
                                    placeholder=""
                                    required="true"
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off" />
                            </span>
                        </p>
                        <p>
                            Email<span className="asterisk"> *</span><br/>
                        <span className="form-input-wrapper">
                                <input
                                    type="email"
                                    id="contact-email"
                                    ref="email"
                                    style={this.state.errorType.email ? errorStyle : null}
                                    placeholder=""
                                    required="true"
                                    maxLength="100" />
                            </span>
                        </p>
                        <p>
                            Subject<br/>
                        <span className="form-input-wrapper">
                                <input
                                    type="text"
                                    id="contact-subject"
                                    ref="subject"
                                    style={this.state.errorType.subject ? errorStyle : null}
                                    placeholder=""
                                    required="true"
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength="1000" />
                            </span>
                        </p>
                    </div>
                    <div className="right-form">
                        <p className="message">
                            Message<br/>
                        <span className="form-input-wrapper">
                                <textarea
                                    id="contact-message"
                                    ref="message"
                                    style={this.state.errorType.message ? errorStyle : null}
                                    placeholder=""
                                    maxLength="10000" />
                            </span>
                        </p>
                        <p>
                            <button
                                id="contact-submit-button"
                                type="submit"
                                onClick={this.createContact}>
                                <span>SEND</span>
                                <svg
                                    version="1.1"
                                    id="contact-form-send-icon"
                                    x="0px"
                                    y="0px"
                                    width="50px"
                                    height="50px"
                                    viewBox="0 0 50 50"
                                    enableBackground="new 0 0 50 50">
                                    <path fill="#FFFFFF" d="M25,0l-4.406,4.406l17.438,17.469H0v6.25h38.031L20.594,45.594L25,50l25-25L25,0z"/>
                                </svg>
                            </button>
                        </p>
                    </div>
                </form>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="snackbar-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000}/>
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++ContactView");
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contactSent: false
        });
    }

    // ========== Methods ===========

    createContact = (e) => {
        e.preventDefault();

        if (!this.state.contactSent) {
            // Clear errors from any previous form submission
            this.state.errors = [];
            this.state.errorType = {};

            let contact = {};
            let name = this.refs.name.value;
            let email = this.refs.email.value;
            let subject = this.refs.subject.value;
            let message = this.refs.message.value;

            if(name.length == 0) {
                this.state.errors.push("Please enter a your name.");

                let errorType = this.state.errorType;
                errorType.name = true;
                this.setState({
                    errorType: errorType
                });
            }

            if(email.length == 0) {
                this.state.errors.push("Please enter an email address.");

                let errorType = this.state.errorType;
                errorType.email = true;
                this.setState({
                    errorType: errorType
                });
            } else if(!/.+@.+\..+/.test(email)) {
                this.state.errors.push("The email address you supplied is invalid. Please enter a valid email address.");

                let errorType = this.state.errorType;
                errorType.email = true;
                this.setState({
                    errorType: errorType
                });
            }

            if(this.state.errors.length == 0) {
                contact.name = name;
                contact.email = email;

                if (subject) {
                    contact.subject = subject;
                }

                if (message) {
                    contact.message = message;
                }

                this.props.saveContact(contact);
                this.clearForm();
                this.setState({
                    contactSent: true
                });

                this.state.errors.push("Thanks for reaching out. I look forward to connecting with you!");
                this.setState({
                    currentError: "Thanks for reaching out. I look forward to connecting with you!"
                });

                // Clear Errors
                setTimeout(() => {
                    this.setState({
                        errors: [],
                        errorType: {},
                        currentError: ""
                    });
                }, 4000);
            }

            for(let i = 0; i < this.state.errors.length; i++) {
                setTimeout(() => {
                    this.setState({
                        currentError: this.state.errors[i]
                    });
                    console.log(this.state.errors[i]);
                }, 3000 * i);
            }
        }
    }

    clearForm = () => {
        this.refs.name.value = "";
        this.refs.email.value = "";
        this.refs.subject.value = "";
        this.refs.message.value = "";
    }
}

// ============= PropTypes ==============

ContactView.propTypes = {
    contactIsOpen: PropTypes.bool.isRequired,
    saveContact: PropTypes.func.isRequired
};
