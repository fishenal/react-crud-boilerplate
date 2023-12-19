import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import { TableCell, TableRow } from '@mui/material'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.light,
    },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}))
