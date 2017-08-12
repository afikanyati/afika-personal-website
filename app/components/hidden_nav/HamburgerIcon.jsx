import React from 'react';

/**
 * The hamburger icon is a button which opens the HiddenNav panel on the left of the interface.
 * The icon is visually located on the far left of the CurationHeader, and appears as 3 parrellel
 * horizontal line segments.
 */
export default ({navIsOpen, toggleNav}) => {
    return (
        <div>
            <input type="checkbox" id="nav-trigger" className="nav-trigger" checked={navIsOpen} />
        	<label className={navIsOpen ? "nav-trigger-icon is-active" : "nav-trigger-icon"} htmlFor="nav-trigger">
        		<button
                    onClick={toggleNav}
                    className={navIsOpen ? "hamburger is-active" : "hamburger"}>
        			<span> </span>
        		</button>
        	</label>
        </div>

    );
}
