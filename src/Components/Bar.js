import React from 'react';
import Line from './Line';

class Bar extends React.Component {

    render() {
        let notes = ["C6", "B5", "A5", "G5", "F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"]
        const lines = [];
        for (let i = 0; i < 15; i++) {
            lines.push(
                <Line key={i} note={notes[i]}  song={this.props.song}
                bar={this.props.number} playNote={this.props.playNote} 
                removeNote={this.props.removeNote} addNote={this.props.addNote} />)
        }
        return (
            <div className="bar z-depth-1" id={'bar' + this.props.number}>
                {lines}
            </div>
        );
    }
}

export default Bar;