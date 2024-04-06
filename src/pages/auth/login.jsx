
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { httpService } from "../../core/http-service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function fatchLogin (formData){
  const response = await httpService.post('/auth/login-with-password' , formData);
  return response.data; 
}

const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [contact_line, setContact_line] = useState("");

 const  loginMutation =  useMutation( fatchLogin  , {
  onSuccess: (data) => {
    console.log(data.token);
    Cookies.set("token", data.token, { expires: 3 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 3 });
    navigate('/');
  },
  oError: (error) => {
    console.log(error);
  }
 });


  const onSubmit = (data) => {
    loginMutation.mutate(data)
    console.log(data);
  };



  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            padding: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#gfr",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="#7b67c7"
            textAlign="center"
          >
            Login Form
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", marginTop: "10px" }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="contact_line"
              label="contact_line"
              autoComplete="contact_line"
              {...register("contact_line", {
                required: "Please enter your contact_line",
              })}
              value={contact_line}
              onChange={(e) => setContact_line(e.target.value)}
              error={errors.contact_line ? true : false}
              helperText={errors.contact_line ? errors.contact_line.message : ""}
            />


            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              type="password"
              {
                ...register("password" , { required:"Please enter your password"})
              }
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: "60 0 50" }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;
