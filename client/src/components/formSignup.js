import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Password from "@material-ui/icons/Lock";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../actions';

import axios from 'axios';
import { Redirect } from "react-router-dom";

const ROOT_URL = "http://localhost/api";

class FormSignup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardAnimaton: "cardHidden",
            username: '',
            password: '',
            repass: '',
            error: null,
            loading: false
          };
        this.submit = this.submit.bind(this);
        }
        componentDidMount() {
          document.title = "Đăng ký";
          setTimeout(
            function() {
              this.setState({ cardAnimaton: "" });
            }.bind(this),
            100
          );
        }
        renderLoading(){
          if(this.state.loading)
            return <img width="150" height="150" alt="Loading" className="loading" src="../img/loading.svg"/>;
        }
        submit(e){
          e.preventDefault();
          this.setState({
            error: null,
            loading:true
          });
          const regex = /^[a-zA-Z0-9]{4,30}$/;
          if(regex.test(this.state.username) === false || regex.test(this.state.password) === false){
            this.setState({
              error:"Tài khoản hoặc mật khẩu phải từ 4 đến 30 ký tự và chỉ chứa chữ hoa, thường, số.",
              loading:false
            })
              return;
          }
          else if(this.state.password !== this.state.repass){
              this.setState({
                error:"Mật khẩu và mật khẩu nhập lại không khớp !",
                loading:false
              });
              return
          }
          axios.post(`${ROOT_URL}/signup`,JSON.stringify({ 
            Username:this.state.username,
            Password:this.state.password
          }),
          {
            headers: {
                'Content-Type': 'application/json',
            }
          })
            .then(res => {
                if(res.data.success){
                  localStorage.setItem('token',res.data.token);
                  this.props.loginUser(res.data.user)
                }
                else{
                  this.setState({
                    error: res.data.message,
                    loading:false
                  })
                }
            })
            .catch(err => {
                console.log('err: ',err)
                this.setState({
                  error:err,
                  loading:false
                })
            })
       
        }
        renderError(){
          if (this.state.error) {
            return (
              <div className="alert alert-danger" style={{backgroundColor:"#a94442",fontSize:"13px"}}>
                {this.state.error}
              </div>
            );
        }
        }
    render(){
        if(this.props.auth.user){
          return <Redirect to ="/" />
        }
        const {classes} = this.props;
        return (
            <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4>Sign up</h4>
                      <div className={classes.socialLine}>
                          
                      </div>
                    </CardHeader>
                    <div className={classes.divider}>
                      {this.renderError()}
                    </div>
                    <CardBody>
                      <CustomInput
                        labelText="Tài khoản"
                        id="user"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange:(e)=> this.setState({username:e.target.value})
                          ,
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {this.renderLoading()}
                      <CustomInput
                        labelText="Mật khẩu"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          onChange:(e)=> this.setState({password:e.target.value}),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Password className={classes.inputIconsColor}></Password>
                            </InputAdornment>
                          )
                        }}
                      />
                       <CustomInput
                        labelText="Nhập lại mật khẩu"
                        id="retype-pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          onChange:(e)=> this.setState({repass:e.target.value}),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Password className={classes.inputIconsColor}></Password>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="info" onClick={this.submit}>
                        Đăng ký
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        );
    }
}


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDitpatchToProps = ditpatch =>{
  return bindActionCreators({loginUser},ditpatch)
}

export default connect(mapStateToProps,mapDitpatchToProps)(withStyles(loginPageStyle)(FormSignup));