const functions = require('firebase-functions');
const cors = require('cors')({ origin: "*", credentials: true, methods: "GET" });
var cheerio = require('cheerio');  
const https = require('https');
var random = require("random-string");
// var fs = require('fs');
var admin = require("firebase-admin");
admin.initializeApp();

var start = 0;


exports.webCrawler = functions.https.onRequest((request, response) => {
	url = 'https://ca.indeed.com/web-developer-jobs'; //target url
	var html = '';
	

	getData(url);
  
  	response.send({ ev_error: 0, ev_result: { 'status': 0 }, ev_message: '' });
  	return true;
});


exports.edit = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
	
		var id = request.body.id;
		var keys = request.body.keys;
		//[{key:kkkk,value:llll},{key:kkkk,value:pppp}]
		// var content = request.query.content;
		console.log(id);
		console.log(keys);

		admin.firestore().collection('job posting').doc(id).get().then(snapshot => {
		    if (!snapshot.empty) {
		        // console.log(snapshot.data());
		        var data = snapshot.data();
		        var key;
		        var value;
		        for(var i=0;i<keys.length;i++){
		        	key = keys[i].key;
		        	value = keys[i].content;
		        	data[key] = value;
		        }
		        
		        const writeResult = admin.firestore().collection('job posting').doc(id).set(data);
		        response.send({ ev_error: 0, ev_result: { 'status': 0 }, ev_message: '' });
		        return true;
		    } else {response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });return true;}
		}).catch(error => {
	          response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });
	      });
  // ...
	});
	

});


exports.softDelete = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var id = request.body.id;
		

		admin.firestore().collection('job posting').doc(id).get().then(snapshot => {
		    if (!snapshot.empty) {
		        // console.log(snapshot.data());
		        var data = snapshot.data();
		        data['show'] = 1;
		        const writeResult = admin.firestore().collection('job posting').doc(id).set(data);
		        response.send({ ev_error: 0, ev_result: { 'status': 0 }, ev_message: '' });
		        return true;

		    } else {response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });return true;}
		}).catch(error => {
	          response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });
	      });
	});
});


exports.search = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var kw = request.body.keyword;

		var search_list = [];
		admin.firestore().collection('job posting').get().then(snapshot => {

		    if (!snapshot.empty) {
		        // console.log(snapshot.data());
		        for (let i = 0; i < snapshot.size; i++) {
		            const data = snapshot.docs[i].data();
		            var target =false;
		            if(data['title'].includes(kw)){
		            	target = true
		            }
		            if(data['desc'].includes(kw)){
		            	target = true
		            }
		            if(data['location'].includes(kw)){
		            	target = true
		            }
		            if(data['salary'].includes(kw)){
		            	target = true
		            }
		            if(data['company'].includes(kw)){
		            	target = true
		            }

		            if(target){
		            	search_list.push(data);
		            }
		            

	        	}
	        	// console.log(search_list);
		        response.send({ ev_error: 0, ev_result: { 'search_list': search_list }, ev_message: '' });
		        return true;

		    } else {
		    	response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });
		    	return true;
		    }
		}).catch(error => {
	          response.send({ ev_error: 1, ev_context:'No Such Result', ev_message: '' });
	      });
	});
});

function getData(url){
	https.get(url, res => {
	    let data = '';
	    res.on('data',function(chunk){
	        data += chunk;
	    });
	    res.on('end',function(){
	      let formatData = parse(data);
		  start += 10;
	      if (start <= 350) { // 继续抓取下一页
	        // 通过分析 url 规律，拼出下一页的 url
	        let tempUrl = 'https://ca.indeed.com/jobs?q=web+developer&start='+ start;
	        getData(tempUrl); // 递归继续抓取
	      } else { // 结束抓取
	         // res.send({ ev_error: 0, ev_result: { 'status': 0 }, ev_message: '' });
	         return 0;
	      }
	    })
    });
}

function parse(data){
	let each = {};
	let posting = [];
	let $ = cheerio.load(data);
	var jobPosting = $('#resultsCol .jobsearch-SerpJobCard');
	// console.log(res)
	
	jobPosting.each((index, item) => {
		var title = $(item).find('.title a').text().replace(/^\s*|\s*$/g,"");
		var company = $(item).find('.sjcl div .company').text().replace(/^\s*|\s*$/g,"");
		var location = $(item).find('.sjcl .location ').text().replace(/^\s*|\s*$/g,"");
		var salary = $(item).find('.salarySnippet').text().replace(/^\s*|\s*$/g,"");
		each = {'title':title,'company':company,'location':location,'salary':salary,'show':0};
		var desc = '';
		var summary = $(item).find('.summary').each(function(i,e){
			// console.log($(e).find('li').text())
			desc += $(e).find('li').text().replace(/^\s*|\s*$/g,"");
			

		})
		each['desc']=desc;
		// posting.push(each);
		
		var temp_id = random({ length: 16 });
		const writeResult = admin.firestore().collection('job posting').doc(temp_id).set(each, { merge: true });
		
		// var title = $(title_div).attr('a').text();
  //   	console.log(title)
    	
  	});
  	return 0;

  	


}





