import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers'

export const CustomerDatePicker = styled(DatePicker)(({ theme }) => ({
    width: '100%',
    '& > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
    },
    '& .MuiInputBase-input': {
        padding: '12px',
        zIndex: 2,
        background: 'none',
    },
    '& .MuiInputAdornment-root': {
        zIndex: 9,
    },
}))
