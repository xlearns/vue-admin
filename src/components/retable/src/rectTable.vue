<template>
  <div v-loading="loading">
    <!-- 头部插槽 + 搜索框 (START) -->
    <div style="text-align: right">
      <slot name="other"></slot>
      <el-input
        v-model="value"
        style="width: 300px"
        size="small"
        placeholder="Search something"
        clearable
        :prefix-icon="Search"
        @change="search"
      >
      </el-input>
    </div>
    <!-- 头部插槽 + 搜索框 (END) -->

    <!-- 数据卡片 (START) -->
    <div class="pro-list">
      <template v-if="!total">
        <el-empty description="暂无数据"></el-empty>
      </template>
      <template v-else>
        <el-row>
          <el-col :span="6" v-for="(item, index) in data" :key="index">
            <div class="pro-item" @click="handlePro(item)">
              <div class="pro-title">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="item.proName"
                  placement="bottom"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <el-avatar :size="30" :src="item.avatar" />
                    <span class="pro-name">{{ item.proName }}</span>
                    <el-tag
                      class="ml-2"
                      :type="proxy.$tools.tagType(item.status)"
                      size="mini"
                      >{{
                        proxy.$tools.changeShow(item.status, proxy.$c.proStatus)
                      }}</el-tag
                    >
                  </div>
                </el-tooltip>
                <div @click.stop.prevent="() => {}">
                  <slot name="controle"></slot>
                  <el-dropdown @command="operate(item, $event)">
                    <svg
                      class="icon"
                      width="200"
                      height="200"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      data-v-042ca774=""
                    >
                      <path
                        fill="currentColor"
                        d="M679.872 348.8l-301.76 188.608a127.808 127.808 0 015.12 52.16l279.936 104.96a128 128 0 11-22.464 59.904l-279.872-104.96a128 128 0 11-16.64-166.272l301.696-188.608a128 128 0 1133.92 54.272z"
                      ></path>
                    </svg>
                    <template #dropdown>
                      <el-dropdown-menu
                        slot="list"
                        style="display: flex; justify-content: space-around"
                      >
                        <el-tooltip content="删除" placement="bottom">
                          <el-dropdown-item command="dele">
                            <svg
                              class="icon"
                              width="200"
                              height="200"
                              viewBox="0 0 1024 1024"
                              xmlns="http://www.w3.org/2000/svg"
                              data-v-042ca774=""
                            >
                              <path
                                fill="currentColor"
                                d="M352 192V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64H96a32 32 0 010-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 01-32-32V256h704v672a32 32 0 01-32 32H192zm224-192a32 32 0 0032-32V416a32 32 0 00-64 0v320a32 32 0 0032 32zm192 0a32 32 0 0032-32V416a32 32 0 00-64 0v320a32 32 0 0032 32z"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                        </el-tooltip>
                        <el-tooltip content="编辑" placement="bottom">
                          <el-dropdown-item command="editor">
                            <svg
                              class="icon"
                              width="200"
                              height="200"
                              viewBox="0 0 1024 1024"
                              xmlns="http://www.w3.org/2000/svg"
                              data-v-042ca774=""
                            >
                              <path
                                fill="currentColor"
                                d="M832 512a32 32 0 1164 0v352a32 32 0 01-32 32H160a32 32 0 01-32-32V160a32 32 0 0132-32h352a32 32 0 010 64H192v640h640V512z"
                              ></path>
                              <path
                                fill="currentColor"
                                d="M469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 10-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 010 135.808l-331.84 331.84a32 32 0 01-18.112 9.088L436.8 623.68a32 32 0 01-36.224-36.224l15.104-105.6a32 32 0 019.024-18.112l331.904-331.84a96 96 0 01135.744 0z"
                              ></path>
                            </svg>
                          </el-dropdown-item>
                        </el-tooltip>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
              <div class="pro-desc omit">{{ item.proDesc }}</div>
              <div class="pro-publish">
                <a href="#" style="color: rgba(0, 0, 0, 0.45)"
                  ><span>{{ item.creator }}</span></a
                >
                <div class="time"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
    </div>
    <!-- 数据卡片 (END) -->

    <!-- 分页 (START) -->
    <div style="text-align: right">
      <el-pagination
        v-model="pageNum"
        :page-size="mPageSize"
        :page-sizes="pageSizeOpts"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 分页 (END) -->
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from "vue";
import { useStore } from "vuex";
import { Search, Share } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
  name: "IviewVue3JsRexttable",
  props: {
    action: String,
    pageSize: { type: Number, default: 16 },
    border: { type: Boolean, default: false },
    size: String,
    flag: { type: String }
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const state = reactive({
      value: "",
      total: 0,
      loading: false,
      mPageSize: props.pageSize,
      pageNum: 1,
      isData: false,
      data: []
    });
    const pageSizeOpts = computed(() => {
      return [...new Set([16, 32, 64, 128, props.pageSize])].sort(
        (a, b) => a - b
      );
    });
    onMounted(() => {
      getData();
    });

    const getData = async () => {
      state.loading = true;
      const { data, err } = await store.dispatch(props.action, {
        pageNum: state.pageNum,
        pageSize: state.mPageSize,
        flag: props.flag,
        name: state.value
      });
      state.loading = false;
      if (data) {
        state.data = data.records.sort((a, b) => a.status - b.status);
        state.total = data.total;
        if (data.records.length) state.isData = false;
        else state.isData = true;
      }
      if (err) {
        ElMessage({
          showClose: true,
          message: err,
          type: "error",
          center: true,
          duration: 2000
        });
      }
    };

    const search = () => {
      console.log("搜索 :>> ", "搜索");
      getData();
    };
    const handlePro = item => {
      context.emit("handlePro", item);
    };
    const handleSizeChange = pageSize => {
      state.mPageSize = pageSize;
      getData();
    };
    const handleCurrentChange = pageNum => {
      state.pageNum = pageNum;
      getData();
    };
    const operate = (item, command) => {
      if (command === "dele") {
        context.emit("dele", item);
      } else if (command === "editor") {
        context.emit("editoe", item);
      }
      return false;
    };
    return {
      proxy,
      ...toRefs(state),
      getData,
      Search,
      Share,
      search,
      pageSizeOpts,
      handlePro,
      handleSizeChange,
      handleCurrentChange,
      operate
    };
  }
};
</script>

<style lang="less" scoped>
.pro-list {
  min-height: 548px;
  overflow: auto;
  margin: 10px 0px;
  .pro-item {
    border: 0;
    border-radius: 0;
    padding: 10px;
    // width: 20%;
    margin: 6px;
    box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0,
      inset 1px 0 0 0 #f0f0f0, inset 0 1px 0 0 #f0f0f0;
    transition: all 0.3s;
    .pro-title {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pro-name {
        margin-left: 12px;
        margin: 0px 4px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
    .pro-desc {
      height: 44px;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    .pro-publish {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
    }
  }
  .pro-item:hover {
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 16%),
      0 3px 6px 0 rgba(0, 0, 0, 12%), 0 5px 12px 4px rgba(0, 0, 0, 9%);
  }
}
.pro-list:before {
  display: table;
  content: "";
}
</style>
