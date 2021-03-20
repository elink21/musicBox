import React from 'react';
import Line from './Line';

class Bar extends React.Component {

    render() {
        const notes = ["C", "B", "A", "G", "F", "E", "D"]
        const lines = [];
        for (let i = 0; i < 15; i++) {
            lines.push(
                <Line key={i} note={notes[i % 7].toString() + (3  - parseInt(i / 7))} bar={this.props.number} playNote={this.props.playNote} removeNote={this.props.removeNote} addNote={this.props.addNote} />)
        }
        return (
            <div className="bar z-depth-1" id={'bar' + this.props.number}>
                {lines}
            </div>
        );
    }
}

export default Bar;