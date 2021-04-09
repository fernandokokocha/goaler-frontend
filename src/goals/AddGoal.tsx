import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Goal } from "./types";

export const AddGoal = ({ addGoal }: { addGoal: (goal: Goal) => void }) => {
  const [name, setName] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [link, setLink] = useState("");
  const [explanation, setExplanation] = useState("");
  const [level1, setLevel1] = useState(10);
  const [level2, setLevel2] = useState(100);
  const [level3, setLevel3] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [visualization, setVisualization] = useState("");

  const handleAddGoal = () => {
    addGoal({
      name,
      inspiration: {
        name: inspiration,
        link,
      },
      explanation,
      level1,
      level2,
      level3,
      progress,
      visualization
    });
  };

  return (
    <>
      <Typography variant="h6" align="center" component="h6" gutterBottom>
        🏁 Add Goal 🏁
      </Typography>

      <Paper>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input">Nazwa</InputLabel>
              <Input
                id="my-input"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-0">Inspiracja</InputLabel>
              <Input
                id="my-input-0"
                value={inspiration}
                onChange={(ev) => setInspiration(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-0">Link (opcjonalny)</InputLabel>
              <Input
                id="my-input-0"
                value={link}
                onChange={(ev) => setLink(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-2">O co chodzi</InputLabel>
              <Input
                id="my-input-2"
                value={explanation}
                onChange={(ev) => setExplanation(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-6">
                Wizualizacja (link do obrazka)
              </InputLabel>
              <Input
                id="my-input-6"
                value={visualization}
                onChange={(ev) => setVisualization(ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-3">Level 1</InputLabel>
              <Input
                id="my-input-3"
                value={level1}
                onChange={(ev) => setLevel1(Number(ev.target.value))}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-4">Level 2</InputLabel>
              <Input
                id="my-input-4"
                value={level2}
                onChange={(ev) => setLevel2(Number(ev.target.value))}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="my-input-5">Level 3</InputLabel>
              <Input
                id="my-input-5"
                value={level3}
                onChange={(ev) => setLevel3(Number(ev.target.value))}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input-6">Progres</InputLabel>
              <Input
                id="my-input-6"
                value={progress}
                onChange={(ev) => setProgress(Number(ev.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddGoal}>
              Add!
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
