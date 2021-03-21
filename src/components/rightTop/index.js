import React, {Component} from "react";
import {Button, Layout, Modal} from "antd";
import "./index.less"
import {withRouter} from "react-router-dom";
import {getUser, logout} from "../../api/adminApi";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {getCurrentFormatTime} from "../../tools/dateTool";

const {Header} = Layout;

class RightTop extends Component {
    state = {
        nickName: getUser().nick_name,
        // currentTime: getCurrentFormatTime()
        currentTime: ""
    }
    _handlerLogout = () => {
        Modal.confirm({
            title: '你真的要退出吗 ?',
            icon: <ExclamationCircleOutlined/>,
            content: '你要退出那就退出吧! 拜拜!',
            okText: "残忍离开",
            cancelText: "考虑一下",
            onOk: () => {
                // console.log('OK');
                logout()
                this.props.history.replace("/login")
            }
        });
    }
    componentDidMount() {
        getCurrentFormatTime()
        // this.timer = setInterval(()=>{
        //     this.setState({
        //         currentTime: getCurrentFormatTime()
        //     })
        // }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <Header className="right-top" style={{padding: 0}}>
                <div className="pane">
                    <div className="top">
                        <span className="nick_name">欢迎您: {this.state.nickName}</span>
                        <Button type="primary" danger onClick={this._handlerLogout}>
                            退出
                        </Button>
                    </div>
                    <div className="bottom">
                        {this.state.currentTime}
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightTop);