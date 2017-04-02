import * as React from 'react';
import * as cx from 'classnames';

import {generator} from 'shell/index';

interface IProps {
    src?:string;
    s?:number;
}

interface IState {

}

export default class Audio extends React.Component<IProps, IState> {
    elementId = generator.genId();
    audioInitialized = false;

    componentDidMount() {
        this.initAudio();
    }

    componentDidUpdate() {
        this.initAudio();
    }

    initAudio(){
        if(this.props.src && !this.audioInitialized){
            $('#' + this.elementId).audioPlayer();
            this.audioInitialized = true;
        }
    }

    render() {
        const s = 's' + (this.props.s ? this.props.s : 12);
        let classesObject = {
            'col': true
        };
        classesObject[s] = true;
        const classes = cx(classesObject);
        return (
            <div className={classes}>
                <audio id={this.elementId} src={this.props.src}/>
            </div>
        )
    }
}