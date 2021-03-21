import React from 'react';
import Note from './Note';

class Line extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let notes = []
        let key = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                notes.push(<Note song={this.props.song} key={key} bar={this.props.bar} note={this.props.note} quarter={i} sixteenth={j * 2} playNote={this.props.playNote}
                    addNote={this.props.addNote} removeNote={this.props.removeNote} />);
                key += 1;
            }

        }
        return (
            <div className="line">
                {notes}
            </div>
        );
    }
}

export default Line;