import {
    Drawer,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { ReactElement } from 'react'

interface IParams<ItemInterface> {
    item: ItemInterface | null
    open: boolean
    handleClose: () => void
}
const DetailDrawer: <ItemInterface>(
    props: IParams<ItemInterface>
) => ReactElement = ({ item, open, handleClose }) => {
    if (!item) {
        return <></>
    }
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: '50vw' } }}
        >
            <TableContainer>
                <Table>
                    <TableBody>
                        {Object.keys(item).map((k) => {
                            return (
                                <TableRow key={k}>
                                    <TableCell
                                        align="right"
                                        sx={{ background: grey[200] }}
                                    >
                                        {k}
                                    </TableCell>
                                    <TableCell>
                                        {String(item[k as keyof typeof item])}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Drawer>
    )
}

export default DetailDrawer
