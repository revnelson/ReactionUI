import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useApolloClient } from "react-apollo-hooks";
import { loginUserMutation } from "../api";
import { setUserMutation } from "../store/Auth/mutations";
import { useTranslation } from "react-i18next";

const formLabelStyle = tw`bg-transparent border-b m-auto block border-grey w-full mb-6 text-grey-darker pb-1`;

export const LoginForm = ({ history, match }) => {
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [modalForgot, setModalForgot] = useState(false);
  const client = useApolloClient();

  const [t] = useTranslation("common");

  const LoginSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Invalid email")
    //   .required("Required"),
    // password: Yup.string()
    //   .min(6, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
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
        onClose: () => {},
        onClick: () => {
          setSubmitting(false);
          history.push(destination);
        }
      });
      setSubmitting(false);
      history.push(destination);
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
    }
  };
  console.log(tw`transition`);
  return (
    <div
      css={tw`flex-1 rounded h-full overflow-hidden shadow sm:flex max-w-50`}
    >
      <div css={tw`sm:w-2/5 w-full bg-grey-d2 bg-cover bg-center text-white`}>
        <div css={tw`p-8`}>
          <h2 css={tw`uppercase`}>{t("login")}</h2>
        </div>
      </div>

      <div css={tw`sm:w-3/5 w-full bg-white`}>
        <div css={tw`p-8`}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label id="email" css={tw`text-xs text-grey`}>
                  {t("email")}
                </label>
                <Field
                  css={tw`bg-transparent border-b m-auto block border-grey w-full mb-6 text-grey-darker pb-1`}
                  type="text"
                  name="email"
                />
                <ErrorMessage
                  css={tw`text-xs text-grey -mt-4 text-fuschia`}
                  name="email"
                  component="div"
                />
                <label id="password" css={tw`text-xs text-grey`}>
                  {t("password")}
                </label>
                <Field css={formLabelStyle} type="password" name="password" />
                <ErrorMessage
                  css={tw`text-xs text-grey -mt-4 text-fuschia`}
                  name="password"
                  component="div"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="transition"
                  css={tw`shadow pt-3 mt-8 pb-3 w-full text-white bg-primary hover:bg-primary-l1 rounded-full`}
                >
                  {t("submit")}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
