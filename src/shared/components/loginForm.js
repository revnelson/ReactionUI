import React from "react";
import { Button, Checkbox, Form, Icon, Input, Modal, notification } from "antd";
import { Link, withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import compose from "recompose/compose";
import { withNamespaces } from "react-i18next";
import { loginUserMutation } from "../api";
import { withAuthStore } from "../store/Auth";

class LoginFormContent extends React.Component {
  state = {
    error: "",
    errorOpen: false,
    loading: false,
    modalForgot: false
  };

  componentDidUpdate() {
    const { error, errorOpen } = this.state;
    const { t } = this.props;

    if (error && !errorOpen) {
      this.setState({ errorOpen: true });
      notification.error({
        message: t("registration-error"),
        description: `${error}`,
        onClose: () => {
          this.setState({ errorOpen: false, error: "" });
        },
        onClick: () => {
          this.setState({ errorOpen: false, error: "" });
        }
      });
    }
  }

  handleForgot = () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.forgotSubmit(values.email);
      } else {
        this.setState({ error: err, loading: false });
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { client, form, history, match, setUserMutation, t } = this.props;

    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const { data } = await client.mutate({
            mutation: loginUserMutation,
            variables: {
              username: values.email,
              password: values.password
            }
          });

          const { user } = data.loginUser ? data.loginUser : "";

          user && setUserMutation({ variables: { user } });

          const destination = match.params.next ? `/${match.params.next}` : "/";
          await this.setState({ loading: false });
          await history.push(destination);
          // notification.success({
          //   message: t("login-successful"),
          //   duration: 1,
          //   onClose: () => {
          //     this.setState({ loading: false });
          //     history.push(destination);
          //   },
          //   onClick: () => {
          //     this.setState({ loading: false });
          //     history.push(destination);
          //   }
          // });
        } catch (e) {
          this.setState({
            error: e.message,
            loading: false
          });
        }
      } else {
        this.setState({ error: err, loading: false });
      }
    });
  };

  render() {
    const { form, t } = this.props;
    const { getFieldDecorator } = form;
    const { loading, modalForgot } = this.state;
    return (
      <div className="login-form-wrapper">
        <div className="logo-wrapper login-form-header">{t("site-name")}</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: t("email-error") }]
            })(
              <Input
                className="input-wrapper"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.4)" }} />
                }
                id="email"
                name="email"
                autoComplete="username"
                size="large"
                placeholder={t("email")}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: t("password-error") }]
            })(
              <Input
                className="input-wrapper"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />
                }
                id="password"
                name="password"
                autoComplete="current-password"
                size="large"
                type="password"
                placeholder={t("password")}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>{t("reg:remember-me")}</Checkbox>)}
            <a
              onClick={() => this.setState({ modalForgot: true })}
              className="login-form-forgot"
            >
              {t("forgot-pass")}
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
              loading={loading && !modalForgot}
            >
              {t("log-in")}
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/register">
              <Button className="login-form-button" size="large">
                {t("sign-up")}
              </Button>
            </Link>
          </Form.Item>
        </Form>
        <Modal
          title={t("forgot-pass") + "?"}
          visible={modalForgot}
          onOk={this.handleForgot}
          loading={loading}
          onCancel={() => this.setState({ modalForgot: false })}
          footer={[
            <Button
              key="back"
              onClick={() => this.setState({ modalForgot: false })}
            >
              {t("cancel")}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading && modalForgot}
              onClick={this.handleForgot}
            >
              {t("submit")}
            </Button>
          ]}
        >
          {t("forgot-pass-desc")}
          <Form layout="vertical">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: t("email-error")
                  }
                ]
              })(
                <Input
                  className="input-wrapper"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  id="email"
                  name="email"
                  autoComplete="email"
                  size="large"
                  initialvalue={t("email")}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export const LoginForm = compose(
  withNamespaces("common"),
  withRouter,
  withApollo,
  withAuthStore,
  Form.create()
)(LoginFormContent);
