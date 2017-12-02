import * as React from 'react';

interface IProps {}

interface IState {}

export default class InputFile extends React.Component<IProps, IState> {
    render () {
        return (
            <form method="post" encType="multipart/form-data" action="/Api/Test/Test">
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input ref="file" type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <button type="submit">Test</button>
            </form>
        );
    }
}