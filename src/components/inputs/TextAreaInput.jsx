import * as React from 'react';
import { styled } from '@mui/system';
import { TextareaAutosize, Typography } from '@mui/material';

export default function TextAreaInput(props) {
  const { error, helperText, ...otherProps } = props;

  return (
    <div>
      <StyledTextarea error={error ? 1 : 0} {...otherProps} />
      {error && <Typography color="error">{helperText}</Typography>}
    </div>
  );
}

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme, error }) => ({
    boxSizing: 'border-box',
    width: '320px',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    padding: '8px 12px',
    borderRadius: '8px',
    color: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.secondary,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : '#fff',
    border: `1px solid ${error ? theme.palette.error.main : theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.secondary}`,
    boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'}`,
    
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },

    '&:focus': {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${error ? theme.palette.error.light : theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}`,
    },

    // firefox
    '&:focus-visible': {
      outline: 0,
    }
  })
);
