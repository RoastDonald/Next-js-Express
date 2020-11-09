import {
  Collapse,



  FormControlLabel, Grid, List,
  ListItem,
  ListItemText,


  Radio,
  RadioGroup
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, { useState } from "react";
const CollapseRadio = ({ isOpen: initOpen, title, list, onFilter }) => {
  const [state, setState] = useState({
    isOpen: initOpen,
    value: "0",
  });
  const { isOpen, value } = state;
  const toggleOpen = () => {
    setState((prevState) => ({ ...prevState, isOpen: !isOpen }));
  };
  const handleChange = (e) => {
    e.persist();
    onFilter(e.target.value);
    setState((prevState) => ({ ...prevState, value: e.target.value }));
  };

  const renderedList = () =>
    list &&
    list.map((value) => (
      <FormControlLabel
        key={value._id}
        value={`${value._id}`}
        control={<Radio />}
        label={value.name}
      />
    ));

  return (
    <Grid item style={{ listStyle: "none" }}>
      <ListItem onClick={toggleOpen}>
        <ListItemText primary={title} />
        {isOpen ? <ArrowUpward size={24} /> : <ArrowDownward />}
      </ListItem>
      <Collapse in={isOpen} unmountOnExit>
        <List>
          <RadioGroup
            aria-aria-label="prices"
            name="prices"
            value={value}
            onChange={handleChange}
          >
            {renderedList()}
          </RadioGroup>
        </List>
      </Collapse>
    </Grid>
  );
};

export default CollapseRadio;
