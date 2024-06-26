import {
  DANANG_CENTER_POINT,
  HAIPHONG_CENTER_POINT,
  HANOI_CENTER_POINT,
  PHUQUOC_CENTER_POINT,
  THUDUC_CENTER_POINT,
} from '@/DTP_3D/config/mainConfig';

export const BASE_MAPS = [
  {
    id: '1',
    name: 'Bản đồ hybrid Google',
    preview_image: '/images/baseMap/Google_hybrid_preview.png',
    description: 'Bản đồ vệ tinh có độ phân giải cao',
    options: {
      url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
  },
  {
    id: '2',
    name: 'Bản đồ Viettel',
    preview_image: '/images/baseMap/Viettel_map_preview.png',
    description: 'Bản đồ vector hành chính, đường đi',
    options: {
      url: 'https://api-maps.viettel.vn/gateway/mapservice/v1/styles/vtmap/{z}/{x}/{y}.png?access_token=4474ace29cd4d4fa14847303d2a6d6f0',
    },
  },
  {
    id: '3',
    name: 'Bản đồ Esri',
    preview_image: '/images/baseMap/Esri_preview.png',
    description: 'Bản đồ vệ tinh có độ phân giải cao kết hợp từ Bing, Esri',
    options: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    },
  },
];

export const AREAS = [
  {
    id: '2000000000000000001',
    name: 'Khu vực Phú Quốc',
    description: 'Bản đồ 2D khu vực TP. Phú Quốc',
    type_key: '2D',
    preview_image: '/images/preview/PhuQuoc_2D_preview.png',
    center_point: PHUQUOC_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000002',
    name: 'Khu vực TP.Thủ Đức ',
    description: 'Bản đồ 2D khu vực TP. Thủ Đức',
    type_key: '2D',
    preview_image: '/images/preview/ThuDuc_2D_preview.png',
    center_point: THUDUC_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000003',
    name: 'Khu vực TP.Đà Nẵng',
    description: 'Bản đồ 2D khu vực TP. Đà Nẵng',
    type_key: '2D',
    preview_image: '/images/preview/DaNang_2D_preview.png',
    center_point: DANANG_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000444',
    name: 'Khu vực TP.Hà Nội',
    description: 'Bản đồ 2D khu vực TP.Hà Nội',
    type_key: '2D',
    preview_image: '/images/preview/HaNoi_2D_preview.png',
    center_point: HANOI_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000004',
    name: 'Khu vực TP.Hải Phòng',
    description: 'Bản đồ 2D khu vực TP. Hải Phòng',
    type_key: '2D',
    preview_image: '/images/preview/HaiPhong_2D_preview.png',
    center_point: HAIPHONG_CENTER_POINT,
    active: true,
  },

  {
    id: '2000000000000000005',
    name: 'Khu vực TP.Phú Quốc',
    description: 'Bản đồ 3D không có texture khu vực TP. Phú Quốc',
    type_key: '3D_NO_TEXTURE',
    type_data: 'tile',
    preview_image: '',
    center_point: PHUQUOC_CENTER_POINT,
    active: false,
  },
  {
    id: '2000000000000000006',
    name: 'Khu vực TP.Thủ Đức ',
    description: 'Bản đồ 3D không có texture khu vực TP. Thủ Đức',
    type_key: '3D_NO_TEXTURE',
    type_data: 'tile',
    preview_image: '/images/preview/ThuDuc_tile_no_texture.png',
    center_point: THUDUC_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000007',
    name: 'Thành phố Đà Nẵng',
    description: 'Bản đồ 3D không có texture khu vực TP. Đà Nẵng',
    type_key: '3D_NO_TEXTURE',
    type_data: 'gltf',
    slug: 'da_nang',
    preview_image: '/images/preview/DaNang_no_texture_preview.png',
    center_point: DANANG_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000777',
    name: 'Thành phố Hà Nội',
    description: 'Bản đồ 3D không có texture khu vực TP. Hà Nội',
    type_key: '3D_NO_TEXTURE',
    type_data: 'gltf',
    slug: 'ha_noi',
    preview_image: '/images/preview/HaNoi_no_texture_preview.png',
    center_point: HANOI_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000008',
    name: 'Khu vực TP.Hải Phòng',
    description: 'Bản đồ 3D không có texture khu vực TP. Hải Phòng',
    type_key: '3D_NO_TEXTURE',
    type_data: 'tile',
    preview_image: '',
    center_point: HAIPHONG_CENTER_POINT,
    active: false,
  },

  {
    id: '2000000000000000009',
    name: 'Khu vực TP.Phú Quốc',
    description: 'Bản đồ 3D có texture khu vực TP. Phú Quốc',
    type_key: '3D_TEXTURE',
    type_data: 'tile',
    preview_image: '',
    center_point: PHUQUOC_CENTER_POINT,
    active: false,
  },
  {
    id: '2000000000000000010',
    name: 'Khu vực TP.Thủ Đức ',
    description: 'Bản đồ 3D có texture khu vực TP. Thủ Đức',
    type_key: '3D_TEXTURE',
    type_data: 'tile',
    preview_image: '',
    center_point: THUDUC_CENTER_POINT,
    active: false,
  },
  {
    id: '2000000000000000011',
    name: 'Thành phố Đà Nẵng',
    description: 'Bản đồ 3D có texture khu vực TP. Đà Nẵng',
    type_key: '3D_TEXTURE',
    type_data: 'gltf',
    slug: 'da_nang',
    preview_image: '/images/preview/DaNang_texture_preview.png',
    center_point: DANANG_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000001212',
    name: 'Thành phố Hà Nội',
    description: 'Bản đồ 3D có texture khu vực TP. Hà Nội',
    type_key: '3D_TEXTURE',
    type_data: 'gltf',
    slug: 'ha_noi',
    preview_image: '/images/preview/HaNoi_texture_preview.png',
    center_point: HANOI_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000012',
    name: 'Khu vực TP.Hải Phòng',
    description: 'Bản đồ 3D có texture khu vực TP. Hải Phòng',
    type_key: '3D_TEXTURE',
    type_data: 'tile',
    preview_image: '/images/preview/HaiPhong_3D_Texture_preview.png',
    center_point: HAIPHONG_CENTER_POINT,
    active: true,
  },

  {
    id: '2000000000000000013',
    name: 'Khu vực TP.Phú Quốc',
    description: 'Bản đồ 4D khu vực TP. Phú Quốc - Đang xây dựng',
    type_key: '4D',
    preview_image: '/images/preview/PhuQuoc_2D_preview.png',
    center_point: PHUQUOC_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000014',
    name: 'Khu vực TP.Thủ Đức ',
    description: 'Bản đồ 4D khu vực TP. Thủ Đức - Đang xây dựng',
    type_key: '4D',
    preview_image: '/images/preview/ThuDuc_2D_preview.png',
    center_point: THUDUC_CENTER_POINT,
    active: true,
  },
  {
    id: '2000000000000000015',
    name: 'Khu vực TP.Đà Nẵng',
    description: 'Bản đồ 4D khu vực TP. Đà Nẵng',
    type_key: '4D',
    preview_image: '',
    center_point: DANANG_CENTER_POINT,
    active: false,
  },
  {
    id: '2000000000000001313',
    name: 'Khu vực TP.Hà Nội',
    description: 'Bản đồ 4D khu vực TP. Hà Nội',
    type_key: '4D',
    preview_image: '',
    center_point: PHUQUOC_CENTER_POINT,
    active: false,
  },
  {
    id: '2000000000000000016',
    name: 'Khu vực TP.Hải Phòng',
    description: 'Bản đồ 4D khu vực TP. Hải Phòng - Đang xây dựng',
    type_key: '4D',
    preview_image: '/images/preview/HaiPhong_2D_preview.png',
    center_point: HAIPHONG_CENTER_POINT,
    active: true,
  },
];
export const MAP_TYPES = [
  {
    id: '1000000000000000001',
    name: '2D',
    key: '2D',
  },
  {
    id: '1000000000000000002',
    name: '3D No Texture',
    key: '3D_NO_TEXTURE',
  },
  {
    id: '1000000000000000003',
    name: '3D Texture',
    key: '3D_TEXTURE',
  },
  {
    id: '1000000000000000004',
    name: '4D',
    key: '4D',
  },
];
