import React from 'react';
import Bar from './Bar';
import * as Tone from 'tone'

class MusicSheet extends React.Component {
    constructor(props) {

        super(props);
        this.playNote = this.playNote.bind(this);
        Tone.Transport.bpm.value = 140;

        /*
        this.sampler = new Tone.Sampler({
            urls: {
                Eb2: "Eb2.mp3",
                Eb1: "Eb1.mp3",
                F2: "F2.mp3",
                F1: "F1.mp3",
                G1: "G1.mp3",
                G2: "G2.mp3",
                Db1: "Db1.mp3",
                Db2: "Db2.mp3",
                C2: "C2.mp3",
            },
            release: 1,
            baseUrl: "instruments/musicBox",
            onload: () => {
                alert("Loaded");
            }
        }).toDestination();
        */
       this.synth= new Tone.Synth().toDestination();
    }

    playNote(note)
    {
        this.synth.triggerAttackRelease(note,"4n");
    }



    render() {

        const bars = [];


        for (let i = 0; i < this.props.bars; i++) {
            bars.push(<Bar number={i} key={i} playFn={this.playNote} />);
        }

        return (<div className="musicSheet">
            {bars}

        </div>);
    }
}

export default MusicSheet;