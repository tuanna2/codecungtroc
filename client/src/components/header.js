import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';

class Header extends React.Component{
    renderUserInfo(){
        if(this.props.auth.user){
            return (
                    <div id="userinfo" className="nav navbar-nav navbar-right">
                        <CustomDropdown
                            dropup
                            noLiPadding
                            buttonText={<span>&nbsp; {this.props.auth.user}</span>}
                            buttonIcon = {() => <img src="../img/avt.jpg" alt="avatar" className="avatar"/>}
                            buttonProps={{
                                color: "transparent",
                            }}
                            hoverColor= "info"
                            dropdownList={[
                                <Link className="header-link" to="/profile">
                                    Profile
                                </Link>,
                                {divider: true},
                                <Link className="header-link" to="/logout">
                                    Logout
                                </Link>
                            ]}
                            >
                                
                            </CustomDropdown>
                    </div>
            );
        }
        else
            return (
            <ul id="userinfo" className="nav navbar-nav navbar-right">
                <li><Link className ="login" to="/login"><span className=" glyphicon glyphicon-log-in"></span> Đăng nhập</Link></li>
                <li><Link className ="login" to ="/signup"><span className=" glyphicon glyphicon-user"></span> Đăng ký</Link></li>
            </ul>
            );
    }
    render(){
        return (
        <div id="header" className="container">
            <div className="row">
                <div className="col-xs-6 col-md-2">
                    <Link to="/" className="pull-left">
                        <img className="retina" src="../img/mamatmun.png" alt="mamatmun"/>
                    </Link>
                </div>
                <div className="col-xs-6 col-md-10">
                        {this.renderUserInfo()}
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);