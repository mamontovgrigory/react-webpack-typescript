import * as React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

interface Props {
    modules:NavigationItem[];
}

interface State {

}

class MainPage extends React.Component<Props, State> {
    render() {
        return (
            <div>
                {
                    this.props.modules.map((el, index) => {
                        return (
                            el.path !== 'index' && (
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
                            )
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {modules} = state.navigation;

    return {modules};
}

export default connect(mapStateToProps)(MainPage);