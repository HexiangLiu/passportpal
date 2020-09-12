import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import { Grid } from "@material-ui/core";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Header />
          <Hero />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Dashboard />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
