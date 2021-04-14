import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Button,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// }));

export default function Form(props) {
  const { register, handleSubmit, errors } = useForm();
  //const classes = useStyles();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h5">
        Contact Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button fullWidth type="submit" color="default" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
}
