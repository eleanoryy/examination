import {search,deletePost,edit} from '@/services/post';


export default {
  namespace: 'Post',

  state: {
    loading:true,
    
    search:{},
    eidt:{},
    deletePost:{}

    

    
  },

  effects: {
    *fetch(_, { call, put }) {
      
      
      const response = yield call();
      
      
      
      // yield put({
      //   type: 'saveGlobal',
      //   payload: response,
      // });
    },

    


    *fetchEdit({payload}, { call, put }) {
      
      const response = yield call(edit,payload);
      console.log(response)
      
      yield put({
        type: 'edit',
        payload:response
      });
    },


    *fetchDeletePost({payload}, { call, put }) {
      
      const response = yield call(deletePost,payload);
      console.log(response)
      
      yield put({
        type: 'deletePost',
        payload:response
      });
    },


    *fetchSearch({payload}, { call, put }) {
      
      const response = yield call(search,payload);
      console.log(response)
      
      yield put({
        type: 'search',
        payload:response
      });
    },


    

    

    
    
  },

  reducers: {
    search(state, { payload }) {
      
      // console.log('back in model')
      state.search = payload;
      return {
        ...state,
        
      };
    },

    clearSearch(state){
      // console.log("clear global")
      state.search={};
      return{
        ...state,
        
      }
    },

    edit(state, { payload }) {
      
      // console.log('back in model')
      state.edit = payload;
      return {
        ...state,
        
      };
    },

    clearEdit(state){
      // console.log("clear global")
      state.edit={};
      return{
        ...state,
        
      }
    },


    deletePost(state, { payload }) {
      
      // console.log('back in model')
      state.deletePost = payload;
      return {
        ...state,
        
      };
    },

    clearDeletePost(state){
      // console.log("clear global")
      state.deletePost={};
      return{
        ...state,
        
      }
    },

    
    
    

    
    
    
  },
};
