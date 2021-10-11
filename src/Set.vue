<template>
	<div class="setBox">
		<el-card class="box-card" shadow="never">
			<el-row :gutter="30">
				<el-col :span="9">
					<el-card class="box-card" shadow="never">
						<div slot="header" class="clearfix">
							<span>我在用的</span>
						</div>
						<ul class="list" v-if="myList.length > 0">
							<li v-for="(item, index) in myList" :key="index">
								<div class="list-left">
									<div class="list-number">
										{{ `${index + 1}、` }}
									</div>
									<div class="list-title">
										{{ `${item}` }}
									</div>
								</div>
								<div class="list-right">
									<el-tooltip
										class="item"
										effect="dark"
										content="分享它"
										placement="top-start"
									>
										<el-button
											type="success"
											size="mini"
											icon="el-icon-s-promotion"
											circle
											@click="shareReply(index)"
										></el-button>
									</el-tooltip>
									<el-tooltip
										class="item"
										effect="dark"
										content="移除"
										placement="top-start"
									>
										<el-button
											type="danger"
											size="mini"
											icon="el-icon-minus"
											circle
											@click="delReply(index)"
										></el-button>
									</el-tooltip>
								</div>
							</li>
						</ul>
						<p v-if="myList.length == 0" class="tips">
							未设置快速回帖内容!
						</p>
					</el-card>
				</el-col>
				<el-col :span="15">
					<el-card class="box-card" shadow="never">
						<div slot="header" class="clearfix">
							<span>网友分享的</span>
						</div>
						<ul class="list" v-if="systemList.length > 0">
							<li
								v-for="(item, index) in systemList"
								:key="index"
							>
								<div class="list-left">
									<div class="list-number">
										{{ `[${item.replyId}] ` }}
									</div>
									<div class="list-title">
										{{ `${item.content}` }}
									</div>
								</div>
								<div class="list-right">
									<el-tooltip
										class="item"
										effect="dark"
										content="给个赞"
										placement="top-start"
									>
										<el-badge
											:value="item.likeCount"
											type="info"
											:max="99"
											class="item"
										>
											<el-button
												type="success"
												size="mini"
												icon="el-icon-thumb"
												circle
												@click="likeReply(index)"
											></el-button>
										</el-badge>
									</el-tooltip>
									<el-tooltip
										class="item"
										effect="dark"
										content="收藏进我的"
										placement="top-start"
									>
										<el-button
											type="danger"
											size="mini"
											icon="el-icon-star-off"
											circle
											@click="collectReply(index)"
										></el-button>
									</el-tooltip>
								</div>
							</li>
						</ul>
						<el-pagination
							background
							layout="prev, pager, next"
							:page-size="10"
							@current-change="currentPageChange"
							:total="systemListCount"
						>
						</el-pagination>
					</el-card>
				</el-col>
			</el-row>

			<div class="addReplyBox">
				<el-input
					placeholder="请输入新的回复内容"
					v-model="newReply"
					:autosize="{ minRows: 1, maxRows: 3 }"
					maxlength="100"
					:show-word-limit="true"
					resize="none"
					clearable
					class="input-with-select"
				>
					<el-button
						slot="append"
						icon="el-icon-plus"
						@click="addReply"
					></el-button>
				</el-input>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				myList: [],
				systemList: [],
				systemListCount: 0,
				showAddBox: false,
				newReply: '',
			};
		},
		created() {
			this.getMyList();
			this.getSystemList();
		},
		methods: {
			// 获取我的自定义回复列表
			async getMyList() {
				let myListStorage = await this.$app.getStorage();
				this.myList = myListStorage && myListStorage.length > 0 ? myListStorage : [];
			},
			// 获取网友分享的回复列表
			async getSystemList(skip = 0) {
				let vm = this;
				let res = await vm.$api.selectList(skip);
				vm.systemList = res.data.totalCount > 0 ? res.data.list : [];
				vm.systemListCount = res.data.totalCount;
			},
			// 监听分页
			currentPageChange(current) {
				let vm = this;
				let skip = (current - 1) * 10;
				vm.getSystemList(skip);
			},
			// 添加自定义回复
			addReply() {
				let vm = this;
				if (vm.newReply == '') {
					vm.$message.error('回复内容不能为空！');
					return false;
				}
				if (vm.myList.indexOf(vm.newReply) != -1) {
					vm.$message.error('该回复已添加过！');
					vm.newReply = '';
					return false;
				}

				if (vm.myList.length >= 10) {
					vm.$message.warning('自定义回复，超出条数上限！');
					return false;
				}
				vm.myList.push(vm.newReply);
				vm.updateMyList();
				vm.newReply = '';
				return true;
			},
			// 更新自定义回复
			updateMyList() {
				let vm = this;
				vm.$app.setStorage(vm.myList);
				vm.$emit('updateMyList');
			},
			// 删除自定义回复
			delReply(index) {
				let vm = this;
				vm.myList.splice(index, 1);
				vm.updateMyList();
			},
			// 分享自定义回复
			shareReply(index) {
				let vm = this;
				vm.$api
					.replyInsert(vm.myList[index])
					.then((res) => {
						vm.$message.success(res.memo);
					})
					.catch((err) => {
						vm.$message.error(err.memo);
					});
			},
			// 点赞网友分享的回复
			likeReply(index) {
				let vm = this;
				vm.$api
					.likeCountUpdate(vm.systemList[index].id)
					.then((res) => {
						vm.$set(
							vm.systemList[index],
							'likeCount',
							res.data.likeCount
						);
						vm.$message.success(res.memo);
					})
					.catch((err) => {
						vm.$message.error(err.memo);
					});
			},
			// 收藏网友分享的回复
			collectReply(index) {
				let vm = this;
				let nStr = vm.systemList[index].content;
				if (vm.myList.indexOf(nStr) != -1) {
					vm.$message.error('该回复已添加过！');
					return false;
				}
				vm.newReply = nStr;
				vm.$api
					.collectCountUpdate(vm.systemList[index].id)
					.then((res) => {
						vm.addReply() && vm.$message.success(res.memo);
					})
					.catch((err) => {
						vm.$message.error(err.memo);
					});
			},
		},
	};
</script>

<style scoped lang="less">
	.setBox {
	}
	.app-margin-right-30 {
		margin-right: 30px;
	}
	.list {
		&-left {
			padding-right: 15px;
			display: flex;
			flex: 1;
			align-items: stretch;
			justify-content: start;
		}
		&-number {
			margin-right: 5px;
			color: #909399;
		}
		&-title {
			flex: 1;
			font-weight: normal;
		}
		&-right {
			min-width: 70px;
			.el-badge.item {
				margin-right: 30px;
			}
		}
		li {
			margin-bottom: 10px;
			font-size: 14px;
			line-height: 30px;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			&:hover {
				background-color: #f5f5f5;
			}
		}
	}
	.tips {
		color: #909399;
		font-size: 14px;
		text-align: center;
	}
	.addReplyBox {
		margin-top: 15px;
		padding-top: 10px;
		border-top: 1px dashed #ccc;
	}
	.box-card {
		.el-card__header {
			padding: 10px 20px;
			span {
				font-size: 14px;
			}
		}
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}
	.clearfix:after {
		clear: both;
	}
</style>
