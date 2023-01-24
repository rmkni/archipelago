import React, { useMemo } from 'react';
import { useResourceDefinitions } from 'react-admin';
import { Grid, Select, MenuItem, TextField, Button } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useNavigate, useLocation } from 'react-router-dom';

const FilterText = ({ input, ...otherProps }) => <TextField {...input} {...otherProps} />;

const TypeSelect = ({ input, ...otherProps }) => {
  const resourceDefinitions = useResourceDefinitions();
  const resources = useMemo(() => Object.values(resourceDefinitions), [resourceDefinitions]);
  return (
    <Select {...input} {...otherProps}>
      {resources
        .filter(resource => resource.hasList || resource.name === input.value)
        .map(resource => (
          <MenuItem value={resource.name} key={resource.name}>
            {resource.options.label}
          </MenuItem>
        ))}
    </Select>
  );
};

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const currentType = matches ? matches[1] : 'Organization';

  const onSubmit = ({ filter, type }) => {
    if (filter) {
      navigate(`/${type}?filter=${encodeURIComponent(`{"q": "${filter}"}`)}`);
    } else {
      navigate(`/${type}?filter=${encodeURIComponent(`{}`)}`);
    }
  };

  return ( 
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Field name="filter" component={FilterText} placeholder="Rechercher..." fullWidth />
            </Grid>
            <Grid item xs={5}>
              <Field name="type" component={TypeSelect} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <Button color="secondary" variant="outlined" type="submit" fullWidth>
                Hop
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default SearchForm;
