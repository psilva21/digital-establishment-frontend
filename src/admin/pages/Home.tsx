import Grid from "@material-ui/core/Grid";
import React from "react";
import MeetingWidgets from "../widgets/MeetingWidgets";
import PersonalTargetsWidget from "../widgets/PersonalTargetsWidget";
import ViewsWidget from "../widgets/ViewsWidget";

const Home = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <ViewsWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PersonalTargetsWidget />
          <MeetingWidgets />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
