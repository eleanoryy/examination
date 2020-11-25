import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './post.css';
import { Modal,Input,Avatar,Col,Row,Button,message,Spin} from 'antd';
import moment from 'moment';
import Image from'../components/images.js';
import EachPosting from'../components/eachPosting.js';


import firebaseApp from '../components/firebaseConfig.js';
import firebaseConfig from '../components/firebaseConfig.js';
import 'firebase/firestore';

const firestore = firebaseApp.firestore();

const { TextArea } = Input;

@connect(({ Post, loading }) => ({
  Post,
  loading: loading.effects['Post/fetch'],
}))



class Post extends Component {
  constructor(props) {
    super(props);
    // console.log(props)

    
  }

  state = {
    jobs:[],
    show_jobs:[],
    start:0,
    end:0,
    target:{},
    edit:false,
    loading:false,
    jump:false,

  };

  componentDidMount() {

      var temp =[];
      var show = [];
      var end = 0;
      var that = this;
      firestore.collection('job posting').get().then((snapshot)=>{
        for(let i=0;i<snapshot.size;i++){

          const data = snapshot.docs[i].data();
          data['id'] = snapshot.docs[i].id;
          temp.push(data);

          //show list
          if(data['show']==0){
            show.push(data)
          }
        }


        if(this.state.end+15 < show.length){
          end = this.state.end+15;
        }else{
          end = show.length;
        }

        that.setState({
          jobs:temp,
          show_jobs:show,
          end:end
        })

      })


      window.addEventListener('scroll', this.handleScroll);
    


    
    

    
    

  }

  componentDidUpdate(prevProps,prevState){
    
    if(prevProps.Post.edit!= undefined && prevProps.Post.edit.ev_error != undefined){
      if(prevProps.Post.edit.ev_result == this.props.Post.edit.ev_result){
        
        
        if(this.props.Post.edit.ev_error==0){
          const { dispatch } = this.props;
          dispatch({
              type: 'Post/clearEdit',
              payload:{
                
              }
          });
          message.success('Edit Successfully!');
          // var start = this.state.start;
          var end = this.state.end;
          //const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
          // window.location.href = window.location.href;
          var temp =[];
          var show = [];
          
          var that = this;

          setTimeout(function() { 
            firestore.collection('job posting').get().then((snapshot)=>{
              for(let i=0;i<snapshot.size;i++){

                const data = snapshot.docs[i].data();
                data['id'] = snapshot.docs[i].id;
                temp.push(data);

                //show list
                if(data['show']==0){
                  show.push(data)
                }
              }


              // if(this.state.end+15 < show.length){
              //   end = this.state.end+15;
              // }else{
              //   end = show.length;
              // }
              
              that.setState({
                end:end,
                target:{},
                loading:false,
                jump:true,
                temp:temp,
                show_jobs:show

              })
              

            })
          },2000);
          
          
        }
      }
    }


    if(prevProps.Post.deletePost.ev_error != undefined){
      if(prevProps.Post.deletePost.ev_result == this.props.Post.deletePost.ev_result){
        // console.log('ads info');
        
        if(this.props.Post.deletePost.ev_error==0){
          const { dispatch } = this.props;
          dispatch({
              type: 'Post/clearDeletePost',
              payload:{
                
              }
          });
          message.success('Delete Successfully!');
          // var start = this.state.start;
          var end = this.state.end;
          var temp =[];
          var show = [];
          var that = this;
          setTimeout(function() { 
              firestore.collection('job posting').get().then((snapshot)=>{
            for(let i=0;i<snapshot.size;i++){

              const data = snapshot.docs[i].data();
              data['id'] = snapshot.docs[i].id;
              temp.push(data);

              //show list
              if(data['show']==0){
                show.push(data)
              }
            }


            // if(this.state.end+15 < show.length){
            //   end = this.state.end+15;
            // }else{
            //   end = show.length;
            // }

            that.setState({
              end:end,
              loading:false,
              jump:true,
              temp:temp,
              show_jobs:show

            })
            

          })


          }, 2000);
          
         
          
          
          
        }
      }
    }


    if(prevProps.Post.search.ev_error != undefined){
      if(prevProps.Post.search.ev_result == this.props.Post.search.ev_result){
        // console.log('ads info');
        
        if(this.props.Post.search.ev_error==0){
          
          message.success('Search Successfully!');
          var start = 0;
          // var end = 0;
          // window.location.href = window.location.href;

          this.setState({
            show_jobs:this.props.Post.search.ev_result.search_list,
            loading:false,
            start:start,
            // end:end
          });
          const { dispatch } = this.props;
          dispatch({
              type: 'Post/clearSearch',
              payload:{
                
              }
          });
          
          
          
        }
      }
    }

    
    



        
        
        


      
        
  }

  componentWillUnmount() {
     window.removeEventListener('scroll',this.handleScroll);
    
  }

  
  
 
handleScroll=(event)=> {
  // console.log(e)
  const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
  const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
  const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
  const height = scrollHeight - scrollTop - clientHeight;
  const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
  // var isTop = scrollTop + clientHeight + 20  scrollHeight;
  // console.log(isBottom)
  // console.log(scrollTop, clientHeight, scrollHeight, isBottom);
  if(isBottom){

    if(this.state.start+15<this.state.show_jobs.length){
      // var start = this.state.start+15;
      var end = this.state.end+15;
      // console.log(start);
      this.setState({
        // start:start,
        end:end
      })
    }

  }

  if(this.state.jump){
    // console.log(clientHeight);
    window.scrollTo(0,clientHeight+100);
    this.setState({
      jump:false
    })
  }
        
      
}


search(e){
  // console.log(e.target.value);
  if(e.target.value != ''){
    var data = {'keyword':e.target.value};
    const { dispatch } = this.props;
    dispatch({
            type: 'Post/fetchSearch',
            payload:data
          });
    this.setState({
      loading:true
    })
  }else{
    window.location.href = window.location.href;

  }
}

title(e){
  // console.log(e.target.value);
  var target = this.state.target;
  if(target['keys']==undefined){
    if(e.target.value != ''){
      target['keys'] = [{key:'title',content:e.target.value}]; 
    }
  }else{
    if(e.target.value != ''){
      // console.log(target)
      for(var i=0;i<target['keys'].length;i++){
        if(target['keys'][i]['key']=='title'){
          target['keys'][i]['content'] = e.target.value
        }
      }
    }
  }
  // console.log(target)
  this.setState({
    target:target
  })
}

company(e){
  // console.log(e.target.value);
  var target = this.state.target;
  if(target['keys']==undefined){
    if(e.target.value != ''){
      target['keys'] = [{key:'company',content:e.target.value}]; 
    }
  }else{
    if(e.target.value != ''){
      // console.log(target)
      for(var i=0;i<target['keys'].length;i++){
        if(target['keys'][i]['key']=='company'){
          target['keys'][i]['content'] = e.target.value
        }
      }
    }
  }
  // console.log(target)
  this.setState({
    target:target
  })

}

location(e){
  // console.log(e.target.value);
  var target = this.state.target;
  if(target['keys']==undefined){
    if(e.target.value != ''){
      target['keys'] = [{key:'location',content:e.target.value}]; 
    }
  }else{
    if(e.target.value != ''){
      // console.log(target)
      for(var i=0;i<target['keys'].length;i++){
        if(target['keys'][i]['key']=='location'){
          target['keys'][i]['content'] = e.target.value
        }
      }
    }
  }
  // console.log(target)
  this.setState({
    target:target
  })

}

salary(e){
  // console.log(e.target.value);
  var target = this.state.target;
  if(target['keys']==undefined){
    if(e.target.value != ''){
      target['keys'] = [{key:'salary',content:e.target.value}]; 
    }
  }else{
    if(e.target.value != ''){
      // console.log(target)
      for(var i=0;i<target['keys'].length;i++){
        if(target['keys'][i]['key']=='salary'){
          target['keys'][i]['content'] = e.target.value
        }
      }
    }
  }
  // console.log(target)
  this.setState({
    target:target
  })

}

desc(e){
  // console.log(e.target.value);
  var target = this.state.target;
  if(target['keys']==undefined){
    if(e.target.value != ''){
      target['keys'] = [{key:'desc',content:e.target.value}]; 
    }
  }else{
    if(e.target.value != ''){
      // console.log(target)
      for(var i=0;i<target['desc'].length;i++){
        if(target['keys'][i]['key']=='title'){
          target['keys'][i]['content'] = e.target.value
        }
      }
    }
  }
  // console.log(target)
  this.setState({
    target:target
  })

}






edit(e){
  // console.log(e);

  var target = this.state.target;
  target['id'] = e['id'];
  this.setState({
    target:target,
    edit:true,
  });
  
  
  
    
  
}

editSubmit(){
  if(this.state.target['keys'] != undefined){
    var data = {id:this.state.target['id'],keys:this.state.target['keys']}
    const { dispatch } = this.props;
    dispatch({
          type: 'Post/fetchEdit',
          payload:data
        });
    this.setState({
      loading:true,
      edit:false
    })
  }
}

editCancel(){
  this.setState({
    edit:false
  })
}


delete(e){
  const { dispatch } = this.props;
  var data = {id:e['id']};
  dispatch({
          type: 'Post/fetchDeletePost',
          payload:data
        });
  this.setState({
      loading:true
    })


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
        <div id={styles.header}>
            <div id={styles.search_box}>
              <Input id={styles.search} placeholder="Search Job Postings"  onBlur={this.search.bind(this)} />
              <div id={styles.icon_box}>
                <img style={{marginTop:10,marginLeft:8}} src={Image.basic.search}></img>   
              </div>
            </div>
        </div>
        <Spin spinning={this.state.loading}>
          <div id={styles.postings}>
            {this.state.show_jobs.slice(this.state.start,this.state.end).map((e)=>{
              return <div id={styles.job}>
                <EachPosting job={e}/>
                <div id={styles.label} style={{marginRight:20}} onClick={this.edit.bind(this,e)}>Edit</div>
                <div id={styles.label} onClick={this.delete.bind(this,e)}>Delete</div>
                </div>
            })}
          </div>
        </Spin>
        <Modal
          title="Edit Posting"
          visible={this.state.edit}
          onOk={this.editSubmit.bind(this)}
          onCancel={this.editCancel.bind(this)}
        >
          <div id={styles.postings} style={{marginLeft:10}}>
            <div id={styles.label} style={{marginTop:20}}>Title</div>
            <Input style={{width:'60%'}} placeholder="title"  onBlur={this.title.bind(this)} />
            <div id={styles.label} style={{marginTop:10}}>Company</div>
            <Input style={{width:'60%'}} placeholder="Company"  onBlur={this.company.bind(this)} />
            <div id={styles.label} style={{marginTop:10}}>Location</div>
            <Input style={{width:'60%'}} placeholder="Location"  onBlur={this.location.bind(this)} />
            <div id={styles.label} style={{marginTop:10}}>Salary</div>
            <Input style={{width:'60%'}} placeholder="Salary"  onBlur={this.salary.bind(this)} />
            <div id={styles.label} style={{marginTop:10}}>Description</div>
            <TextArea rows={4} placeholder="Description" onBlur={this.desc.bind(this)} />
          </div>
        </Modal>
        
      </div>
      
    );
  }
}

export default Post;
