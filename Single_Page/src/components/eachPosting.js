import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './EachPosting.css';
import { Modal,Input,Avatar,Col,Row,Button,message,Spin} from 'antd';
import moment from 'moment';
import Image from'../components/images.js';






class EachPosting extends Component {
  constructor(props) {
    super(props);
    // console.log(props)

    
  }

  state = {
    
    
    

  };

  componentDidMount() {

    
      
    
    

    
    

    
    

  }

  componentDidUpdate(prevProps,prevState){
    
    
    
  }

  componentWillUnmount() {
    
  }

  
  
 

  
  

  

  render() {
    

    
  

    
    // //<span>
    //           <a href="javascript:;">add 一 {record.title}</a>
    //           <Divider type="vertical" />
    //           <a href="javascript:;">edit</a>
    //           <Divider type="vertical" />
    //         </span>




    return (

      <div id={styles.main} >
        <div id={styles.title}>{this.props.job.title}</div>
        <div id={styles.salary}>{this.props.job.salary}</div>
        <div id={styles.company_box}>
          <div id={styles.label} style={{marginRight:20}}>{this.props.job.company}</div>
          <div id={styles.label}>{this.props.job.location}</div>
        </div>
        <div id={styles.desc}>
          {this.props.job.desc}
        </div>
        
      </div>
      
    );
  }
}

export default EachPosting;
