import React, { useState, useEffect } from 'react';
import MyCard from '../components/cards';
import { Grid, Container, TablePagination } from '@material-ui/core';
import { getWebinars } from '../store/actions/webinars';
import { connect } from 'react-redux';
import BlankHOC from '../utilities/blankHOC';

const WebinarList = (props) => {
    const [page, setPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeCardsPerPage = (event) => {
        setCardsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if(!props.error)
            if(!props.webinars.length || props.webinars.length === 1)
                props.getWebinars();
    },[props]);

    return(
        <Container data-test="container" maxWidth="md">
        {!props.loading?
        !props.error?
        props.webinars.length ?
         <>
            <Grid data-test="webinars" container spacing={4}>
                {props.webinars.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map((card,i) => (
                    <MyCard key={i} card={card}/>
                ))}
            </Grid>
            <TablePagination
                rowsPerPageOptions={[ 3, 6, 9 ]}
                component="div"
                count={props.webinars.length}
                page={page}
                data-test="paginate-test"
                onChangePage={handleChangePage}
                rowsPerPage={cardsPerPage}
                onChangeRowsPerPage={handleChangeCardsPerPage}
            /> 
         </> :<BlankHOC>No Data Found</BlankHOC>
        :<BlankHOC>{props.error}</BlankHOC>
        :<BlankHOC>Loading...</BlankHOC>
        }
        </Container>
    )
}
const mapStateToProps = state => {
    return {
        webinars: state.webinars.data,
        loading: state.webinars.loading,
        error: state.webinars.error
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        getWebinars: () => dispatch(getWebinars())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(WebinarList);