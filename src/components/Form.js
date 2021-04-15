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
}));

export default function Form(props) {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => {
    console.log(data);
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
          {...register("name")}
        />
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          {...register("email")}
        />
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Message"
          variant="outlined"
          margin="normal"
          name="message"
          {...register("message")}
        />
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
