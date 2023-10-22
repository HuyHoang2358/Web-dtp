<template>
  <a-table
    :columns="columns"
    :data-source="data?.data?.items"
    :loading="isLoading"
    size="middle"
    :pagination="false"
    :custom-row="
      () => {
        return {
          onClick: () => {
            console.log('here');
          }, // click row
        };
      }
    "
    row-class-name="cursor-pointer"
  >
    <template #title>
      <a-row jutify="center">
        <a-col :span="12">
          <h1 class="text-3xl mb-1">Danh sách người dùng</h1>
        </a-col>
        <a-col :span="12">
          <div class="flex flex-row gap-x-2.5">
            <a-input-search
              placeholder="Tìm kiếm"
              v-model:value="searchValue"
              @search="onSearch"
            />
            <a-button class="flex justify-center items-center space-x-4">
              Filter
              <IconFilter />
            </a-button>
            <ButtonAddUser />
          </div>
        </a-col>
      </a-row>
    </template>
    <template #bodyCell="{ column, index }">
      <template v-if="column.title === 'STT'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.dataIndex === 'action'">
        <div class="flex flex-row gap-x-4">
          <a-button class="bg-[#F1F1F2] p-1.5"><IconEdit /></a-button>
          <a-button class="bg-[#F1F1F2] p-1.5"><IconTrash /></a-button>
        </div>
      </template>
    </template>
    <template #footer>
      <a-pagination
        :show-size-changer="true"
        @change="onChange"
        :current="currentPage"
        :total="data?.data?.total"
        :page-size="pageSize"
      />
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { useUsers } from '@/services/hooks/useUser';
import IconFilter from '@/components/icons/IconFilter.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import ButtonAddUser from '@/components/admin/ButtonAddUser.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

const currentPage = ref(route.query.p ? Number(route.query.p) : 1);
const pageSize = ref(route.query.size ? Number(route.query.size) : 10);
const searchValue = ref<string>('');

const { data, isLoading } = useUsers({ currentPage, pageSize, searchValue });

const onSearch = (value: string) => {
  searchValue.value = value;
};

const onChange = (currentCb: number, pageSizeCb: number) => {
  currentPage.value = currentCb;

  if (pageSize.value !== pageSizeCb) {
    pageSize.value = pageSizeCb;
    router.replace({
      query: {
        ...route.query,
        p: '1',
        size: pageSizeCb,
      },
    });
    return;
  }

  router.replace({
    query: {
      ...route.query,
      p: currentCb.toString(),
    },
  });
};

const columns = [
  {
    title: 'STT',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
  },
];
</script>
