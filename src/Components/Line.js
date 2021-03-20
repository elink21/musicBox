import React from 'react';
import Note from './Note';

class Line extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="line">
                <Note bar={this.props.bar} note={this.props.note} quarter="1" playNote={this.props.playNote} addNote={this.props.addNote} removeNote={this.props.removeNote} />
                <Note bar={this.props.bar} note={this.props.note} quarter="2" playNote={this.props.playNote} addNote={this.props.addNote} removeNote={this.props.removeNote} />
                <Note bar={this.props.bar} note={this.props.note} quarter="3" playNote={this.props.playNote} addNote={this.props.addNote} removeNote={this.props.removeNote} />
                <Note bar={this.props.bar} note={this.props.note} quarter="4" playNote={this.props.playNote} addNote={this.props.addNote} removeNote={this.props.removeNote} />
            </div>
        );
    }
}

export default Line;