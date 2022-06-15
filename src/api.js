// 初始化AV
AV.init({
	appId: 'JLqezdmWrYQOatywxVKmB9pX-gzGzoHsz',
	appKey: 'hemx77fyB2Usg317i2crcuer',
	serverURL: 'https://quickreply.lc.bmqy.net',
});

// 获取网友分享的回复
const selectList = function(skip = 0, prop='replyId', order='descending') {
	return AV.Cloud.run('selectList', {
        skip: skip,
        prop: prop,
        order: order
    }).then(
		function(res) {
			// 处理结果
            return res
		},
		function(err) {
			// 处理报错
            return err
		}
	);
};

// 添加网友分享的回复
const replyInsert = function(content) {
    return AV.Cloud.run('replyInsert', {
        content: content
    }).then(
        function (res) {
            return res            
        },
        function (err) {
            return err
        }
    );
};

// 更新收藏数量
const collectCountUpdate = function(replyId) {
    return AV.Cloud.run('collectCountUpdate', {
        replyId: replyId
    }).then(
        function (res) {
            return res            
        },
        function (err) {
            return err
        }
    );	
};

// 更新点赞数量
const likeCountUpdate = function(replyId) {
    return AV.Cloud.run('likeCountUpdate', {
        replyId: replyId
    }).then(
        function (res) {
            return res            
        },
        function (err) {
            return err
        }
    );	
};

export { selectList, collectCountUpdate, likeCountUpdate, replyInsert };
