import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utlis/firebase/firebase.utlis";

import SignUp from "../../components/sign-up/sign-up.components";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google popup</button>
      <SignUp></SignUp>
    </div>
  );
};

export default SignIn;
