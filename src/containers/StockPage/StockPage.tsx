import * as React from 'react';

interface IProps {}

interface IState {}

export default class StockPage extends React.Component<IProps, IState> {
    render () {
        return (
            <form method="post" encType="multipart/form-data" action="/Api/Test/Test">
                <div className="file-field input-field">
                    <div className="btn">
                        <span>{i18next.t('baseFile')}</span>
                        <input ref="file" type="file" name="base"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>{i18next.t('stockFile')}</span>
                        <input ref="file" type="file" name="stock"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <button type="submit" className="btn waves-effect waves-light">{i18next.t('load')}</button>
            </form>
        );
    }
}