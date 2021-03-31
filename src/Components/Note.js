import React from 'react';
import equal from 'fast-deep-equal'
import InteractionContext from '../Context/InteractionContext'

class Note extends React.Component {

    static contextType = InteractionContext;

    constructor(props) {
        super(props);
        let active = false;
        let color = "white";
        if (this.searchForActive()) {
            active = true;
            color = "#f500567a";
        }
        this.state = {
            set: active,
            styles: {
                backgroundColor: color,
            }
        };
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.song, prevProps.song)) {
            console.table(prevProps.song);
            let active = false;
            
            let color = "white";
            if (this.searchForActive()) {
                active = true;
                color = "#f500567a";

            }
            this.setState({
                set: active,
                styles: {
                    backgroundColor: color,
                }
            });
        }
    }



    searchForActive() {
        let time = `${this.props.bar}:${this.props.quarter}:${this.props.sixteenth}`;

        for (let chord of this.props.song) {
            if (chord.time === time && chord.note.includes(this.props.note)) {
                return true;
            }
        }
    }



    printData() {
        console.log(this.props.noteType, this.props.quarter);
    }


    render() {

        const preventDefault = (e) => e.preventDefault();


        const handleClick = (event) => {
            event.preventDefault();

            if (this.context === "false") {
                return;
            }

            if (event.button === 0) {
                this.props.playNote(this.props.note);
                this.setState({ "set": 1, styles: { backgroundColor: "#f500567a" } });
                this.props.addNote(this.props.bar, this.props.quarter, this.props.sixteenth, this.props.note);
            }
            else if (event.button === 2) {
                this.setState({ "set": 0, styles: { backgroundColor: "white" } });
                this.props.removeNote(this.props.bar, this.props.quarter, this.props.sixteenth, this.props.note);
            }
        }
        return (<div onContextMenu={preventDefault} onMouseDown={handleClick} style={this.state.styles} >

        </div>);
    }
}

export default Note;