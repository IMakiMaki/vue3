<template>
  <div class="basic-content">
    <el-form :model="formModel" label-width="50px" label-position="left">
      <el-form-item label="类型">
        <el-radio-group v-model="formModel.type">
          <el-radio label="phone">手机号</el-radio>
          <el-radio label="companyName">企业名称</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
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
      :company-table-data="companyInfoData"
      :connect-game-table-data="connectGameData"
      :contact-info-table-data="contactInfoData"
    />
  </div>
</template>

<script lang="ts" setup>
import { UserService } from '@/api/user';
import { useETO } from '@/hooks/rxjs/useETO';
import { isError } from '@/utils/is';
import { useSubscription } from '@vueuse/rxjs';
import { from, of, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { reactive, ref } from 'vue';
import type { CompanyInfo } from './components/CompanyTable.vue';
import type { ConnectGame } from './components/ConnectGameTable.vue';
import type { ContactInfo } from './components/ContactInfoTable.vue';
import type { SelectTabsType } from './components/switchTable.vue';
import SwitchTable from './components/switchTable.vue';

const formModel = reactive<{ type: 'phone' | 'companyName'; content: string }>({
  type: 'phone',
  content: '',
});

const activeTab = ref<SelectTabsType>('company');
const fetchLoading = ref(false);
const companyInfoData = ref<CompanyInfo[]>([]);
const contactInfoData = ref<ContactInfo[]>([]);
const connectGameData = ref<ConnectGame[]>([]);
const [handleQuery, query$] = useETO<typeof formModel>();

// const someModel = useObservable(obTestData);
useSubscription(
  query$
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
        if (activeTab.value === 'company') {
          companyInfoData.value = val.data.map<CompanyInfo>((item) => ({
            phone: item.cellPhone,
            companyName: item.companyName,
            businessLicense: String(item.fuserId),
            socialNumber: item.groupName,
            expiredTime: String(item.tomorrowBudget),
            person: item.historyFlag,
            address: item.extendId,
            payAdd: item.budget,
          }));
        }
      }
    })
);
</script>
