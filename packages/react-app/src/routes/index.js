import React from 'react';
import { Redirect } from 'react-router';

import App from './../components/App/Component';
import RepoList from './../components/RepoList/Component';
import RepoDetails from './../components/RepoDetails/Component';

export const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: (props) => <Redirect to="/repos/heremaps" />
            },
            {
                path: '/repos',
                exact: true,
                component: RepoList
            },
            {
                path: '/repos/:user',
                exact: true,
                component: RepoList
            },
            {
                path: '/repos/:user/:repo',
                exact: true,
                component: RepoDetails
            }
        ]
    }
];
