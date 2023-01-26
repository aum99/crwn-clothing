import SignUp from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in-form-component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUp></SignUp>
    </div>
  );
};

export default Authentication;
