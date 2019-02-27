import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Icon, Input, Modal, notification } from "antd";
import { Link, withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { useTranslation } from "react-i18next";
import compose from "recompose/compose";
import { withNamespaces } from "react-i18next";
import { loginUserMutation } from "../api";
import { withAuthStore } from "../store/Auth";

const LoginFormContent = ({
  client,
  form,
  history,
  match,
  setUserMutation
}) => {
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalForgot, setModalForgot] = useState(false);

  const [t] = useTranslation("common", "auth");

  const { getFieldDecorator } = form;

  useEffect(() => {
    if (error && !errorOpen) {
      setErrorOpen(true);
      notification.error({
        message: t("registration-error"),
        description: `${error}`,
        onClose: () => {
          setErrorOpen(false);
          setError(null);
        },
        onClick: () => {
          setErrorOpen(false);
          setError(null);
        }
      });
    }
  });

  const handleForgot = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        forgotSubmit(values.email);
      } else {
        setError(err);
        setLoading(false);
      }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        setLoading(true);
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

          notification.success({
            message: t("login-successful"),
            duration: 1,
            onClose: () => {
              setLoading(false);
              history.push(destination);
            },
            onClick: () => {
              setLoading(false);
              history.push(destination);
            }
          });
        } catch (e) {
          setError(e.message);
          setLoading(false);
        }
      } else {
        setError(e.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="login-form-wrapper">
      <div className="logo-wrapper login-form-header">{t("site-name")}</div>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: t("email-error") }]
          })(
            <Input
              className="input-wrapper"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.4)" }} />}
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
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />}
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
          })(<Checkbox>{t("auth:remember-me")}</Checkbox>)}
          <a onClick={() => setModalForgot(true)} className="login-form-forgot">
            {t("auth:forgot-pass")}
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
        title={t("auth:forgot-pass")}
        visible={modalForgot}
        onOk={handleForgot}
        loading={loading}
        onCancel={() => setModalForgot(false)}
        footer={[
          <Button key="back" onClick={() => setModalForgot(false)}>
            {t("cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading && modalForgot}
            onClick={handleForgot}
          >
            {t("submit")}
          </Button>
        ]}
      >
        {t("auth:forgot-pass-desc")}
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
};

export const LoginForm = compose(
  withRouter,
  withApollo,
  withAuthStore,
  Form.create()
)(LoginFormContent);
