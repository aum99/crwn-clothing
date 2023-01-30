import { useState } from "react";

import {
  createAuthWithUserAndPassword,
  createUserDocumentFromAuth,
} from "../../utlis/firebase/firebase.utlis";

import Button from "../button/button.components";

import FormInput from "../form-input/form-input.component";

import { SignupContainer, Header } from "./sign-up.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthWithUserAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, the email already exists");
      }
      console.log("User creation encountered an error", err);
    }
  };

  return (
    <SignupContainer>
      <Header>I do not have an account</Header>
      <span>Sign up with your email address and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          onChange={handleChange}
          required
          name="displayName"
          value={displayName}
        ></FormInput>

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          required
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>

        <Button type="submit">SIGN UP</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUp;
