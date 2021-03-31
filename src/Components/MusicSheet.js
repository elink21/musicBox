import React from 'react';
import Bar from './Bar';
import equal from 'fast-deep-equal'
import InteractionContext from '../Context/InteractionContext';

class MusicSheet extends React.Component {

    static contextType = InteractionContext;

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
            bars.push(<Bar  song={this.props.song} number={i} key={i} playNote={this.props.playNote}
                addNote={this.props.addNote} removeNote={this.props.removeNote} />);
        }

        return (<div className={this.context==="true"?"musicSheet":"musicSheetPlayer"}>
            {bars}

        </div>);
    }
}

export default MusicSheet;