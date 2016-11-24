import * as React from 'react';
import {Link} from "react-router";

import BreadcrumbsStore from '../../../modules/Breadcrumbs/Breadcrumbs'; //TODO: Delete

interface BreadcrumbsProps{
    breadcrumb?: string
}

interface BreadcrumbsState{

}

export default class Breadcrumbs extends React.Component<BreadcrumbsProps, BreadcrumbsState> {
    constructor() {
        super();

        this.state = {
            breadcrumbs: []
        };
    }

    render() {
        var breadcrumbs = [];
        BreadcrumbsStore.getList(this.props.breadcrumb, function(response: any){
            breadcrumbs = response;
        });
        return (
            breadcrumbs.length ?
                <nav className="panel row">
                    <div className="nav-wrapper container">
                        <div className="col s12">
                            {
                                breadcrumbs.map((el, index) => {
                                    return <Link key={index} to={el.href} className="breadcrumb">{el.name}</Link>
                                })
                            }
                        </div>
                    </div>
                </nav>
                : null
        )

    }
}