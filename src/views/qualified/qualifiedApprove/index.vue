<template>
  <div class="basic-content">
    <el-form :model="formModel" label-width="80px" label-position="left">
      <el-form-item label="公司查询">
        <el-input v-model="formModel.company" style="width: 400px"></el-input>
        <el-button
          :loading="fetchLoading"
          style="margin-left: 10px"
          type="primary"
          @click="handleQuery"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <XTitle>公司资质信息</XTitle>
    <XTable empty-text="暂无公司资质信息" :data="data" :columns="columns">
      <template #downloadLink="scope">
        <div>
          <el-link type="primary">{{ scope.row.downloadLink }}</el-link>
        </div>
      </template>

      <template #methods>
        <el-button size="mini" type="primary">通过</el-button>
        <el-button size="mini" type="danger">拒绝</el-button>
      </template>
    </XTable>
  </div>
</template>

<script lang="ts" setup>
import { UserService } from '@/api/user';
import { XTable } from '@/components/xTable';
import type { Columns } from '@/components/xTable/interface';
import { XTitle } from '@/components/xTitle';
import { isError } from '@/utils/is';
import { useSubscription } from '@vueuse/rxjs';
import { from, of, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { reactive, ref } from 'vue';

interface QualifiedData {
  userId: string;
  companyName: string;
  uploadTime: string;
  result: string;
  downloadLink: string;
}

const formModel = reactive<{ company: string }>({
  company: '',
});
const data = ref<QualifiedData[]>([]);
const columns: Columns<QualifiedData> = [
  {
    prop: 'userId',
    label: '用户ID',
  },
  {
    prop: 'companyName',
    label: '公司名称',
  },
  {
    prop: 'uploadTime',
    label: '提交时间',
  },
  {
    prop: 'result',
    label: '审核结果',
  },
  {
    prop: 'downloadLink',
    label: '表单下载',
  },
  {
    extraCol: true,
    id: 'methods',
    label: '操作',
  },
];

const fetchLoading = ref(false);
const fetchOb = new Subject<typeof formModel>();

useSubscription(
  fetchOb
    .pipe(
      tap(() => (fetchLoading.value = true)),
      // debounceTime(500),
      switchMap((res) =>
        from(UserService.testData(res)).pipe(
          catchError((err) => {
            return of(new Error(err));
          })
        )
      ),
      tap(() => (fetchLoading.value = false))
    )
    .subscribe((val) => {
      if (!isError(val)) {
        data.value = val.data.map<QualifiedData>((item) => ({
          companyName: item.companyName,
          uploadTime: item.groupName,
          userId: item.userId,
          result: item.cellPhone,
          downloadLink: item.cellPhone,
        }));
      }
    })
);

const handleQuery = () => {
  console.log('click');
  fetchOb.next(formModel);
};
</script>
