import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";
import Swal from 'sweetalert2';

const serverUrl = import.meta.env.VITE_SILLYJAMAPI;

const clientId = import.meta.env.VITE_CLIENT_ID;

import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  about: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [profileImage, setProfileImage] = useState();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const size = file.size / 1024 / 1024;
      if (size > 7) {
        const alertmsg =
          "Please upload an image upto 7MB\n" +
          "Current image size is " + size.toFixed(1) + " MB \n\n" +
          "Currently you can only upload images upto 7MB. \n" +
          "If you want to send larger images please add a link to the image instead."
        Swal.fire({
          title: "Image size too large",
          text: alertmsg,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setProfileImage(e.target.files[0]);
    }
  };

  async function sendImage(image, path) {
    const imageData = new FormData();
    imageData.append("picture", image);
    imageData.append("picturePath", image.name);
    const resp = await fetch(
      `${serverUrl}/users/send/${path}`,
      {
        method: "POST",
        body: imageData,
      }
    );
    const data = await resp.json();
    const url = data.url;
    return url;
  }

  const register = async (values, onSubmitProps) => {

    setButtonDisabled(true);
    const formData = new FormData();
    for (let value in values) {
      if (value !== "pictureUrl") {
        formData.append(value, values[value]);
      }
    }
    if (profileImage) {
      const url = await sendImage(profileImage, profileImage.name);
      formData.append("pictureUrl", url);
      values.pictureUrl = url;
    } else {
      formData.append("pictureUrl", "https://i.ibb.co/DzFMwbR/default.png");
      values.pictureUrl = "https://i.ibb.co/DzFMwbR/default.png";
    }

    let saved = false;

    try {
      const savedUserResponse = await fetch(
        `${serverUrl}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!savedUserResponse.ok) {
        const errorData = await savedUserResponse.json();
        throw new Error(errorData.message);
      }

      onSubmitProps.resetForm();
      saved = true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });

      setButtonDisabled(false);
    }

    if (saved) {
      setPageType("login");
      setButtonDisabled(false);
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${serverUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  // const googleLogin = async (values, onSubmitProps) => {
  //   console.log("google login");
  //   //  console log tyhe name and email of the user
  //   console.log(values);
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <Box gridColumn="span 4" style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>

                  <Typography variant="h4"
                    style={{
                      color: "white",
                      marginBottom: "10px"
                    }}
                  >Profile Picture</Typography>
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0])
                      setProfileImage(acceptedFiles[0])
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pictureUrl}
                    error={
                      Boolean(touched.pictureUrl) && Boolean(errors.pictureUrl)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        borderRadius="50%"
                        p="1rem"
                        alignContent={isNonMobile ? "center" : "flex-start"}
                        display="grid"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        gap="1rem"
                      >
                        <input {...getInputProps()} onChange={imageChange} />
                        {profileImage ? (
                          <img
                            src={URL.createObjectURL(profileImage)}
                            alt=""
                            style={{
                              gridColumn: "span 2",
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              alignSelf: "center",
                              justifySelf: "center",
                            }}
                          />
                        ) : (
                          <img
                            src="https://i.ibb.co/DzFMwbR/default.png"
                            alt=""
                            style={{
                              gridColumn: "span 2",
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              alignSelf: "center",
                              justifySelf: "center",
                            }}
                          />
                        )}
                        <EditOutlinedIcon
                          style={{
                            gridColumn: "span 2",
                            alignSelf: "center",
                            justifySelf: "center",
                            position: "absolute",
                            color: "black",
                          }}
                        />
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                  required
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              disabled={buttonDisabled}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login');
                  resetForm();
                }}
                sx={{
                  textDecoration: 'underline',
                  color: palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer',
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
              </Typography>

              {/* forgot password on the right side */}
              <Typography
                onClick={() => {
                  navigate('/forgotpassword');
                }}
                sx={{
                  textDecoration: 'underline',
                  color: palette.primary.main,
                  '&:hover': {
                    cursor: 'pointer',
                    color: palette.primary.light,
                  },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* <GoogleOAuthProvider
              clientId={clientId}
            >
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  // decode the JWT
                  const decodedToken = jwtDecode(credentialResponse.credential);
                  // console log name and email of the user
                  console.log('Name: ', decodedToken.name);
                  console.log('Email: ', decodedToken.email);
                  // call the google login function
                  googleLogin(decodedToken);
                }}
                onError={(e) => {
                  console.log('Login Failed');
                }}
              />;
            </GoogleOAuthProvider> */}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
