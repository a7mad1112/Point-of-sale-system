import Container from "@mui/material/Container";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <section>
      <div className="overlay">
        <Container maxWidth="lg">
          <LoginForm />
        </Container>
      </div>
    </section>
  );
};

export default Login;
