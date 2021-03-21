import React, {Component} from "react";
import "./index.less"
import {isLogin} from "../../api/adminApi";
import {Redirect, Switch, Route, Link} from "react-router-dom";
import {Layout, Breadcrumb, Result, Button} from 'antd';
import MenuBar from "../../components/menuBar";
import RightTop from "../../components/rightTop";
import Overview from "./subPages/overview";
import FocusCourse from "./subPages/focusCourse";
import Teacher from "./subPages/teacher";
import Course from "./subPages/course";
import Article from "./subPages/article";
import Statistics from "./subPages/statistics";
import Contact from "./subPages/contact";
import Category from "./subPages/category";
const { Content, Footer } = Layout;



class AdminPane extends Component {

    state = {
        operationPath: []
    }

    _handlerMenuChange = (titles) => {
        // console.log("获取到操作路径", titles)
        if (titles !== this.state.operationPath) {
            this.setState({
                operationPath: titles
            })
        }

    }
    render() {
        if (!isLogin()) {
            return <Redirect to={"/login"}/>
        }

        const {operationPath} = this.state;
        return (
            <div className={"admin-pane"}>
                <Layout className={"layout"}>
                    <MenuBar menuChangeFunc={this._handlerMenuChange}/>
                    <Layout className="site-layout">
                        <RightTop/>
                        <Content className={"content-pane"}>
                            <Breadcrumb className={"bread"}>
                                {operationPath.map(item => {
                                    return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                                })}
                            </Breadcrumb>
                            <div className="site-layout-background">
                                <Switch>
                                    <Route path={"/"} exact component={Overview}/>
                                    <Route path={"/ad_course"} component={FocusCourse}/>
                                    <Route path={"/course_category"} component={Category}/>
                                    <Route path={"/teacher"} component={Teacher}/>
                                    <Route path={"/course"} component={Course}/>
                                    <Route path={"/article"} component={Article}/>
                                    <Route path={"/chart"} component={Statistics}/>
                                    <Route path={"/web_contact"} component={Contact}/>
                                    <Route>
                                        <Result
                                            status="404"
                                            title="404"
                                            subTitle="页面不存在, 请不要瞎操作!"
                                            extra={<Button type="primary"><Link to={"/"}>回到首页</Link></Button>}
                                        />
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                        <Footer className={"footer"}>撩课教育 - 极系列-H5-React方向 撩课-Sz 微信: 天天撩课</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default AdminPane;