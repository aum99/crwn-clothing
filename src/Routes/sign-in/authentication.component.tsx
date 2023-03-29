import SignInForm from "../../components/sign-in-form/sign-in-form-component";
import SignUp from "../../components/sign-up/sign-up.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm></SignInForm>
      <SignUp></SignUp>
    </AuthenticationContainer>
  );
};

export default Authentication;
