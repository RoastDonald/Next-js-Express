import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
  Grid,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const CollapseCheckbox = ({
  title,
  isOpen: initOpen,
  list: list,
  onFilter,
  className,
}) => {
  const [state, setState] = useState({
    isOpen: initOpen,
    checked: [],
  });
  useEffect(() => {
    onFilter(state.checked);
  }, [state.checked]);

  const { isOpen, checked } = state;

  const toggleOpen = () => {
    setState((prevState) => ({ ...prevState, isOpen: !isOpen }));
  };

  const handleCheckbox = (val) => {
    const idx = checked.indexOf(val);
    setState((prevState) => {
      const _checked = [...checked];
      if (idx === -1) _checked.push(val);
      else _checked.splice(idx, 1);
      return {
        ...prevState,
        checked: _checked,
      };
    });
  };

  return (
    <Grid item className={className}>
      <ListItem onClick={toggleOpen}>
        <ListItemText primary={title} />
        {isOpen ? <ArrowUpward size={24} /> : <ArrowDownward />}
      </ListItem>
      <Collapse in={isOpen} unmountOnExit>
        <List>
          {list &&
            list.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={() => handleCheckbox(item._id)}
                    checked={checked.indexOf(item._id) !== -1}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </Grid>
  );
};

export default CollapseCheckbox;
