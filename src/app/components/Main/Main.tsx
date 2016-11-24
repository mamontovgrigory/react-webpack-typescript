import * as React from 'react';
import {Link} from 'react-router';

import Navigation from '../../../modules/Navigation/Navigation'; //TODO: Delete

interface MainProps {

}

interface Modules {
    name: string;
    icon: string;
    path: string;
    to: string;
    src: string;
    description: string;
    roles: string[];
}

interface MainState {
    modules: Modules[]
}

export default class Main extends React.Component<MainProps, MainState> {
    constructor() {
        super();

        this.state = {
            modules: []
        }
    }

    componentWillMount() {
        var self = this;
        Navigation.getList(function (response: Modules[]) {
            self.setState({
                modules: response
            });
        });
    }

    render() {
        return (
            <div className="section">
                {
                    this.state.modules.map((el, index) => {
                        return (
                            el.path !== 'index' ?
                                <div className="card-wrapper" key={index}>
                                    <div className="card sticky-action">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img className="activator" src={el.src}/>
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title activator grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">more_vert</i>
                                            </span>
                                        </div>
                                        <div className="card-action">
                                            <Link to={el.to}>Перейти</Link>
                                        </div>
                                        <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">close</i>
                                            </span>
                                            <p>{el.description}</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        )
                    })
                }
            </div>
        )
    }
}