// Libs
import React          from 'react';
import firebase       from 'firebase';
// Files

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----Feed");
    }

    render() {
        return (

        );
    }

    componentDidMount() {
        console.log("+++++Feed");
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // ========== Methods ===========

}

// ============= PropTypes ==============

HiddenNav.propTypes = {

};
