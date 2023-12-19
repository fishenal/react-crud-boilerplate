import { FormControl, Grid } from '@mui/material'
import { CustomerDatePicker } from './CustomerDatePicker'
import { RangeDate } from 'types'

type Props = {
    value: RangeDate
    onChange: (value: RangeDate) => void
}

export const ComponentRangeDate = ({ value: rangeDate, onChange }: Props) => {
    const handleChange = (type: 'start' | 'end', dt: Date) => {
        const newRange = {
            ...rangeDate,
            [type]: dt,
        }
        onChange(newRange)
    }

    return (
        <Grid container sx={{ gap: 1, alignItems: 'center' }}>
            {/* <Grid item xs={5}>
                <FormControl variant="standard">
                    <CustomerDatePicker
                        reduceAnimations
                        format="yyyy-MM-dd"
                        value={rangeDate.start}
                        onChange={(date) => {
                            handleChange('start', date as Date)
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid
                item
                xs={1}
                sx={{
                    textAlign: 'center',
                }}
            >
                ~
            </Grid>
            <Grid item xs={5}>
                <FormControl variant="standard">
                    <CustomerDatePicker
                        reduceAnimations
                        format="yyyy-MM-dd"
                        value={rangeDate.end}
                        onChange={(date) => {
                            handleChange('end', date as Date)
                        }}
                    />
                </FormControl>
            </Grid> */}
        </Grid>
    )
}
