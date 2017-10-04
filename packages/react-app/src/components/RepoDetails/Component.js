import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Table } from 'antd';

import './Component.css';
import githubService from './../../lib/GithubService';

class RepoDetails extends Component {
  state = {
    repo: null,
    languages: null,
    githubLogin: null,
    avatarUrl: null,
    fetching: false,
    notFound: false
  };

  get languagesColumns() {
    return [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Bytes',
      dataIndex: 'bytes',
      key: 'bytes',
    }, {
      title: 'Share',
      dataIndex: 'share',
      key: 'share',
      render: share => `${share} %`,
    }];
  }

  get detailsColumns() {
    return [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }];
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.user !== nextProps.match.params.user
      || this.props.match.params.repo !== nextProps.match.params.repo
    ) {
      this.setStateFromRouterParams(nextProps);
    }
  }

  componentWillMount() {
    this.setState({ fetching: true });
  }

  componentDidMount() {
    this.setStateFromRouterParams(this.props);
  }

  render() {
    if (this.state.notFound) {
      return <Row type="flex" style={{ height: 300 }} align="middle">
        <Col span={24} className="align-center">
          <h1>404</h1>
          <p>
            Not Found <Link to="/repos/heremaps">I'm feeling lucky</Link>
          </p>
        </Col>
      </Row>
    }

    if (this.state.fetching) {
      return <Row type="flex" style={{ height: 300 }} align="middle"><Col span={24} className="align-center">Loading</Col></Row>
    }

    const repoLanguages = this.getRepoLanguages();
    const repoDetails = this.getRepoDetails();

    return (
      <div className="repo-details">
        <Row>
          <Col span={12} className="align-left">
            <Button type="primary">
              <Link to={`/repos/${this.state.githubLogin}`}>Back</Link>
            </Button>
          </Col>
          <Col span={12} className="align-right">
            {this.state.avatarUrl && <img src={ this.state.avatarUrl } width={ 80 } height={ 80 } alt="Avatar"/>}
          </Col>
        </Row>

        <Row>
          <Col span={12} className="align-left">
            <h1>{ this.state.githubLogin } <a href={ this.state.repo.html_url } className="small" target="_blank">GITHUB</a></h1>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="align-left">
            <div>{ this.state.repo.description }</div>
          </Col>
        </Row>

        <Row style={{ marginTop: 10 }} gutter={ 10 }>
          <Col span={12}>
            <h3>Languages</h3>
            <Table className="repo-details-languages"
                   columns={ this.languagesColumns }
                   dataSource={ repoLanguages }
                   pagination={ false }></Table>
          </Col>
          <Col span={12}>
            <h3>Details</h3>
            <Table className="repo-details-details"
                   columns={ this.detailsColumns }
                   dataSource={ repoDetails }
                   pagination={ false }
                   showHeader={ false }></Table>
          </Col>
        </Row>
      </div>
    );
  }

  setStateFromRouterParams(props) {
    if (!props.match.params.user) {
      return props.history.push(`/`);
    }

    const githubLogin = props.match.params.user;
    const repoName = props.match.params.repo;

    githubService.fetchRepoDetails(repoName, githubLogin)
      .then(repo => {
        const avatarUrl = repo.owner.avatar_url;

        this.setState({ githubLogin, repo, avatarUrl });

        return githubService.fetchRepoLanguages(repoName, githubLogin);
      })

      .then(languages => {
        const notFound = false;
        const fetching = false;
        this.setState({ languages, fetching, notFound })
      })
      .catch(error => {
        this.setState({ fetching: false, notFound: true });
      })
  }

  getRepoLanguages() {
    if (!this.state.languages) return [];

    const totalBytes = Object.keys(this.state.languages).reduce((acc, name) => (acc + this.state.languages[name]), 0);

    return Object.keys(this.state.languages)
      .map((name) => ({
        name: name,
        bytes: this.state.languages[name],
        share: Math.round(10000 * this.state.languages[name] / totalBytes) / 100
      }));
  }

  getRepoDetails() {
    if (!this.state.repo) return [];

    const repo = this.state.repo;

    return [{
      name: 'Created',
      value: repo.created_at
    }, {
      name: 'Updated',
      value: repo.updated_at
    }, {
      name: 'Forks',
      value: repo.forks_count
    }, {
      name: 'Stars',
      value: repo.stargazers_count
    }, {
      name: 'Watchers',
      value: repo.watchers_count
    }, {
      name: 'Issues',
      value: repo.open_issues_count
    }];
  }
}

export default RepoDetails;
