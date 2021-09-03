<template>
	<div class="quickReplyBox">
		<transition name="el-fade-in-linear">
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item>
					<div slot="label">
						{{ `${title}: ` }}
					</div>
					<el-select
						v-model="currentReply"
						placeholder="请选择"
						@change="enterReply"
					>
						<el-option
							v-for="(item, index) in list"
							:key="index"
							:label="item"
							:value="item"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						class="btnQuickReplySet"
						icon="el-icon-s-tools"
						@click="openSet"
						:title="tips"
					></el-button>
				</el-form-item>
			</el-form>
		</transition>

		<el-dialog
			:visible.sync="setShow"
			:title="$app.getName()"
			width="90%"
			:show-close="true"
			append-to-body
		>
			<set @updateMyList="updateMyList" />

			<div slot="footer">
				<span class="app-dialog-foot">{{
					`ver: ${$app.getVersion()}`
				}}</span>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				currentReply: '',
				fwin_replyLoaded: false, // 弹层回复面板打开状态
				fwin_replyLoading: false, // 弹层回复面板加载状态
				hasEditor: false, // 是否打开了高级回复
				lastClickElemet: '', // 最后点击的元素
				setShow: false,
			};
		},
		created() {
			this.getList();
		},
		methods: {
			// 获取APP自定义回复
			async getList() {
				let myListStorage = await this.$app.getStorage();
				this.list = myListStorage.length > 0 ? myListStorage : [];
				this.currentReply = this.list[0] || '';
			},
			// 打开APP设置面板
			openSet() {
				this.setShow = !this.setShow;
			},
			// 监听更新自定义回复
			async updateMyList() {
				let myListStorage = await this.$app.getStorage();
				this.list = myListStorage;
			},
			// 设置回复内容
			enterReply() {
				let vm = this;
				if (vm.fwin_replyLoaded) {
					vm.enterPostReply();
				} else if (vm.hasEditor) {
					vm.enterEditorReply();
				} else {
					vm.enterFastPostReply();
				}
			},
			// 设置楼层/右下角快速回复框内容
			enterPostReply() {
				let vm = this;
				let $postmessage = document.querySelector('#postmessage');
				$postmessage.value = vm.currentReply;
			},
			// 设置快速回复框内容
			enterFastPostReply() {
				let vm = this;
				try {
					let $fastpostmessage = document.querySelector(
						'#fastpostmessage'
					);
					$fastpostmessage.style.background = '';
					$fastpostmessage.value = vm.currentReply;
				} catch (err) {
					console.log('请检查发帖权限！');
				}
			},
			// 设置高级回复框内容
			enterEditorReply() {
				let vm = this;
				let $editorIframe = document.querySelector('#e_iframe')
					.contentWindow.document.body;
				$editorIframe.style.background = '';
				$editorIframe.innerHTML = vm.currentReply;
			},
			// 点击楼层回复
			fastreBindClick() {
				let vm = this;
				document.querySelector('body').addEventListener(
					'click',
					(e) => {
						let theElement = `fastre&${e.target.href}`;
						if (
							vm.lastClickElemet != theElement &&
							e.target.className == 'fastre'
						) {
							vm.lastClickElemet = theElement;
							vm.fwin_replyLoaded = false;
						}
					},
					true
				);
			},
			// 点击右下角快速回复按钮
			replyfastBindClick() {
				let vm = this;
				document.querySelector('body').addEventListener(
					'click',
					(e) => {
						let theElement = `replyfast&${e.target.href}`;
						if (
							vm.lastClickElemet != theElement &&
							e.target.className == 'replyfast'
						) {
							vm.lastClickElemet = theElement;
							vm.fwin_replyLoaded = false;
						}
					},
					true
				);
			},
			// 点击楼层/右下角快速回复面板关闭按钮
			flbcBindClick() {
				let vm = this;
				document.querySelector('body').addEventListener(
					'click',
					(e) => {
						let theElement = `flbc&${e.target.href}`;
						if (
							vm.lastClickElemet != theElement &&
							e.target.className == 'flbc'
						) {
							vm.lastClickElemet = theElement;
							vm.fwin_replyLoaded = false;
						}
					},
					true
				);
			},
			// 检测是否是高级回复
			checkEditor() {
				this.hasEditor = document.querySelector('#e_iframe');
			},
			// 监听楼层回复面板加载完成
			postReplyMutationObserver() {
				let vm = this;
				let mos = new MutationObserver(function(mutations, observer) {
					for (const mutation in mutations) {
						if (Object.hasOwnProperty.call(mutations, mutation)) {
							const element = mutations[mutation];
							if (element.target.id == 'subjecthide') {
								vm.fwin_replyLoaded = true;
							}
						}
					}
				});
				mos.observe(document.querySelector('#append_parent'), {
					attributes: true,
					childList: true,
					subtree: true,
				});
			},
		},
		computed: {
			title() {
				return this.$app.getName();
			},
			tips() {
				return `${this.$app.getName()}设置`;
			},
		},
		mounted() {
			this.checkEditor();
			this.postReplyMutationObserver();
			this.enterReply();
			this.fastreBindClick();
			this.replyfastBindClick();
			this.flbcBindClick();
		},
		watch: {
			// 监听楼层回复面板显示状态
			fwin_replyLoaded(n, o) {
				let vm = this;

				if (n) {
					let $floatlayout_reply = document.querySelector(
						'#floatlayout_reply'
					);
					$floatlayout_reply.insertBefore(
						vm.$el,
						$floatlayout_reply.childNodes[0]
					);
					vm.enterPostReply();
				} else {
					let $fastposteditor = document.querySelector(
						'#fastposteditor'
					);
					$fastposteditor.insertBefore(
						vm.$el,
						$fastposteditor.childNodes[0]
					);
				}
			},
			// 监听自定义回复变化
			currentReply(n, o) {
				n && this.enterReply();
			},
		},
	};
</script>

<style scoped lang="less">
	.quickReplyBox {
		position: relative;
	}
	/deep/ .el-dialog__body {
		padding: 0;
	}
	.app-dialog-foot {
		color: #909399;
		font-size: 14px;
	}
	.el-form-item__label div {
		font-weight: bold;
		color: red;
	}
	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin-bottom: 10px;
	}
	.el-select {
		width: 300px;
	}
</style>
