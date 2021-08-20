// 初始化AV
AV.init({
  appId: "JLqezdmWrYQOatywxVKmB9pX-gzGzoHsz",
  appKey: "hemx77fyB2Usg317i2crcuer",
  serverURL: "https://jlqezdmw.lc-cn-n1-shared.com"
});

// 创建实例
const query = new AV.Query('cms_reply');
const user = AV.User;

/* 创建接口 */
const getSystemReply = function(){
  return new Promise(async function(resolve, reject){
    let list = [];
    await query.equalTo('insertId', 0).find().then(res=>{
      res.forEach(item => {
        list.push(item.attributes);
        console.log(item.attributes);
      });
      resolve(list);
    });
  });
  /* return new Promise((resolve, reject)=>{
    let list = await query.equalTo('insertId', 0).find();
    resolve(list); 
  }); */

}

export {
  getSystemReply
}