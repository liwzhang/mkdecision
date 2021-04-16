import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Button,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1976d2",
  },
  validation: {
    fontSize: "10px",
    color: "red",
    marginLeft: theme.spacing(1),
  },
}));

export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });
  const classes = useStyles();

  const onSubmit = async (data) => {
    console.log(data);
    fetch(
      "https://86upx61e6j.execute-api.us-west-1.amazonaws.com/01/contact-me",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("Response ", res);
        if (res.body.success) {
          alert("Email sent successfully!");
          reset();
        } else {
          alert(
            "Emails can only be sent to Amazon SES verified addresses. Please try again with a verified email address."
          );
        }
      })
      .catch((err) => {
        console.log("Error! ", err);
      });
  };

  return (
    <Container maxWidth="sm" className={classes.main}>
      <Typography component="h1" variant="h5">
        Contact Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          required
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          name="name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <Typography className={classes.validation}>
            Please enter a name.
          </Typography>
        )}
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <Typography className={classes.validation}>
            Please enter an email.
          </Typography>
        )}
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Message"
          variant="outlined"
          margin="normal"
          name="message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <Typography className={classes.validation}>
            Please enter a message.
          </Typography>
        )}
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
