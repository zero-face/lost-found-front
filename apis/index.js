// const baseUrl = "http://82.157.191.65:8888/api/v1/";
const baseUrl = "http://test/api/v1/";
// const baseUrl = "http://localhost:8888/api/v1/";
export const getData=(params) => (
	new Promise((resolve, reject) => {
		uni.request({
		   url: baseUrl + params.url, 
		   method: params.method || "GET",
		   data: params.data || {},
		   header: params.header || {"content-type":"application/x-www-form-urlencoded"}, //自定义请求头信息
		   success: (res) => {
		        resolve(res.data);
		   },
		   fail: (res)=> {
			   reject(res);
		   }
		});
	})
)