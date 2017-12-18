// Libs
import React            from 'react';
import PropTypes        from 'prop-types';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';

/**
 * The SortWidget component is used by the Feed component to determine the Sort algorithms
 * to use to sort Feed items. Has two states: Sort by Reverse Chronological Order or by Popularity
 * which is a function of the number of clicks and number of hearts a given FeedItem has received.
 */
export default class SortWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log("-----SortWidget");
    }

    render() {
        const heartTooltip = (
            <Tooltip className="tooltip">
        		Sort by Popularity
            </Tooltip>
        );

        const timeTooltip = (
            <Tooltip className="tooltip">
                Sort by Time
            </Tooltip>
        );

        return (
            <div className="sort-widget-wrapper">
                <h2 className="sort-heading">Sort</h2>
                <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={heartTooltip}>
                        <svg
                            version="1.1"
                            id={this.props.sortByPopularity ?
                                "sort-heart-purple"
                            :
                                "sort-heart"
                            }
                            x="0px"
                            y="0px"
                            width="50px"
                            height="50px"
                            viewBox="0 0 50 50"
                            enableBackground="new 0 0 50 50">
                            <path fill="#DEDEDD" d="M25,47.953l-3.627-3.302C8.489,32.968-0.017,25.263-0.017,15.806c0-7.705,6.054-13.759,13.759-13.759
            	            c4.353,0,8.531,2.026,11.258,5.229c2.727-3.202,6.905-5.229,11.258-5.229c7.705,0,13.759,6.054,13.759,13.759
            	            c0,9.456-8.506,17.162-21.39,28.87L25,47.953z"/>
                        </svg>
                </OverlayTrigger>
                <input id="sort-widget" className="button slide-square" type="checkbox" />
                <label
                    onClick={this.props.toggleSort}
                    htmlFor="sort-widget" />
                <OverlayTrigger
                        placement   ="bottom"
                        overlay     ={timeTooltip}>
                        <svg
                            version="1.1"
                            id={this.props.sortByPopularity ?
                                "sort-clock"
                            :
                                "sort-clock-purple"
                            }
                            x="0px"
                            y="0px"
                            width="50px"
                            height="50px"
                            viewBox="-1 0 50 50"
                            enableBackground="new -1 0 50 50">
                            <path
                                fill="#DEDEDD"
                                d="M23.973,0C10.174,0-1,11.199-1,24.998s11.174,24.998,24.973,24.998c13.824,0,25.023-11.199,25.023-24.998
                            	S37.797,0,23.973,0z M23.998,44.997C12.949,44.997,4,36.047,4,24.998S12.949,5,23.998,5s19.998,8.949,19.998,19.998
                            	S35.047,44.997,23.998,44.997z"/>
                            <path fill="#DEDEDD" d="M25.248,12.499h-3.75v14.999l13.124,7.874l1.875-3.075l-11.249-6.674V12.499z"/>
                        </svg>
                </OverlayTrigger>
    		</div>
        );
    }

    componentDidMount() {
        // console.log("+++++SortWidget");

    }
}

// ============= PropTypes ==============

SortWidget.propTypes = {
    toggleSort: PropTypes.func.isRequired,
    sortByPopularity: PropTypes.bool.isRequired
};
