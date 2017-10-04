import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Tag, Card, Form, Input, Icon, Switch, Table } from 'antd';

import './Component.css';
import githubService from './../../lib/GithubService';

class RepoList extends Component {
  state = {
    repos: {},
    reposFilter: '',
    githubLogin: 'heremaps',
    avatarUrl: null,
    fetching: false,
    showAsCard: true,
    notFound: false
  };

  get tableColumns() {
    return [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: repoName => <Link to={`/repos/${this.state.githubLogin}/${repoName}`}>{ repoName }</Link>,
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    }];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.user !== nextProps.match.params.user) {
      this.setStateFromRouterParams(nextProps);
    }
  }

  componentWillMount() {
    this.setState({ fetching: true});
  }

  componentDidMount() {
    this.setStateFromRouterParams(this.props);
  }

  render() {
    if (this.state.fetching) {
      return <Row type="flex" style={{ height: 300 }} align="middle"><Col span={24} className="align-center">Loading</Col></Row>
    }

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

    const repos = (this.state.repos[this.state.githubLogin] || [])
      .filter(repo => repo.name.includes(this.state.reposFilter));

    return (
      <div className="repo-list">

        {/*Content top area*/}
        <Row>
          <Col span={12} className="align-left">
            <h1>{ this.state.githubLogin }</h1>
          </Col>
          <Col span={12} className="align-right">
            {this.state.avatarUrl && <img src={ this.state.avatarUrl } width={ 80 } height={ 80 } alt="Avatar"/>}
          </Col>
        </Row>

        {/*Content filters*/}
        <Row align="middle" justify="space-between" style={{ margin: '10px 0px' }}>
          <Col xs={ 24 } sm={ 6 }>
            <Form>
              <Input prefix={<Icon type="search"/>}
                     placeholder="Filter repositories"
                     type="text"
                     onKeyPress={ this.onRepositoriesFilterChange }
              />
            </Form>
          </Col>
          <Col xs={ 0 } sm={ 12 }></Col>
          <Col xs={ 24 } sm={ 6 } className="align-right">
            <Switch checkedChildren="Cards" unCheckedChildren="Table"
                    checked={ this.state.showAsCard }
                    onChange={ this.switchListView }/>
          </Col>
        </Row>

        {/*Repos listing*/}
        <Row gutter={ 5 } align="middle" justify="center">
          {/*Cards*/}
          { this.state.showAsCard && repos.map(repo => (
            <Col xs={ 24 } sm={ 12 } lg={ 6 } key={ repo.id }>
              <Card className="repo-card"
                    title={ repo.name }
                    extra={<Link to={`/repos/${this.state.githubLogin}/${repo.name}`}>View</Link>}
                    style={{ marginBottom: 5 }}>
                { repo.language && <div><Tag color="purple">{ repo.language }</Tag></div> }
                { repo.description && <div>{ repo.description }</div> }
              </Card>
            </Col>
          )) }

          {/*Table*/}
          { !this.state.showAsCard && <Table columns={ this.tableColumns } dataSource={ repos } pagination={ false }></Table> }
        </Row>

      </div>
    );
  }

  setStateFromRouterParams(props) {
    if (!props.match.params.user) {
      return props.history.push(`/repos/${this.state.githubLogin}`);
    }

    const githubLogin = props.match.params.user;

    if (!this.state.repos[githubLogin]) {
      this.setState({ fetching: true });

      githubService.fetchRepos(githubLogin)
        .then(response => {
          const fetching = false;
          const notFound = false;
          const avatarUrl = this.getAvatarUrl(response);
          const repos = this.state.repos;

          repos[githubLogin] = response;

          this.setState({ githubLogin, repos, avatarUrl, fetching, notFound });
        })
        .catch(error => {
          console.log(error);
          this.setState({ fetching: false, notFound: true });
        })
    } else {
      const fetching = false;
      const avatarUrl = this.getAvatarUrl(this.state.repos[githubLogin]);
      this.setState({ githubLogin, avatarUrl, fetching });
    }
  }

  getAvatarUrl(repos) {
    return repos.length ? repos[0].owner.avatar_url : null;
  }

  onRepositoriesFilterChange = (e) => {
    if (e.key === 'Enter') {
      this.setState({ reposFilter: e.target.value });
    }
  };

  switchListView = (showAsCard) => {
    this.setState({ showAsCard });
  };
}

export default RepoList;
