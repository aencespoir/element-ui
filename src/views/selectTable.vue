<template>
  <div class="SelectTable">
    <el-button icon="el-icon-plus" type="primary" @click="addTable" style="marginBottom: 10px;">添加数据</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
      stripe
    >
      <el-table-column label="序号" width="60" type="index" align="center"></el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" text-align width="80" align="center">
        <template slot-scope="scope">
          <el-popconfirm title="是否确认删除?" @confirm="onDelete(scope)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- 空数据 -->
      <template slot="empty">
        <el-empty :image-size="100" description="暂无数据"></el-empty>
      </template>
    </el-table>

    <!-- 添加数据 -->
    <el-dialog
      title="添加数据"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
      width="80%"
    >
      <el-table
        ref="dialogTableRef"
        :data="gridData"
        :row-key="row => row.id"
        @selection-change="changeSelect"
        stripe
      >
        <el-table-column :selectable="selected" type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <!-- 空数据 -->
        <template slot="empty">
          <el-empty :image-size="100" description="暂无数据"></el-empty>
        </template>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SelectTable",
  data() {
    return {
      dialogTableVisible: false,
      selectedData: [], // 本次选择的数据
      tableData: [],
      gridData: [
        {
          id: '1',
          date: "2017-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路1518号"
        },
        {
          id: '2',
          date: "2018-08-23",
          name: "jinming",
          address: "四川省成都市青羊区青羊总部基地"
        },
        {
          id: '3',
          date: "2019-01-01",
          name: "Lucy",
          address: "北京市朝阳区新北路111号"
        }
      ]
    }
  },
  props: {},
  components: {},
  methods: {
    // 禁用状态控制
    selected(row) {
      const temp = this.tableData.find(el => el.id === row.id)
      return !temp
    },
    // 选择项发生变化时
    changeSelect(selection) {
      let selectionArr = this.$uniqBy(selection, 'id')
      if (!this.$isEmpty(this.tableData)) {
        selectionArr = selectionArr.filter(el => !this.tableData.some(v => el.id === v.id))
      }
      this.selectedData = this.$cloneDeep(selectionArr)
    },
    // 打开选择
    addTable() {
      this.dialogTableVisible = true
      if (!this.$isEmpty(this.tableData)) {
        this.$nextTick(() => {
          const publicData = this.gridData.filter(el => this.tableData.some(v => el.id === v.id)).map(el => el.id)
          this.gridData.forEach(el => {
            if (publicData.includes(el.id)) {
              this.$refs.dialogTableRef.toggleRowSelection(el, true)
            } else {
              this.$refs.dialogTableRef.toggleRowSelection(el, false)
            }
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs.dialogTableRef.clearSelection()
        })
      }
    },
    dialogConfirm() {
      this.selectedData = this.selectedData.filter(el => !this.tableData.some(v => el.id === v.id))
      if (this.$isEmpty(this.selectedData)) {
        this.$notify.warning({ title: '请选择', message: '当前未选择数据' })
      } else {
        this.dialogTableVisible = false
        this.tableData = [...this.tableData, ...this.$cloneDeep(this.selectedData)]
      }
    },
    onDelete({ $index, row }) {
      this.tableData = this.tableData.filter(v => v.id !== row.id)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.SelectTable {
  width: 100%;
  height: 100%;
  padding: 50px 100px;
}
</style>
