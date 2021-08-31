// 初始化AV
AV.init({
  appId: "JLqezdmWrYQOatywxVKmB9pX-gzGzoHsz",
  appKey: "hemx77fyB2Usg317i2crcuer",
  serverURL: "https://jlqezdmw.lc-cn-n1-shared.com"
});

// 创建实例
const query = new AV.Query('cms_reply');
const user = AV.User;

// 格式化时间显示
function formatDateTime(date){
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// 获取网友分享的回复
const selectList = function(skip=0){
  return new Promise(async function(resolve, reject){
    let list = [];
    let totalCount = 0;

    await query.count().then((count) => {
      totalCount = count;
    });

    await query.descending('replyId')
      .skip(skip)
      .limit(10)
      .find()
      .then(res=>{
        //console.log('res', res);
        res.forEach(item => {
          let updateTime = formatDateTime(item.updatedAt);
          let data = item.attributes;
          let id = item.id;
          list.push({
            id: id,
            replyId: data.replyId,
            content: data.content,
            likeCount: data.likeCount,
            collectCount: data.collectCount,
            insertId: data.insertId,
            updateTime: updateTime,
          });
        });
        resolve({
          code: 0,
          memo: '获取成功',
          data: {
            list: list,
            totalCount: totalCount,
          },
        });
      });
  });
}

// 添加网友分享的回复
const replyInsert = function(content){
  return new Promise(async function(resolve, reject){
    let count = await query.startsWith('content', content)
      .endsWith('content', content)
      .count().then((count) => {
        return count;
    });

    if(count > 0){
      reject({
        code: 10001,
        memo: '已经有人分享了，换一个吧',
      });
      return false;
    }

    let Reply = AV.Object.extend('cms_reply');
    let reply = new Reply();
    reply.set('content', content)
    .set('insertId', '1')
    .save()
    .then(reply=>{      
      resolve({
        code: 0,
        memo: '分享成功',
        data: {
          content: reply.attributes.content
        },
      });
    })
    .catch(err=>{
      reject({
        code: 100,
        memo: err.message,
      });
    });
  });
}

// 更新收藏数量
const collectCountUpdate = function(replyId){
  return new Promise(async function(resolve, reject){
    let reply = AV.Object.createWithoutData('cms_reply', replyId);
    reply.increment('collectCount', 1)
    .set('updateId', '1')
    .save()
    .then(reply=>{      
      resolve({
        code: 0,
        memo: '收藏成功',
        data: reply,
      });
    })
    .catch(err=>{
      reject({
        code: 100,
        memo: err.message,
      });
    });
  });
}

// 更新点赞数量
const likeCountUpdate = function(replyId){
  return new Promise(async function(resolve, reject){
    let reply = AV.Object.createWithoutData('cms_reply', replyId);
    reply.increment('likeCount', 1)
    .set('updateId', '1')
    .save(null, {fetchWhenSave: true})
    .then(reply=>{   
      console.log('likeCountUpdate', reply);   
      resolve({
        code: 0,
        memo: '点赞成功',
        data: {
          likeCount : reply.attributes.likeCount
        },
      });
    })
    .catch(err=>{
      reject({
        code: 100,
        memo: err.message,
      });
    });
  });
}

export {
  selectList,
  collectCountUpdate,
  likeCountUpdate,
  replyInsert,
}