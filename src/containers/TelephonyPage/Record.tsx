import * as React from 'react';

import {generator} from 'shell/index';

interface Props {
    src:string;
    recordName:string;
}

interface State {

}

export default class Record extends React.Component<Props,State> {
    audioId:string = generator.genId();

    componentDidMount() {
        let id = this.audioId;
        let src = this.props.src;
        let recordName = this.props.recordName;
        $('#' + id).replaceWith($('<audio>', {//TODO: needs optimization
            'id': id,
            'src': src
        }));

        $('#' + id).parent().append($('<a>', {
            download: recordName, //TODO: use record name as filename
            href: src,
            html: i18next.t('download')
        }));

        $('#' + id).audioPlayer();
    }

    render() {
        return (
            <div>
                <span id={this.audioId}/>
            </div>
        )
    }
}