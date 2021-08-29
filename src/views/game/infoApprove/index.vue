<template>
  <div class="basic-content">
    <el-form :model="formModel" label-width="90px" label-position="left">
      <el-form-item label="游戏查询">
        <el-input v-model="formModel.content" style="width: 400px"></el-input>
        <el-button
          :loading="fetchLoading"
          style="margin-left: 10px"
          type="primary"
          @click="handleQuery"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <SwitchTable
      v-model:select-tab="activeTab"
      v-loading="fetchLoading"
      :unapproved-table-data="unapprovedData"
      :approved-info-table-data="approvedData"
      :config-info-table-data="configInfoData"
    />
  </div>
</template>

<script lang="ts" setup>
import { UserService } from '@/api/user';
import { isError } from '@/utils/is';
import { useSubscription } from '@vueuse/rxjs';
import { from, of, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { reactive, ref } from 'vue';
import type { UnApprovedInfo } from './components/UnApprovedTable.vue';
import type { ApprovedInfo } from './components/ApprovedTable.vue';
import type { ConfigInfo } from './components/ConfigTable.vue';
import type { SelectTabsType } from './components/switchTable.vue';
import SwitchTable from './components/switchTable.vue';

const formModel = reactive<{ content: string }>({
  content: '',
});

const activeTab = ref<SelectTabsType>('unapproved');
const fetchLoading = ref(false);
const fetchOb = new Subject<typeof formModel>();
const unapprovedData = ref<UnApprovedInfo[]>([]);
const configInfoData = ref<ConfigInfo[]>([]);
const approvedData = ref<ApprovedInfo[]>([]);

// const someModel = useObservable(obTestData);
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
        if (activeTab.value === 'unapproved') {
          unapprovedData.value = val.data.map<UnApprovedInfo>((item) => ({
            gameId: item.cellPhone,
            system: item.companyName,
            from: String(item.fuserId),
            time: item.groupName,
            result: String(item.tomorrowBudget),
            formDownload: item.historyFlag,
            apkDownload: item.extendId,
          }));
        }
      }
    })
);

const handleQuery = () => {
  console.log('click');
  fetchOb.next(formModel);
};
</script>
