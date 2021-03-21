import React from 'react';
import Bar from './Bar';
import equal from 'fast-deep-equal'

class MusicSheet extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.bars !== prevProps.bars) {
            this.setState({
                load: true,
            });
        }
    }


    render() {

        const bars = [];


        for (let i = 0; i < this.props.bars; i++) {
            bars.push(<Bar song={this.props.song} number={i} key={i} playNote={this.props.playNote}
                addNote={this.props.addNote} removeNote={this.props.removeNote} />);
        }

        return (<div className="musicSheet">
            {bars}

        </div>);
    }
}

export default MusicSheet;