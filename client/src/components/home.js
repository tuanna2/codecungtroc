import React from 'react';
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            didMount: false
        }
    }
    componentDidMount(){
        document.title = "Trang chủ";
        setTimeout(
            function() {
              this.setState({ didMount: true });
            }.bind(this),
            100
          );
    }
    render(){
        return (
            <Fade in = {this.state.didMount} id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-12">
                                <div className="jumbotron">
                                    <h1>Online Code Editor</h1><br/><br/>
                                    <p className="lead">Trình soạn thảo mã trực tuyến cho phép mọi người trong phòng cộng tác trong thời gian thực. </p>
                                    <p className="lead">Nó hoạt động trên trình duyệt web của bạn vì vậy không cần cài đặt. </p>
                                    <br/>
                                    <p><a className="btn btn-lg btn-success" href="https://tuanna2.herokuapp.com" role="button">Tạo phòng</a></p>
                                    <div>Hoặc vào phòng :
                                        <form className="form-inline">
                                            <div className="form-group">
                                                <input type="text" placeholder="Nhập key" className="form-control"/>
                                            </div>
                                            <button type="submit" className="btn btn-success">Vào phòng</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
            </Fade>
        );
    }
}
export default Header;