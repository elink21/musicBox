import React from 'react';
import Bar from './Bar';
import * as Tone from 'tone'

class MusicSheet extends React.Component {
    constructor(props) {

        super(props);
        this.playNote = this.playNote.bind(this);
        this.playSong = this.playSong.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.addNote = this.addNote.bind(this);
        Tone.Transport.bpm.value = 140;
        this.song = []//format [["bar:quarter",note]];


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
                C1: 'C1.mp3',
                Ab3: 'Ab3.mp3',
                Bb1: 'Bb1.mp3',
                Bb2: 'Bb2.MP3'
                
            },
            release: 1,
            baseUrl: `${process.env.PUBLIC_URL}/instruments/musicBox/`,
            onload: () => {
                console.log("loaded");
            }
        }).toDestination();

        this.synth = new Tone.Synth().toDestination();
    }

    playSong() {
        const part = new Tone.Part(
            (time, note) => {
                // the notes given as the second element in the array
                // will be passed in as the second argument
                this.sampler.triggerAttackRelease(note, "4n", time);
            }, this.song
        ).start(0);

        Tone.Transport.position = 0;
        Tone.Transport.start();


    }

    playNote(note) {
        this.sampler.triggerAttackRelease(note, "4n");
    }

    removeNote(bar, quarter, note) {
        for (let i = 0; i < this.song.length; i++) {
            let e = this.song[i];
            if (e[0] === `${bar}:${quarter}` && e[1] === note) {
                this.song = this.song.splice(i, 1);
                console.table(this.song);

                return 1;
            }
        }
        return 0;
    }

    addNote(bar, quarter, note) {
        this.song.push([`${bar}:${quarter}`, note]);
        console.table(this.song);
    }



    render() {

        const bars = [];


        for (let i = 0; i < this.props.bars; i++) {
            bars.push(<Bar number={i} key={i} playNote={this.playNote} addNote={this.addNote} removeNote={this.removeNote} />);
        }

        return (<div className="musicSheet">
            {bars}

        </div>);
    }
}

export default MusicSheet;