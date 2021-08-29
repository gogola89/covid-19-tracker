import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <Typography className="infoBox__cases" color="textSecondary">
                    {cases}
                </Typography>
                <Typography className="infoBox__total" color="textSecondary">
                    Total {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
