<template>
  <header class="absolute z-50 w-screen bg-[#151515] bg-opacity-90 flex flex-col">
    <a-row class="py-3 px-4">
      <a-col
        :span="7"
        class="overflow-x-scroll"
      >
        <div class="flex flex-row items-center space-x-4">
          <div class="flex flex-row items-center">
            <IconWeather />
            <a-typography-text
              class="text-white font-normal ml-2.5 whitespace-nowrap"
              id="weather_temperate"
            >
              24°C
            </a-typography-text>
            <a-button
              type="ghost"
              @click="isExpanded = !isExpanded"
              class="m-0 p-0 -mr-4"
            >
              <template #icon>
                <IconExpandWeather :class="!isExpanded && 'rotate-180'" />
              </template>
            </a-button>
          </div>
          <div
            class="flex flex-row items-center space-x-4"
            v-if="isExpanded"
          >
            <IconLine />
            <div class="flex flex-row items-center">
              <IconUV />
              <a-typography-text class="text-white font-normal ml-2.5 whitespace-nowrap">
                UV 8
              </a-typography-text>
            </div>
            <IconLine />
            <div class="flex flex-row items-center">
              <IconWindy />
              <a-typography-text
                class="text-white font-normal ml-2.5 whitespace-nowrap"
                id="weather_wind_speed"
              >
                2M/S
              </a-typography-text>
            </div>
            <IconLine />
            <div class="flex flex-row items-center">
              <IconHumidity />
              <a-typography-text
                class="text-white font-normal ml-2.5 whitespace-nowrap"
                id="weather_humidity"
              >
                50%
              </a-typography-text>
            </div>
            <IconLine />
            <a-typography-text class="text-white font-normal whitespace-nowrap">
              PM 1.0.0
            </a-typography-text>
            <IconLine />
            <div>
              <a-typography-text class="text-white font-bold whitespace-nowrap">
                {{ 'AOI ' }}
              </a-typography-text>
              <a-typography-text class="text-white font-normal whitespace-nowrap">
                120
              </a-typography-text>
            </div>
          </div>
          <div
            class="flex flex-row items-center space-x-4"
            v-if="!isExpanded"
          >
            <IconLine />
            <a-typography-text
              class="text-white font-normal whitespace-nowrap"
              id="oclock_time"
            >
              15:42:36
            </a-typography-text>
            <IconLine />
            <a-typography-text
              class="text-white font-normal whitespace-nowrap"
              id="oclock_date"
            >
              20/10/2023
            </a-typography-text>
          </div>
        </div>
      </a-col>
      <a-col :span="10">
        <h1
          class="text-[#D0002D] text-center mb-0 font-bold text-base md:text-xl lg:text-3xl whitespace-nowrap font-magistral"
        >
          Digital Twin
        </h1>
      </a-col>
      <a-col :span="7">
        <div class="flex flex-row items-center space-x-4 justify-end">
          <a-typography-text class="text-white font-normal">VIE</a-typography-text>
          <IconLine />
          <IconSetting />
          <IconLine />
          <a-button
            :icon="h(IconProfile)"
            :onclick="onGoToLogin"
            class="bg-transparent flex items-center justify-center border-0"
          />
        </div>
      </a-col>
    </a-row>
    <div class="w-full h-px bg-[#333333]" />
    <!--    <div class="flex flex-row w-full justify-center space-x-8 h-11 items-center overflow-auto">
      <a-button class="font-bold bg-transparent border-0 text-white">
        THÔNG TIN TRUYỀN THÔNG
      </a-button>
      <a-button class="font-medium bg-transparent border-0 text-white">XÂY DỰNG</a-button>
      <a-button class="font-medium bg-transparent border-0 text-white">KẾ HOẠCH ĐẦU TƯ</a-button>
      <a-button class="font-medium bg-transparent border-0 text-white">GIAO THÔNG VẬN TẢI</a-button>
      <a-button class="font-medium bg-transparent border-0 text-white">
        TÀI NGUYÊN MÔI TRƯỜNG
      </a-button>
      <a-button class="font-bold bg-transparent border-0 text-white">
        NÔNG NGHIỆP & PT NÔNG THÔN
      </a-button>
      <a-button class="font-bold bg-transparent border-0 text-white">BỘ CHỈ HUY QUÂN SỰ</a-button>
    </div>-->
  </header>
</template>

<script setup lang="ts">
import IconWeather from '../icons/IconWeather.vue';
import IconLine from '../icons/IconLine.vue';
import IconProfile from '@/components/icons/IconProfile.vue';
import IconSetting from '@/components/icons/IconSetting.vue';
import { h, ref } from 'vue';
import router from '@/router';
import { LOGIN_PAGE_PATH } from '@/configs/routePath';
import IconExpandWeather from '@/components/icons/home/IconExpandWeather.vue';
import IconUV from '@/components/icons/home/IconUV.vue';
import IconWindy from '@/components/icons/home/IconWindy.vue';
import IconHumidity from '@/components/icons/home/IconHumidity.vue';

const isExpanded = ref(false);

const onGoToLogin = () => {
  router.push(LOGIN_PAGE_PATH);
};
</script>
