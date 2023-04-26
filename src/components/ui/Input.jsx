import { TextField } from '@mui/material';

const Input = ({name, label, value, onChange, error, helperText}) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={name}
            label={label}
            name={name}
            autoFocus
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
        />
    )
}

export default Input