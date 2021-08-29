<template>
  <div class="basic-content">
    <XTitle
      >通知
      <template #right>
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="dialogVisible = true"
          >添加</el-button
        >
      </template>
    </XTitle>
    <XTable :loading="fetchLoading" empty-text="暂无公司资质信息" :data="data" :columns="columns">
      <template #downloadLink="scope">
        <div>
          <el-link type="primary">{{ scope.row.downloadLink }}</el-link>
        </div>
      </template>
      <template #methods>
        <el-button size="mini" type="primary" @click="dialogVisible = true">编辑</el-button>
        <el-button size="mini" type="success">发送</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </XTable>
    <MessageDialog v-model="dialogVisible" />
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
import { onMounted, reactive, ref } from 'vue';
import MessageDialog from './components/MessageDialog.vue';

interface NotificationData {
  id: string;
  title: string;
  devAccount: string;
  content: string;
}

const formModel = reactive<{ company: string }>({
  company: '',
});

const dialogVisible = ref(false);

const data = ref<NotificationData[]>([]);
const columns: Columns<NotificationData> = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'title',
    label: '标题',
  },
  {
    prop: 'devAccount',
    label: '提交时间',
  },
  {
    prop: 'content',
    label: '内容',
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
        data.value = val.data.map<NotificationData>((item) => ({
          id: item.companyName,
          title: item.groupName,
          devAccount: item.userId,
          content: item.cellPhone,
        }));
      }
    })
);

const handleQuery = () => {
  fetchOb.next(formModel);
};

onMounted(() => {
  handleQuery();
});
</script>
