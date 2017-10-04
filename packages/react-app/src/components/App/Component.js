import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Layout, Affix, Row, Col, Form, Input, Icon } from 'antd';

import './Component.css';

const { Content, Header } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Affix>
          <Header>
            <Row justify="space-between">
              <Col xs={12} sm={6}>
                <div className="branding">
                  <span className="title">
                    <Link to="/">GITHUB <span className="sub-title">EXPLORER</span></Link>
                  </span>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <Form>
                  <Input className="account-change"
                         prefix={<Icon type="search"/>}
                         placeholder="Change github account"
                         type="text"
                         onKeyPress={ this.onGithubLoginChange }
                  />
                </Form>
              </Col>
            </Row>
          </Header>
        </Affix>

        <Layout>
          <Content className="app-content">
            {renderRoutes(this.props.route.routes)}
          </Content>
        </Layout>
      </Layout>
    );
  }

  onGithubLoginChange = (e) => {
    if (e.key === 'Enter') {
      this.props.history.push(`/repos/${e.target.value}`);

      e.target.value = '';
    }
  }
}

export default App;
