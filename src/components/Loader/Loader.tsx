import * as React from 'react';
import {connect} from 'react-redux';

interface Props {
    active?:boolean;
}

interface State {

}

class Loader extends React.Component<Props,State> {
    render() {
        return (
            <div className={'loader-wrapper ' + (this.props.active ? 'active' : '')}>
                <div className="preloader-wrapper active">
                    <div className="spinner-layer">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state:any) {
    const {active} = state.loader;

    return {
        active: active
    };
}

export default connect(mapStateToProps)(Loader);