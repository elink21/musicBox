import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
    const top = 5;
    const left = 30;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        height: 500,
        overflowY: 'scroll',
        padding: '20px',
        backgroundColor: 'white',
    },
}));

export default function SimpleModal(props) {
    

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            
            <h4 id="simple-modal-title" className="centerText">We're sorry 人(_ _*)</h4>
            <small>Since this is a serveless app, we can't provide you a direct download, but
                you can still copy and paste your song as JSON file.
            </small>

            <p id="simple-modal-description">
                {props.prettySong}                
            </p>

        </div>
    );

    

    return (
        <div>
            <a className="btn-floating btn-large red" onClick={handleOpen}>
                <i className="material-icons">file_download</i>
                </a>
            <Modal
                className="z-depth-3"
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}