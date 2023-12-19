import { FormControl, Grid } from '@mui/material'
import { RangeNum } from 'types'
import { BootstrapInput } from './BootstrapInput'

type Props = {
    value: RangeNum
    onChange: (value: RangeNum) => void
}

export const ComponentRangeNum = ({ value: range, onChange }: Props) => {
    const handleChange = (type: 'min' | 'max', value: number) => {
        const newRange = {
            ...range,
            [type]: value,
        }
        onChange(newRange)
    }

    return (
        <Grid container sx={{ gap: 1, alignItems: 'center' }}>
            <Grid item xs={5}>
                <FormControl variant="standard">
                    <BootstrapInput
                        type="number"
                        value={range.min?.toString() || ''}
                        inputProps={{
                            min: 0,
                        }}
                        onChange={(e) => {
                            handleChange('min', Number(e.target.value))
                        }}
                        placeholder="Min"
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
                    <BootstrapInput
                        type="number"
                        value={range.max?.toString() || ''}
                        inputProps={{
                            min: 0,
                        }}
                        onChange={(e) => {
                            handleChange('max', Number(e.target.value))
                        }}
                        placeholder="Max"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}
