import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { user } = this.state;
            return <Route
                {...rest}
                render={props => {
                    if (user) {
                        return <Component user={user} {...props} />;
                    } else {
                        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    }
                }}
            />
    }
}