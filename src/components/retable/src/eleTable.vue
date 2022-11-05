<template>
  <div ref="eleTable">
    <!-- <el-card :body-style="{padding: '8px'}" style="height: 100%"> -->
    <!-- 表单 (START) -->
    <!-- <form-create
        v-if="config.form"
        v-model:api="formObj" 
        :rule="rule"
        ref="formCreate"
        :option="option" 
        @search-click="onSearch" 
        @clear-click="OnClear"
        ></form-create> -->
    <!-- 表单 (END) -->
    <slot name="other"></slot>

    <!-- 表格 (START) -->
    <div class="table">
      <!-- 表格头部操作栏 (START) -->
      <div style="padding: 0px 10px" class="dis-flex table-header">
        <div class="dis-flex slot-header-l">
          <slot name="header-l"></slot>
        </div>
        <div class="dis-flex slot-header-r">
          <slot name="header-r"></slot>
          <!-- 表头筛选 -->
          <div class="transfer" v-if="filter">
            <el-popover
              placement="bottom"
              trigger="click"
              title="显示/隐藏列"
              width="340px"
            >
              <template #reference>
                <el-button :icon="Filter" size="mini"></el-button>
              </template>
              <el-checkbox-group
                v-model="checkedValue"
                @change="handleColumnsChange"
                style="overflow: auto; height: 140px"
              >
                <el-checkbox
                  v-for="item in checkColumns"
                  :key="item.prop"
                  :label="item.label"
                ></el-checkbox>
              </el-checkbox-group>
            </el-popover>
          </div>
        </div>
      </div>
      <!-- 表格头部操作栏 (END) -->

      <!-- 表格内容 (START) -->
      <el-table
        :data="tableDataValue"
        v-loading="loading"
        :size="options.size"
        :max-height="options.maxHeight"
        :stripe="options.stripe"
        :border="options.border"
        :fit="options.fit"
        :highlight-current-row="options.heightCurrentRow"
        :lazy="options.lazy"
        ref="eleTable"
        @row-click="clickRow"
        @row-dblclick="dblclickRow"
        @row-contextmenu="contextmenu"
        @header-click="headClick"
        @header-contextmenu="headcontextmenu"
        @select="select"
        @select-all="selectAll"
        @current-change="rowChange"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(item, index) in filterColumns" :key="index">
          <!-- 复选框 (START)-->
          <el-table-column
            v-if="item.type === 'selection'"
            type="selection"
            :width="item.minWidth ? item.minWidth : 60"
          ></el-table-column>
          <!-- 复选框 (END) -->

          <!-- 序号 (START) -->
          <el-table-column
            v-else-if="item.type === 'index'"
            type="index"
            :label="item.label ? item.label : '序号'"
            :width="item.minWidth ? item.minWidth : 80"
            :align="item.align ? item.align : 'center'"
          ></el-table-column>
          <!-- 序号 (END) -->

          <!-- 自定义slot (START) -->
          <slot v-else-if="item.slot" :name="item.slot" :tit="index"></slot>
          <!-- 自定义slot (END) -->

          <!-- 默认渲染列 (START) -->
          <el-table-column
            v-else
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :min-width="item.minWidth"
            :show-overflow-tooltip="true"
          >
            <template #default="scope">
              <template v-if="!item.render">
                <template v-if="item.formatter">
                  <span v-html="item.formatter(scope.row, column)"></span>
                </template>
                <template v-else>
                  <span>{{ scope.row[item.prop] }}</span>
                </template>
              </template>
              <template v-else>
                <Ex-Pand
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!-- 表格内容 (END) -->
    </div>
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
    <!-- 表格 (END) -->
    <!-- </el-card> -->
  </div>
</template>

<script lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
  toRaw
} from "vue";
import { useStore } from "vuex";
import { Filter } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import ExPand from "./testExpand";
export default {
  components: { ExPand },
  name: "IviewVue3JsATable",
  props: {
    config: { type: Object },
    action: { type: String },
    tableHeight: { type: Number },
    size: { type: String },
    keyField: { type: String, default: "id" },
    selected: { type: [Object, Array], default: () => [] },
    pageSize: { type: Number, default: 10 },
    filter: {
      type: Boolean,
      default: false
    },
    options: {
      // 表格配置项
      type: Object,
      default: () => ({
        // return {
        // height: 400,
        stripe: false, // 斑马纹
        highlightCurrentRow: true, // 是否要高亮当前行
        border: false, // 是否有纵向边框
        fit: true, // 列的宽度是否自撑开
        size: "small", // Table 的尺寸
        maxHeight: 560, // Table 的最大高度。
        loading: false, //是否需要等待效果
        lazy: false // 是否需要懒加载,
        // }
      })
    }
  },
  setup(props, context) {
    const store = useStore();
    const { proxy } = getCurrentInstance();

    const state = reactive({
      formObj: {}, // 表单数据
      rule: [], // 表单规则
      option: {}, // 表单配置
      isRowChange: false, // 表格列是否改变
      checkedValue: [], // 复选框已选数据
      tableDataValue: [],
      total: 0, // 表格数据总数
      mPageSize: props.pageSize,
      pageNum: 1,
      loading: props.options.loading
    });

    /**表单规则与数据 (START) */
    state.rule = computed(() => {
      if (!props.config.form) return;
      return [...props.config.form.rule];
    }).value;
    state.option = computed(() => {
      if (!props.config.form) return;
      return props.config.form.option;
    }).value;
    /**表单规则与数据 (END) */

    /**复选框参数与配置 (START) */
    // 复选框选择项
    const checkColumns = computed(() => {
      return props.config.table.columns.filter(i => i.label);
    });
    // 复选框已选项 -model
    const checked = computed(() => {
      return proxy.checkColumns.map((i, index) => {
        return i.label;
      });
    });
    /**复选框参数与配置 (END) */

    onMounted(() => {
      getData();
      state.checkedValue = checked.value;
    });
    /**表格参数和配置 (START) */
    const tableConfig = computed(() => {
      return props.config.table;
    }).value;
    // 筛选后的表头
    const filterColumns = computed(() => {
      if (!state.isChange) return props.config.table.columns;
      return props.config.table.columns.filter(
        i => (!i.type && state.checkedValue.includes(i.label)) || i.type
      );
    });
    /**表格参数和配置 (END) */

    /**每页展现条数选择项 */
    const pageSizeOpts = computed(() => {
      return [...new Set([10, 20, 30, 40, proxy.pageSize])].sort(
        (a, b) => a - b
      );
    });

    const getData = async params => {
      let data = null;
      if (!props.action) return;
      state.loading = true;
      if (props.config.form) {
        data = await store.dispatch(props.action, {
          pageNum: state.pageNum,
          pageSize: state.mPageSize,
          ...proxy.formObj.formData()
        });
        console.log("data", data);
      } else {
        data = await store.dispatch(props.action, {
          pageNum: state.pageNum,
          pageSize: state.mPageSize,
          ...params
        });
        console.log("data", data);
      }
      // const { data, err} = await store.dispatch(props.action, params)
      state.loading = false;
      if (data.err)
        return ElMessage({
          showClose: true,
          message: err,
          type: "error",
          center: true,
          duration: 3000
        });
      state.tableDataValue = data.data.records;
      state.total = data.data.total;
    };

    // 表头筛选触发事件
    const handleColumnsChange = value => {
      state.isChange = true;
      state.value = value;
    };
    // 单击行事件
    const clickRow = (row, column, event) => {
      let data = { row, column, event };
      context.emit("clickRow", data);
    };
    // 双击行事件
    const dblclickRow = (row, column, event) => {
      let data = { row, column, event };
      context.emit("dblclickRow", data);
    };
    // 右击行事件
    const contextmenu = (row, column, event) => {
      let data = { row, column, event };
      context.emit("contextmenu", data);
    };
    // 头部列点击事件
    const headClick = (row, column, event) => {
      let data = { row, column, event };
      context.emit("headClick", data);
    };
    // 头部列右击事件
    const headcontextmenu = (row, column, event) => {
      let data = { row, column, event };
      context.emit("headcontextmenu", data);
    };
    // 勾选复选框事件
    const select = (row, column, event) => {
      let data = { row, column, event };
      context.emit("select", data);
    };
    // 勾选全选事件
    const selectAll = (row, column, event) => {
      let data = { row, column, event };
      context.emit("selectAll", data);
    };
    // 行改变事件
    const rowChange = (row, column, event) => {
      let data = { row, column, event };
      context.emit("rowChange", data);
    };
    // 多行选中事件
    const handleSelectionChange = (row, column, event) => {
      let data = { row, column, event };
      context.emit("handleSelectionChange", data);
    };
    // 页面展现条数事件
    const handleSizeChange = pageSize => {
      proxy.mPageSize = pageSize;
      getData();
      console.log("pageSize :>> ", pageSize);
    };
    // 页面跳转事件
    const handleCurrentChange = pageNum => {
      proxy.pageNum = pageNum;
      getData();
      console.log("pageNum :>> ", pageNum);
    };

    // 表单搜索事件
    const onSearch = () => {
      state.pageNum = 1;
      getData();
      console.log("搜索 :>> ", "搜索");
    };
    // 表单清空事件
    const OnClear = () => {
      proxy.formObj.resetFields();
      getData();
      console.log("清空 :>> ", "清空");
    };

    const handleEdit = (index, row) => {
      console.log("scope", toRaw(row));
    };
    return {
      Filter,
      ...toRefs(state),
      tableConfig,
      checkColumns,
      filterColumns,
      pageSizeOpts,
      getData,
      handleEdit,
      onSearch,
      OnClear,
      clickRow,
      dblclickRow,
      contextmenu,
      headClick,
      headcontextmenu,
      select,
      selectAll,
      rowChange,
      handleSelectionChange,
      handleColumnsChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>

<style lang="less" scoped>
.table-header {
  justify-content: space-between;
  align-items: center;
}
.dis-flex {
  display: flex;
}
</style>
