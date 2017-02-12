import * as React from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";

interface Props {
    breadcrumbs?:{
        name:string;
        href:string;
    }[]
}

interface State {

}

class Breadcrumbs extends React.Component<Props, State> {
    render() {
        if (this.props && this.props.breadcrumbs && this.props.breadcrumbs.length) {
            return (
                <nav className="panel row">
                    <div className="nav-wrapper container">
                        <div className="col s12">
                            {
                                this.props.breadcrumbs.map((el, index) => {
                                    return <Link key={index} to={el.href} className="breadcrumb">{el.name}</Link>
                                })
                            }
                        </div>
                    </div>
                </nav>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps(state:any) {
    const {breadcrumbs} = state.breadcrumbs;

    return {breadcrumbs};
}

export default connect(mapStateToProps)(Breadcrumbs);