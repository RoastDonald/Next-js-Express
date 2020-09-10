import { Formik, Form } from "formik";
import Ffield from "../../../../components/common/Ffield/Ffield.component";
import schemas from "../../../../../common/schemas";
const LoginBlock = () => {
  return (
    <div className="signin_wrapper">
      <Formik
        initialsValues={{ email: "", password: "" }}
        validateOnChange={true}
        validationSchema={schemas.login}
      >
        {({ values }) => (
          <Form>
            <Ffield
              name="email"
              type="email"
              placeholder="Enter your login"
              label="Login"
            />
            <Ffield
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginBlock;
