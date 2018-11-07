import React from 'react';
import {extractResource} from "../helper";
import {NavLink} from "react-router-dom";

class DetailItem extends React.Component {
    converter(key) {
        if (key === 'films' || key === 'vehicles' || key === 'starships' || key === 'species' || key === 'homeworld' || key === 'characters' || key === 'planets' ) {
            if (Array.isArray(this.props.val)) {
                return this.props.val.map( url => {
                    let id = extractResource(url).id;
                    let resource = extractResource(url).resource;
                    return (
                        <li key={id} className='item-link'>
                            <NavLink to={'/' + resource + '/' + id}>{resource + '-' + id}</NavLink>
                        </li>
                    );
                });
            } else {
                let id = extractResource(this.props.val).id;
                let resource = extractResource(this.props.val).resource;
                return (
                    <li key={id} className='item-link'>
                        <NavLink to={'/' + resource + '/' + id}>{resource + '-' + id}</NavLink>
                    </li>
                );
            }

        } else {
            return this.props.val;
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.converter(this.props.name)}</td>
            </tr>
        );
    }

}

export default DetailItem;