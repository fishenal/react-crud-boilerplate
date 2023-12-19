import { FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CustomerFormControl = styled(FormControl)(({ theme }) => ({
    '& > .MuiFormLabel-root > .MuiFormLabel-asterisk': {
        color: theme.palette.primary.main,
    },
}))
