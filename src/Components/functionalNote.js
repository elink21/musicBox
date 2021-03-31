import React, { useState, useEffect, useContext } from 'react';
import equal from 'fast-deep-equal'
import InteractionContext from '../Context/InteractionContext'


function Note(props) {
    const interactionEnable = useContext(InteractionContext);


    const [active, setActive] = useState(false);
    const [styles, setStyles] = useState({ backgroundColor: "white" })


    const searchForActive = () => {
        let time = `${props.bar}:${props.quarter}:${props.sixteenth}`;

        for (let chord of props.song) {
            if (chord.time === time && chord.note.includes(props.note)) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        if (searchForActive() === true) {
            setStyles({ backgroundColor: '#f500567a' });
            setActive(true);
        } else {
            setStyles({ backgroundColor: "white" });
            setActive(false);
        }
    }, [props.song, active]);



    const preventDefault = (e) => e.preventDefault();


    const handleClick = (event) => {
        event.preventDefault();

        if (interactionEnable === "false") {
            return;
        }

        if (event.button === 0) {
            props.playNote(props.note);
            setActive(true);
            setStyles({ backgroundColor: "#f500567a" });
            
            
            props.addNote(props.bar, props.quarter, props.sixteenth, props.note);
            props.addNote(props.bar, props.quarter, props.sixteenth, props.note);

            /*Playing note */
            
        }
        else if (event.button === 2) {
            setActive(false);
            setStyles({ backgroundColor: "white" });
            props.removeNote(props.bar, props.quarter, props.sixteenth, props.note);
        }
    }



    return (<div onContextMenu={preventDefault} onMouseDown={handleClick} style={styles} >

    </div>);
}

export default Note;