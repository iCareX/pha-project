import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm, isNotEmpty, hasLength, isEmail } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthenticationImage.module.css";
import { LoginContent } from "../../utils/loginContents";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../components/atoms/userInfoAtoms";
import { userTokenState } from "../../components/atoms/tokenAtoms";

export default function LoginPage() {
  const { colorScheme } = useMantineColorScheme();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useRecoilState(userTokenState);
  const [info, setInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      password: "",
    },

    validate: {
      name: isNotEmpty("Invalid username"),
      password: hasLength({ min: 6 }, "Password must be 6 characters at least"),
    },
  });

  const generateToken = (username) => {
    const token = `${username}-token-${new Date().getTime()}`;
    const expirationTime = new Date().getTime() + 30 * 60 * 1000;
    return { token, expirationTime };
  };

  const handleSignIn = () => {
    const { name, password } = form.getValues();
    const user = LoginContent.find((item) => item.username === name);

    if (!user) {
      toast.error("This Username is not registered");
      return;
    }

    if (user.password !== password) {
      toast.error("Password is incorrect");
      return;
    }

    const { token, expirationTime } = generateToken(name);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userinfo", JSON.stringify({ name, password }));
    localStorage.setItem("tokenExpiration", expirationTime);

    setToken(token);
    setInfo({ name, password });

    toast.success("Login Successful!");
    setTimeout(() => {
      navigate("/query");
    }, 2000);
  };

  return (
    <form onSubmit={form.onSubmit(() => handleSignIn())}>
      <div className={classes.wrapper}>
        <Paper
          radius={0}
          p={30}
          className={classes.form}
          withBorder
          shadow="sm"
        >
          <Title order={2} ta="center" mb={50} className={classes.title}>
            Welcome to
          </Title>

          <TextInput
            withAsterisk
            // key={form.key("email")}
            key={form.key("name")}
            {...form.getInputProps("name")}
            label="Username"
            placeholder="hello"
            size="md"
          />
          <PasswordInput
            withAsterisk
            key={form.key("password")}
            {...form.getInputProps("password")}
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <Button fullWidth mt="70px" size="md" type="submit" loading={loading}>
            Sign In
          </Button>
        </Paper>
      </div>
      <ToastContainer
        position="top-right"
        limit={5}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={colorScheme}
      />
    </form>
  );
}
