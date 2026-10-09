import source from './source-data.json';

export type Place = { id: string; name: string; en: string; position: [number, number]; approximate?: boolean };
const p = (id: string, name: string, en: string, lat: number, lng: number, approximate = false): Place => ({
  id, name, en, position: [lat, lng], approximate,
});

export const places = {
  chc: p('chc', '基督城', 'Christchurch', -43.5309, 172.6365),
  chcStay: p('chcStay', '基督城住宿', '5 Bronco Drive, Christchurch 8025', -43.5641938, 172.5602263),
  airport: p('airport', '基督城机场', 'Christchurch Airport', -43.4894, 172.5322),
  tekapo: p('tekapo', '蒂卡波湖', 'Lake Tekapo', -44.0047, 170.4771),
  church: p('church', '好牧羊人教堂', 'Church of the Good Shepherd', -44.0033, 170.4829),
  stars: p('stars', '蒂卡波肉眼观星', 'Lake Tekapo Dark Sky', -44.0047, 170.4771, true),
  tekapoReception: p('tekapoReception', '蒂卡波住宿接待处', '14 Rapuwai Lane, Lake Tekapo 7999', -44.0041086, 170.4771892),
  tekapoStay: p('tekapoStay', '蒂卡波住宿', '5 Mistake Drive, Lake Tekapo 7999', -44.0113222, 170.4939624),
  pukaki: p('pukaki', '普卡基湖观景', 'Peter’s Lookout', -44.1059, 170.1325, true),
  cook: p('cook', '塔斯曼冰川直升机徒步', 'Mount Cook Airport', -43.7666928, 170.1334316),
  wanakaStay: p('wanakaStay', '瓦纳卡住宿', '67 Matai Road, Wanaka 9305', -44.6827849, 169.1316581),
  tree: p('tree', '孤独之树', 'That Wānaka Tree', -44.6982, 169.1177),
  guns: p('guns', 'Real Guns NZ', 'Real Guns NZ, 1081 Cardrona Valley Road', -44.7901333, 169.0823956),
  arrow: p('arrow', '箭镇', 'Arrowtown', -44.9387, 168.8356),
  queen: p('queen', '皇后镇', 'Queenstown', -45.0312, 168.6626),
  queenStay: p('queenStay', '皇后镇住宿', '2 Anderson Heights Unit 2, Queenstown 9300', -45.0283972, 168.6635981),
  glen: p('glen', '格林诺奇步道', 'Glenorchy Walkway', -44.8503, 168.3835),
  skyline: p('skyline', '天空缆车', 'Skyline Queenstown', -45.027, 168.6569),
  skydive: p('skydive', 'NZONE 跳伞集合点', 'NZONE, 35 Shotover Street', -45.0308665, 168.6607472),
  burger: p('burger', 'Fergburger', 'Fergburger', -45.031, 168.6609),
  lake: p('lake', '皇后镇花园与湖畔', 'Queenstown Gardens', -45.0344, 168.6601),
  zqnCheckin: p('zqnCheckin', '米尔福德飞行集合点', '39 Lucas Place, Queenstown', -45.0251447, 168.7378199),
  milford: p('milford', '米尔福德峡湾', 'Milford Sound', -44.6717, 167.9256),
  moonlight: p('moonlight', 'Moonlight Escape', '91 Oxenbridge Tunnel Road, Arthurs Point, Queenstown', -44.9852773, 168.6660045),
  bannockburn: p('bannockburn', '班诺克本住宿', '61 Hall Road, Bannockburn 9384', -45.0885404, 169.153029),
  omarama: p('omarama', '奥马拉马', 'Omarama', -44.487876, 169.9655968),
  kurow: p('kurow', '库罗', 'Kurow', -44.7338879, 170.4694561),
  oamaruStay: p('oamaruStay', '奥马鲁住宿', '9A Traill Street, Oamaru 9400', -45.1143563, 170.95948),
  oamaru: p('oamaru', '奥马鲁历史街区', 'Oamaru Victorian Precinct', -45.1025, 170.9685),
  penguin: p('penguin', '小蓝企鹅归巢', 'Oamaru Blue Penguin Colony', -45.110276, 170.9801779),
  gardens: p('gardens', '基督城植物园', 'Christchurch Botanic Gardens', -43.5302611, 172.6205644),
};

export type Stop = { place: Place; time: string; detail: string; category: string };
export type Day = {
  id: number; date: string; weekday: string; title: string; subtitle: string; km: number;
  duration: string; city: string; mode: 'drive' | 'flight' | 'walk'; stops: Stop[]; note: string;
};
const s = (key: keyof typeof places, time: string, detail: string, category = '探索'): Stop => ({
  place: places[key], time, detail, category,
});

export const days: Day[] = [
  {
    id: 3, date: '11.01', weekday: '周日', title: '奔向奶蓝色的湖', subtitle: '基督城 → 蒂卡波',
    km: 219, duration: '计划 3 小时 30 分', city: 'Tekapo', mode: 'drive',
    note: '15:00 先到接待处办理入住，再前往住宿。观星团已取消，天黑后根据云量在住宿附近或安全的湖畔自行肉眼观星。',
    stops: [
      s('chcStay', '08:00–09:15', '早餐后退房，检查车辆、油量和随车物品。', '准备'),
      s('tekapo', '09:15–14:40', '驾车前往蒂卡波，抵达后午餐、补给并在湖边散步。', '自驾'),
      s('tekapoReception', '15:00–15:30', '在接待处办理入住，再前往住宿放置行李。', '入住'),
      s('church', '15:30–17:30', '游览好牧羊人教堂与湖畔。'),
      s('tekapoStay', '17:30–19:00', '返回住宿、晚餐和休息。', '住宿'),
      s('stars', '天黑后', '不参加观星团；根据云量在住宿附近或安全的湖畔自行肉眼观星，注意保暖。', '肉眼观星'),
    ],
  },
  {
    id: 4, date: '11.02', weekday: '周一', title: '雪山、冰川与远方', subtitle: '蒂卡波 → 库克山机场 → 瓦纳卡',
    km: 303, duration: '计划 4 小时 30 分', city: 'Wānaka', mode: 'drive',
    note: '直升机徒步已预订：11:15 开始，10:55 前到 Mount Cook Airport 集合。准备保暖分层衣物，并现场支付每人 NZD 20 燃油附加费。',
    stops: [
      s('tekapoStay', '07:30–08:30', '早餐、退房并装车。', '准备'),
      s('pukaki', '08:30–10:20', '前往库克山机场；普卡基湖仅短暂停留 15–20 分钟。', '自驾'),
      s('cook', '10:20–14:15', '停车、签到和换装；11:15 参加约 3 小时塔斯曼冰川直升机徒步。', '已预订'),
      s('cook', '14:15–14:50', '换装并吃自带简餐，预留天气和运营缓冲。', '午餐'),
      s('wanakaStay', '14:50–18:00', '驾车前往瓦纳卡，抵达后入住和晚餐。', '住宿'),
    ],
  },
  {
    id: 5, date: '11.03', weekday: '周二', title: '沿山路，去皇后镇', subtitle: '瓦纳卡 → Real Guns → 箭镇 → 皇后镇',
    km: 76, duration: '计划 2 小时', city: 'Queenstown', mode: 'drive',
    note: '射击体验已预订：12:00 开始，11:45 前签到。必须携带护照或新西兰驾照并穿包脚鞋；若项目延误，取消卡德罗纳额外停靠。',
    stops: [
      s('wanakaStay', '07:30–09:00', '早餐后整理行李。', '准备'),
      s('tree', '09:00–10:00', '瓦纳卡湖边散步，打卡孤独之树后退房。'),
      s('guns', '11:15–13:15', '11:45 前签到，12:00 开始 Real Guns NZ 射击体验。', '已预订'),
      s('arrow', '14:20–16:00', '前往箭镇午餐并漫步历史街区。'),
      s('queenStay', '16:00–16:40', '前往皇后镇，15:00 后可使用智能门锁自助入住。', '住宿'),
    ],
  },
  {
    id: 6, date: '11.04', weekday: '周三', title: '把心跳留在天空', subtitle: '跳伞 → Fergburger → 天空缆车',
    km: 5, duration: '镇内短途', city: 'Queenstown', mode: 'walk',
    note: '跳伞已预订 08:00 场次，07:45 前到 35 Shotover Street；体验约 3 小时。下午购买 Skyline 缆车 + 5 次 Luge 组合票，并再次确认 Luge 末班时间。',
    stops: [
      s('queenStay', '06:45–07:45', '早餐后前往 NZONE 集合点。', '准备'),
      s('skydive', '08:00–11:00', '参加 15,000 英尺高空跳伞；手机和相机不可带上飞机。', '已预订'),
      s('burger', '11:15–12:30', 'Fergburger 午餐，预留排队时间。', '美食'),
      s('queenStay', '12:30–14:30', '返回住宿洗澡、休息，并为天气延误留缓冲。', '休息'),
      s('lake', '14:30–15:30', '可选皇后镇花园、湖畔或咖啡馆；疲劳时直接休息。', '可选'),
      s('skyline', '15:30–21:10', '16:00 上山，17:00–19:00 玩 5 次 Luge；晚餐后看约 20:38 日落，再乘缆车下山。', '体验'),
    ],
  },
  {
    id: 7, date: '11.05', weekday: '周四', title: '从云端抵达峡湾', subtitle: '皇后镇 → 米尔福德峡湾 → Moonlight Escape',
    km: 25, duration: '飞行游船约 5 小时', city: 'Queenstown', mode: 'flight',
    note: '06:45 致电确认天气。须在 11 月 4 日 17:00 前把接送改为自驾集合，并确认 39 Lucas Place 的停车和签到方式。退旧住宿后带齐行李出发。',
    stops: [
      s('queenStay', '05:30–06:35', '早餐、退房并把行李装车。', '退房'),
      s('zqnCheckin', '06:45–08:00', '确认天气后自驾到集合点，办理签到和安全说明。', '集合'),
      s('milford', '08:00–13:00', '固定翼往返飞行与峡湾游船；准备午餐、水和防风防雨衣物。', '已预订'),
      s('zqnCheckin', '13:00–14:15', '返航后在 Frankton 用餐、休息。', '休息'),
      s('moonlight', '14:15–18:00', '前往 Moonlight Escape，15:00 后与房东见面入住；休息、泡热水浴缸。', '住宿'),
    ],
  },
  {
    id: 8, date: '11.06', weekday: '周五', title: '走进魔戒的风景', subtitle: 'Moonlight Escape → 格林诺奇 → 班诺克本',
    km: 152, duration: '计划 2 小时 45 分', city: 'Bannockburn', mode: 'drive',
    note: '当天不安排天空缆车。格林诺奇午餐后沿皇后镇方向返回，补油和补给，再前往班诺克本；住宿为钥匙盒自助入住。',
    stops: [
      s('moonlight', '07:45–08:45', '早餐后退房并装车。', '退房'),
      s('glen', '08:45–13:30', '前往格林诺奇，游览步道、红房子和湿地，并在镇上午餐。', '自驾'),
      s('queen', '13:30–15:00', '返回皇后镇方向，途中拍照；随后补油和补给。', '自驾'),
      s('bannockburn', '15:00–16:15', '驾车前往班诺克本，使用钥匙盒自助入住。', '住宿'),
    ],
  },
  {
    id: 9, date: '11.07', weekday: '周六', title: '去海边，等企鹅回家', subtitle: '班诺克本 → 奥马拉马 → 库罗 → 奥马鲁',
    km: 236, duration: '计划 4 小时 30 分', city: 'Oamaru', mode: 'drive',
    note: '企鹅夜观已预订 20:15 场次，20:00 前抵达；约 21:45 结束。场内严禁拍照和录像，夜间海边注意保暖。',
    stops: [
      s('bannockburn', '08:30–10:00', '早餐、退房后出发。', '退房'),
      s('omarama', '10:00–12:35', '途经奥马拉马，安排午餐和短暂休息。', '自驾'),
      s('kurow', '12:35–14:30', '经库罗继续前往奥马鲁。', '自驾'),
      s('oamaruStay', '15:00–15:30', '15:00 后使用钥匙盒自助入住。', '住宿'),
      s('oamaru', '15:30–19:15', '游览维多利亚历史街区，晚餐后回住宿休息。'),
      s('penguin', '19:40–21:45', '20:00 前签到，20:15 在高级看台观看小蓝企鹅归巢。', '已预订'),
    ],
  },
  {
    id: 10, date: '11.08', weekday: '周日', title: '最后一程，带风景回家', subtitle: '奥马鲁 → 基督城 → 上海',
    km: 258, duration: '计划 4 小时 30 分', city: '夜间航班', mode: 'drive',
    note: '22:30 从基督城起飞。若道路或行程延误，优先缩短或取消市区游览，确保完成加油、还车和值机。',
    stops: [
      s('oamaruStay', '08:00–09:00', '早餐后退房，沿 1 号公路返回基督城。', '退房'),
      s('gardens', '09:00–15:45', '13:00 左右抵达基督城；午餐后游览植物园和市区。', '自驾'),
      s('chc', '15:45–16:45', '提前吃晚餐，为还车和机场流程留足时间。', '晚餐'),
      s('airport', '16:45–19:30', '加油并到 Ezi 还车，随后前往航站楼值机安检。', '还车'),
      s('airport', '22:30', 'CZ618 飞往广州，次日转乘 CZ3533 回上海。', '航班'),
    ],
  },
];

export { source };
export const packing = [
  '打印 A4 提车单', '准备驾照翻译件', '准备符合租车要求的实体信用卡', '复核 7 笔住宿订单与入住指引',
  '查看蒂卡波云量，准备红光手电和观星保暖衣物', '核对 D4 冰川徒步集合时间与保暖装备', '携带护照并穿包脚鞋参加 D5 射击',
  '核对 D6 跳伞天气、体重要求和集合时间', '购买 Skyline 缆车 + 5 次 Luge 并复核末班时间',
  '11 月 4 日 17:00 前确认 D7 自驾集合方式', '准备 D9 企鹅夜观保暖衣物，场内严禁拍摄', '复核航班与还车时间',
];

export function mapsUrl(place: Place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.en + ', New Zealand')}`;
}
export function routeUrl(day: Day) {
  const requiredStops = day.stops.filter((stop) => stop.category !== '可选' && stop.place.id !== 'stars');
  const ps = requiredStops
    .filter((s, i, a) => i === 0 || s.place.id !== a[i - 1].place.id)
    .map((s) => s.place.en + ', New Zealand');
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ps[0])}&destination=${encodeURIComponent(ps[ps.length - 1])}&waypoints=${encodeURIComponent(ps.slice(1, -1).join('|'))}&travelmode=${day.mode === 'walk' ? 'walking' : 'driving'}`;
}
