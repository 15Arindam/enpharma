import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlankHOC from '../utilities/blankHOC';

const MyProfile = ({ auth }) => {
    return (
    <BlankHOC>
        { auth ? 'My Profile' : <><Link to="/login">Login</Link> to view your profile</> }
    </BlankHOC>
)}
const mapStateToProps = state => {
    return {
        auth: state.isUser.userId
    };
}
export default connect(mapStateToProps)(MyProfile);