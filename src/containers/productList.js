import React,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, IconButton, Modal, Fade, Backdrop, Grid, CardMedia, Divider, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Close } from '@material-ui/icons';
import { getProducts } from '../store/actions/products';
import { connect } from 'react-redux';
import BlankHOC from '../utilities/blankHOC';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImg:{
    height: '400px',
    width: '100%'
  },
  modalInfo:{
    alignSelf: 'center'
  },
  closeBtn:{
    marginLeft: '97%',
    marginTop: '-1%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: theme.spacing(100),
    maxHeight: '75vh',
    overflow: 'auto'
  }
}));

export const Product = ({ title, desc, imagePath, closeModal }) => {
const classes = useStyles();
  return(
    <>
      <IconButton className={classes.closeBtn} onClick={closeModal}>
        <Close/>
      </IconButton>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia className={classes.modalImg} image={imagePath} frameBorder="0" />
        </Grid>
        <Grid className={classes.modalInfo} item xs={12} sm={6} md={6}>
          <Typography variant="h5" color="textSecondary" component="h3">
              {title}
          </Typography>
          <Divider/>
          <Typography color="textSecondary" component="h6">
            {desc}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

const ProdList = (props) => {
 
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [prod, setProduct] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleInfoOpen = (e, id) => {
    e.preventDefault();
    setProduct(props.products.filter(p => p.id === id )[0]);
    handleOpen();
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(!props.error)
        if(!props.products.length || props.products.length === 1)
            props.getProductList();
  },[props]);

  return(
      <div  className={classes.root} data-test="div">
      {!props.loading?
        !props.error?
          props.products.length ? 
          <GridList data-test="products" cellHeight={200} cellWidth={200}  >
              {props.products.map((product,index) => (
            <GridListTile  key={index} style= {{ width: '450px',height:'300px' ,padding:'16px'}} >
                <img src= {process.env.REACT_APP_ASSET_URL+ product.image_path}  alt='' /> 
                <GridListTileBar 
                  id={product.id}
                  title= {product.title}
                  subtitle= {<span>Category:  {product.category}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${product.title}`} 
                        className={classes.icon}
                        onClick={e=>handleInfoOpen(e,product.id)}>
                    <InfoIcon />
                </IconButton> 
                }
              />
            </GridListTile>
          )) }
        </GridList>:<BlankHOC>No Data Found</BlankHOC>
          :<BlankHOC>{props.error}</BlankHOC>
        :<BlankHOC>Loading...</BlankHOC>}
          <Modal
            aria-labelledby={``}
            aria-describedby={``}
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Product closeModal={handleClose} title={prod.title} desc={prod.description} 
                  imagePath={process.env.REACT_APP_ASSET_URL+ prod.image_path}/>
              </div>
            </Fade>
          </Modal>
      </div>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products.data,
        loading: state.products.loading,
        error: state.products.error
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        getProductList: () => dispatch(getProducts())
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(ProdList);