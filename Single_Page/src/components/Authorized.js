import React, { Component } from 'react'
import { connect } from 'dva';
import { Router, Route, Redirect, withRouter } from 'dva/router';
import { message } from 'antd';

class AuthRouter extends Component {
    render() {
        const { component: Component, ...rest } = this.props
        const { location: { state } } = this.props;
        // console.log(state.isLogin);
        if (state == undefined) {
          message.warning('您需要先登陆');
          return <Redirect to="/" />
        }
        return (
            <Route {...rest} render={props => {
              return state.isLogin
                  ? <Component {...props} />
                  : <Redirect to="/" />
            }} />
        )
      }
}


function mapStateToProps(state) {
  console.log(state)
 return {
   state
 }
}

// export default ListData;
export default connect(mapStateToProps)(withRouter(AuthRouter));