import React from "react";
import {
  Formik,
  FormikProps,
  Form,
  Field,
  ErrorMessage,
  FieldArray
} from "formik";

export class MyForm extends React.Component {
  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    setSubmitting(false);
    return;
  };
  render() {
    let vehicles = ["car", "motorcycle", "airplane", "rocket"];

    return (
      <Formik
        initialValues={{ vehicles: vehicles }}
        validate={values => {
          let errors = [];
          if (!values.vehicles.length)
            errors.vehicles = "At least one vehicle is required.";
          return errors;
        }}
        onSubmit={this.handleSubmit}
        render={formProps => {
          return (
            <Form>
              <FieldArray
                name="vehicles"
                render={arrayHelpers => (
                  <div>
                    {formProps.values.vehicles.map((vehicle, index) => (
                      <div key={index}>
                        <Field name={`vehicles.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")}
                        >
                          Add Vehicles at this index
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      Add Vehicle
                    </button>
                  </div>
                )}
              />
            </Form>
          );
        }}
      />
    );
  }
}

// import {
//   AutoComplete,
//   Button,
//   Cascader,
//   Checkbox,
//   Form,
//   Icon,
//   Input,
//   notification,
//   Modal,
//   Select,
//   Tooltip
// } from "antd";
// import { withApollo } from "react-apollo";
// import { withOoth } from "ooth-client-react";
// import compose from "recompose/compose";
// import Link from "next/link";
// import Router from "next/router";
// import gql from "graphql-tag";
// import { withAuthStore } from "../store/Auth";
// import { withNamespaces } from "../i18n";
// import { T } from "antd/lib/upload/utils";

// // TODO - Ensure only one name per language. User can change previous language to same as new language.

// const FormItem = Form.Item;
// const CheckboxGroup = Checkbox.Group;
// const AutoCompleteOption = AutoComplete.Option;

// let id = 1;

// const enabledLanguages = ["EN", "中文", "IT", "ES", "FR"];

// const MUT_ADD_USER_ROLES = gql`
//   mutation AddUserRoles($data: AddUserRolesInput!) {
//     addUserRoles(data: $data) {
//       id
//       local {
//         email
//       }
//       teacher {
//         id
//         name {
//           en
//           zh
//         }
//       }
//     }
//   }
// `;

// // eslint-disable-next-line
// class RegisterForm extends React.Component {
//   state = {
//     confirmDirty: false,
//     autoCompleteResult: [],
//     loading: false,
//     successOpen: false,
//     errorOpen: false,
//     error: "",
//     user: null,
//     agreementOpen: false
//   };

//   componentDidUpdate() {
//     const { error, user, successOpen } = this.state;
//     const { t } = this.props;
//     error &&
//       !user &&
//       notification.error({
//         message: t("reg:error"),
//         description: `${error}`,
//         onClose: () => {
//           this.setState({ error: "" });
//         },
//         onClick: () => {
//           this.setState({ error: "" });
//         }
//       });

//     if (user && !successOpen) {
//       this.setState({ successOpen: true });
//       let name;
//       if (user.teacher) {
//         user.teacher.name.en && (name = user.teacher.name.en);
//         user.teacher.name.zh && (name = user.teacher.name.zh);
//       }
//       notification.success({
//         message: t("reg:success"),
//         description: `${t("welcome")} ${name}!`,
//         onClose: () => {
//           Router.push("/");
//         },
//         onClick: () => {
//           Router.push("/");
//         }
//       });
//     }
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     const { form, oothClient, client } = this.props;
//     form.validateFieldsAndScroll(async (err, values) => {
//       if (!err) {
//         this.setState({ loading: true, error: "" });
//         const { email, password, names, roles, lang } = values;
//         let name = {};
//         lang.forEach((element, i) => {
//           let lang;
//           element === "中文" ? (lang = "zh") : (lang = element);
//           name[lang.toLowerCase()] = names[i];
//         });

//         try {
//           await oothClient.method("local", "register", {
//             email,
//             password
//           });

//           let newUser = await oothClient.authenticate("local", "login", {
//             username: email,
//             password
//           });

//           const { data } = await client.mutate({
//             mutation: MUT_ADD_USER_ROLES,
//             variables: {
//               data: {
//                 id: newUser._id,
//                 name,
//                 roles
//               }
//             }
//           });

//           newUser = data.addUserRoles;

//           this.setState({ loading: false, user: newUser });
//         } catch (e) {
//           this.setState({ loading: false, error: e.message });
//         }
//       }
//     });
//   };

//   handleInputChange = e => {
//     const { setRegEmailQuery, setRegPassQuery } = this.props;
//     const { form, auth } = this.props;
//     if (e.target.name === "email") {
//       setRegEmailQuery({ variables: { email: e.target.value } });
//       form.setFieldsValue({ email: auth.regEmail });
//     } else if (e.target.name === "password") {
//       setRegPassQuery({ variables: { pass: e.target.value } });
//       form.setFieldsValue({ password: auth.regPass });
//     }
//   };

//   handleConfirmBlur = e => {
//     const value = e.target.value;
//     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//   };

//   compareToFirstPassword = (rule, value, callback) => {
//     const { t, form } = this.props;
//     if (value && value !== form.getFieldValue("password")) {
//       callback(t("reg:pass-error"));
//     } else {
//       callback();
//     }
//   };

//   validateToNextPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(["confirm"], { force: true });
//     }
//     callback();
//   };

//   remove = k => {
//     const { form } = this.props;
//     // can use data-binding to get
//     const keys = form.getFieldValue("keys");
//     // We need at least one passenger
//     if (keys.length === 1) {
//       return;
//     }

//     // can use data-binding to set
//     form.setFieldsValue({
//       keys: keys.filter(key => key !== k)
//     });
//   };

//   add = () => {
//     const { form } = this.props;
//     // can use data-binding to get
//     const keys = form.getFieldValue("keys");
//     const nextKeys = keys.concat(++id);
//     // can use data-binding to set
//     // important! notify form to detect changes
//     form.setFieldsValue({
//       keys: nextKeys
//     });
//   };

//   render() {
//     const { t } = this.props; // FUNCTIONS
//     const { form, auth } = this.props; // VARIABLES
//     const { getFieldDecorator, getFieldValue } = form;
//     const { loading, agreementOpen, autoCompleteResult } = this.state;
//     const { regEmail, regPass } = auth;

//     const roleOptions = [
//       { label: t("teacher"), value: "Teacher" },
//       { label: t("student"), value: "Student", disabled: true },
//       { label: t("parent"), value: "Parent", disabled: true }
//     ];

//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 }
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 24 }
//       }
//     };

//     const formItemLayoutWithOutLabel = {
//       wrapperCol: {
//         xs: { span: 24, offset: 0 },
//         sm: { span: 24, offset: 0 }
//       }
//     };

//     const langPrefixSelector = (k, lang, langs) => {
//       return getFieldDecorator(`lang[${k}]`, {
//         initialValue: lang ? lang : langs[0]
//       })(
//         <Select style={{ width: 70 }}>
//           {lang ? (
//             <Select.Option value={lang} key={`lang[${k}]`}>
//               {lang}
//             </Select.Option>
//           ) : null}
//           {langs.map(lang => (
//             <Select.Option value={lang} key={`lang[${k}]`}>
//               {lang}
//             </Select.Option>
//           ))}
//         </Select>
//       );
//     };

//     getFieldDecorator("keys", { initialValue: [0] });

//     const keys = getFieldValue("keys");
//     const laguagePrefixes = keys.map((k, i) => {
//       let lang = getFieldValue(`lang[${k}]`);

//       const langs = enabledLanguages.filter(
//         lang => !getFieldValue("lang").includes(lang)
//       );
//       return (
//         <FormItem
//           {...(i === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//           required={false}
//           key={k}
//         >
//           {getFieldDecorator(`names[${k}]`, {
//             validateTrigger: ["onChange", "onBlur"],
//             rules: [
//               {
//                 required: true,
//                 whitespace: true,
//                 message: t("reg:name-error")
//               }
//             ]
//           })(
//             <Input
//               addonBefore={langPrefixSelector(k, lang, langs)}
//               className="inputWrapper"
//               prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.4)" }} />}
//               size="large"
//               placeholder={t("name")}
//               minLength={lang === "zh" ? 2 : 3}
//               maxLength={lang === "zh" ? 10 : 40}
//               suffix={
//                 <Icon
//                   className="register-delete-button"
//                   type="minus-circle-o"
//                   hidden={keys.length < 2}
//                   onClick={() => this.remove(k)}
//                   style={{ color: "secondary" }}
//                 />
//               }
//             />
//           )}
//         </FormItem>
//       );
//     });

//     return (
//       <div className="register-form">
//         <div className="isoLogoWrapper register-form-header">
//           {t("teacherkit")}
//         </div>
//         <Form
//           onSubmit={this.handleSubmit}
//           className="signinForm"
//           label={t("reg:form-label")}
//         >
//           {laguagePrefixes}
//           <FormItem {...formItemLayoutWithOutLabel}>
//             <Button
//               hidden={keys.length === enabledLanguages.length}
//               type="dashed"
//               onClick={this.add}
//             >
//               <Icon type="plus" />
//               {t("reg:add-name")}
//             </Button>
//           </FormItem>
//           <FormItem {...formItemLayout} hasFeedback>
//             {getFieldDecorator("email", {
//               rules: [
//                 {
//                   type: "email",
//                   message: t("reg:email-invalid")
//                 },
//                 {
//                   required: true,
//                   message: t("reg:email-req")
//                 }
//               ],
//               initialValue: regEmail ? regEmail : ""
//             })(
//               <Input
//                 className="inputWrapper"
//                 prefix={
//                   <Icon type="mail" style={{ color: "rgba(0,0,0,.4)" }} />
//                 }
//                 id="email"
//                 name="email"
//                 autoComplete="username"
//                 size="large"
//                 placeholder={t("email")}
//                 onChange={this.handleInputChange}
//               />
//             )}
//           </FormItem>
//           <FormItem {...formItemLayout}>
//             {getFieldDecorator("password", {
//               rules: [
//                 {
//                   required: true,
//                   message: t("reg:pass-req")
//                 },
//                 {
//                   validator: this.validateToNextPassword
//                 }
//               ],
//               initialValue: regPass ? regPass : ""
//             })(
//               <Input
//                 className="inputWrapper"
//                 prefix={
//                   <Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />
//                 }
//                 id="password"
//                 name="password"
//                 minLength={6}
//                 maxLength={24}
//                 autoComplete="current-password"
//                 size="large"
//                 type="password"
//                 placeholder={t("password")}
//                 onChange={this.handleInputChange}
//               />
//             )}
//           </FormItem>
//           <FormItem {...formItemLayout}>
//             {getFieldDecorator("confirm", {
//               rules: [
//                 {
//                   required: true,
//                   message: t("reg:pass-confirm-err")
//                 },
//                 {
//                   validator: this.compareToFirstPassword
//                 }
//               ]
//             })(
//               <Input
//                 className="inputWrapper"
//                 prefix={
//                   <Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />
//                 }
//                 id="password"
//                 name="password"
//                 minLength={6}
//                 maxLength={24}
//                 autoComplete="current-password"
//                 size="large"
//                 type="password"
//                 placeholder={t("reg:pass-confirm")}
//                 onBlur={this.handleConfirmBlur}
//               />
//             )}
//           </FormItem>
//           <FormItem {...formItemLayout}>
//             <Input
//               className="inputWrapper"
//               prefix={<Icon type="read" style={{ color: "rgba(0,0,0,.4)" }} />}
//               id="school"
//               name="school"
//               size="large"
//               placeholder={t("reg:school-name")}
//             />
//           </FormItem>
//           <FormItem {...formItemLayout} label={t("reg:i-am")}>
//             {getFieldDecorator("roles", {
//               initialValue: ["Teacher"],
//               rules: [
//                 {
//                   required: true,
//                   message: t("reg:role-err")
//                 }
//               ]
//             })(
//               <CheckboxGroup
//                 options={roleOptions}
//                 id="roles"
//                 name="roles"
//                 required
//               />
//             )}
//           </FormItem>
//           <FormItem {...formItemLayoutWithOutLabel}>
//             {getFieldDecorator("agreement", {
//               valuePropName: "checked",
//               rules: [
//                 {
//                   required: true,
//                   message: t("reg:agree-err")
//                 }
//               ]
//             })(
//               <Checkbox>
//                 {t("reg:agree-label")}
//                 <a onClick={() => this.setState({ agreementOpen: true })}>
//                   {t("reg:agreement")}
//                 </a>
//               </Checkbox>
//             )}
//           </FormItem>

//           <Modal
//             title={t("reg:terms-cond")}
//             visible={agreementOpen}
//             onOk={() => this.setState({ agreementOpen: false })}
//             onCancel={() => this.setState({ agreementOpen: false })}
//             cancelButtonDisabled
//             footer={
//               <Button
//                 key="ok"
//                 onClick={() => this.setState({ agreementOpen: false })}
//               >
//                 {t("reg:agree")}
//               </Button>
//             }
//           >
//             <p>Here are the terms of our website.</p>
//           </Modal>
//           <FormItem {...formItemLayoutWithOutLabel}>
//             <Button
//               loading={loading}
//               type="primary"
//               htmlType="submit"
//               className="register-form-button"
//             >
//               {t("register")}
//             </Button>
//           </FormItem>
//           <FormItem {...formItemLayoutWithOutLabel}>
//             <Link href="/">
//               <Button key="back" className="register-form-button">
//                 {t("cancel")}
//               </Button>
//             </Link>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

// export default compose(
//   withNamespaces(["common", "reg"]),
//   withApollo,
//   withOoth,
//   withAuthStore,
//   Form.create()
// )(RegisterForm);
