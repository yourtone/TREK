import { BedDouble, Check, ExternalLink, FileText, Plane, TicketCheck, Wallet } from 'lucide-react';
import { packing, source } from './data';
import type { Saved } from './usePlanner';
export default function Details({ tab, saved, save }: { tab: string; saved: Saved; save: (x: Saved) => void }) {
  if (tab === '住宿')
    return (
      <div className="nz-detail-content">
        <div className="nz-section-heading">
          <BedDouble />
          <div>
            <h2>每一晚，都有归处</h2>
            <p>8 晚 · 7 笔住宿订单 · 已按最新住宿详情整理</p>
          </div>
        </div>
        {source.stays
          .filter((s) => s.city !== '飞机')
          .map((s) => (
            <article className="nz-detail-card" key={s.day}>
              <div className="nz-card-top">
                <span className="nz-pill">
                  {s.day} · {s.date}
                </span>
                <span className="nz-booked">已预订 · {s.provider}</span>
              </div>
              <h3 className="nz-preline">{s.city} · {s.name}</h3>
              <dl className="nz-stay-details">
                <div><dt>入住 / 退房</dt><dd className="nz-preline">{s.checkIn}</dd></div>
                {'address' in s && <div><dt>住宿地址</dt><dd className="nz-preline">{s.address}</dd></div>}
                <div><dt>参考金额</dt><dd>{typeof s.amount === 'number' ? `CNY ${s.amount.toLocaleString('zh-CN')}` : s.amount}</dd></div>
                <div><dt>取消条件</dt><dd>{s.cancellation}</dd></div>
                <div><dt>餐食 / 停车 / 厨房</dt><dd className="nz-preline">{s.amenities}</dd></div>
                <div><dt>付款信息</dt><dd>{s.payment}</dd></div>
              </dl>
              <p className="nz-preline nz-stay-note">{s.notes}</p>
              <a
                className="nz-text-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('mapQuery' in s ? s.mapQuery : s.name.split('\n')[0] + ', ' + s.city + ', New Zealand')}`}
                target="_blank"
                rel="noreferrer"
              >
                导航至住宿 <ExternalLink size={13} />
              </a>
            </article>
          ))}
        <p className="nz-footnote">住宿地址来自最新住宿详情；网页不显示联系电话、订单确认码、PIN 或门锁密码。</p>
      </div>
    );
  if (tab === '体验')
    return (
      <div className="nz-detail-content">
        <div className="nz-section-heading">
          <TicketCheck />
          <div>
            <h2>已经确定的高光时刻</h2>
            <p>5 个已预订项目 · 已按确认单更新集合时间</p>
          </div>
        </div>
        {source.experiences.map((experience) => (
          <article className="nz-detail-card" key={experience.day}>
            <div className="nz-card-top">
              <span className="nz-pill">{experience.day} · {experience.date}</span>
              <span className="nz-booked">{experience.status}</span>
            </div>
            <h3>{experience.name}</h3>
            <dl className="nz-stay-details">
              <div><dt>活动时间</dt><dd>{experience.time}</dd></div>
              <div><dt>签到要求</dt><dd>{experience.checkIn}</dd></div>
              <div><dt>集合地点</dt><dd>{experience.meeting}</dd></div>
            </dl>
            <p className="nz-stay-note">{experience.notes}</p>
            <a
              className="nz-text-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(experience.meeting + ', New Zealand')}`}
              target="_blank"
              rel="noreferrer"
            >
              查看集合地点 <ExternalLink size={13} />
            </a>
          </article>
        ))}
        <p className="nz-footnote">页面只保留出行所需的公开集合信息，不显示订单号、凭证码或个人联系方式。</p>
      </div>
    );
  if (tab === '航班')
    return (
      <div className="nz-detail-content">
        <div className="nz-section-heading">
          <Plane />
          <div>
            <h2>从出发，到回家</h2>
            <p>10.30 — 11.09 · 时间按各机场当地时间</p>
          </div>
        </div>
        {[
          ['去程 · D1', '10 月 30 日', '上海浦东 T2', '广州白云 T2', '20:25', '23:10', 'CZ8212'],
          ['去程 · D2', '10 月 31 日', '广州白云 T2', '基督城', '00:50', '17:20', 'CZ617'],
          ['回程 · D10', '11 月 8—9 日', '基督城', '广州白云 T2', '22:30', '次日 05:20', 'CZ618'],
          ['回程 · D11', '11 月 9 日', '广州白云 T2', '上海虹桥 T2', '07:00', '09:15', 'CZ3533'],
        ].map((f) => (
          <article className="nz-detail-card" key={f[6]}>
            <div className="nz-card-top">
              <span className="nz-pill">
                {f[0]} · {f[1]}
              </span>
              <span>{f[6]}</span>
            </div>
            <div className="nz-flight">
              <div>
                <strong>{f[4]}</strong>
                <span>{f[2]}</span>
              </div>
              <Plane size={20} />
              <div>
                <strong>{f[5]}</strong>
                <span>{f[3]}</span>
              </div>
            </div>
          </article>
        ))}
        <div className="nz-tip">D2 抵达后在基督城住一晚；D3 早上开启南岛自驾。回程抵达上海虹桥，出发机场为浦东。</div>
        <p className="nz-footnote">航班信息取自《202611新西兰信息汇总》，尚未与航空公司订单实时核验。</p>
      </div>
    );
  if (tab === '清单')
    return (
      <div className="nz-detail-content">
        <div className="nz-section-heading">
          <Check />
          <div>
            <h2>把准备留在出发前</h2>
            <p>
              已完成 {saved.checked.length} / {packing.length} · 自动保存在此浏览器
            </p>
          </div>
        </div>
        <div className="nz-progress">
          <span style={{ width: `${(saved.checked.length / packing.length) * 100}%` }} />
        </div>
        {packing.map((item) => (
          <label className={`nz-check ${saved.checked.includes(item) ? 'done' : ''}`} key={item}>
            <input
              type="checkbox"
              checked={saved.checked.includes(item)}
              onChange={() =>
                save({
                  ...saved,
                  checked: saved.checked.includes(item)
                    ? saved.checked.filter((x) => x !== item)
                    : [...saved.checked, item],
                })
              }
            />
            <span>{item}</span>
          </label>
        ))}
        <div className="nz-detail-card">
          <h3>
            <Wallet size={18} /> 已记录费用
          </h3>
          <dl className="nz-costs">
            <div>
              <dt>机票 · 2 人</dt>
              <dd>13,290</dd>
            </div>
            <div>
              <dt>签证</dt>
              <dd>3,925</dd>
            </div>
            <div>
              <dt>租车 · 8 天全险</dt>
              <dd>4,135</dd>
            </div>
            <div>
              <dt>小计</dt>
              <dd>21,350</dd>
            </div>
          </dl>
          <p className="nz-footnote">沿用原资料金额；币种未标明。住宿、门票、餐饮等尚未计入，非完整预算。</p>
        </div>
      </div>
    );
  return (
    <div className="nz-detail-content">
      <div className="nz-section-heading">
        <FileText />
        <div>
          <h2>旅程的资料夹</h2>
          <p>所有行程来自 NZ 目录中的原始资料</p>
        </div>
      </div>
      {source.sources.map((s, i) => (
        <div className="nz-source" key={s}>
          <span>0{i + 1}</span>
          {s}
        </div>
      ))}
      <div className="nz-detail-card">
        <h3>整理说明</h3>
        <p>
          每日时间、里程优先采用最新自驾详细行程表；预订项目和住宿分别按确认单与住宿行程单整理。主要自驾路段沿 OSRM
          / OpenStreetMap 道路参考线展示；D7 同时展示地面转场与固定翼飞行方向，不提供实时路况。
        </p>
        <p>冰川徒步、射击、跳伞、米尔福德飞行游船和企鹅夜观均已按确认单更新。蒂卡波观星团已取消，D3 晚间改为根据天气自行肉眼观星。</p>
        <a
          className="nz-text-link"
          href="https://www.newzealand.com/us/feature/south-island-alpine-lakes-itinerary/"
          target="_blank"
          rel="noreferrer"
        >
          新西兰旅游局 · 南岛湖区参考 <ExternalLink size={13} />
        </a>
      </div>
      <p className="nz-footnote">个人备注和清单仅保存在当前浏览器，可导出 JSON 留存。地图底图需联网。</p>
    </div>
  );
}
