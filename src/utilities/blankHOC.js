import React from 'react';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
const BlankHOC = ({ children }) => {
    const classes = useStyles();  
    return (
    <Container maxWidth="lg">
        <Paper className={classes.root} elevation={0}>
            <Typography component="h3" variant="h4" align="center" color="textSecondary">
               {children}
            </Typography>
        </Paper>
    </Container>
)}
export default BlankHOC;