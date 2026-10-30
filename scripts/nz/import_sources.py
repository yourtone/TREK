"""Import current NZ workbook headers using a public-field allowlist."""
import json
import re
from pathlib import Path
import openpyxl

root = Path(__file__).resolve().parents[3]
out = Path(__file__).resolve().parents[2] / 'client/src/nz/source-data.json'
previous = json.loads(out.read_text())

def rows(name):
    values = list(openpyxl.load_workbook(root / name, data_only=True, read_only=True).active.values)
    return [dict(zip(values[0], row)) for row in values[1:] if row[0]]

def public_schedule(text):
    return re.sub(r'(?:\+64|0800)\s?(?:\d[\s-]?){6,}', '运营商（联系方式见私人凭证）', text or '')

def stay(r):
    address = (r['住宿地址 / 坐标'] or '').split('；坐标')[0]
    notes = r['入住指引及注意事项'] or ''
    notes = re.sub(r'钥匙盒密码\s*\S+?[，；。]', '进入凭据请查看私人住宿资料；', notes)
    notes = notes.replace('门锁密码待收', '进入指引待收').replace('密码', '进入信息')
    amount = r['已付(CNY)']
    return dict(day=r['Day'], date=r['住宿日期'], city=r['入住城市'], name=r['Airbnb房源名称'],
                provider='Airbnb' if isinstance(amount, (int, float)) else '—', amount=amount,
                cancellation=r['取消条件（按订单）'] or '',
                checkIn=(r['入住 / 退房'] or '') + ('（连住2晚）' if r['Day']=='D5-D6' else ''),
                amenities=r['早餐 / 停车 / 厨房'] or '', address=address,
                mapQuery='-45.1143563,170.95948' if r['Day']=='D9' else address,
                notes=notes+'\n'+(r['网络 / 洗衣 / 温控'] or ''),
                payment=f'已付CNY {amount:,.2f}。' if isinstance(amount,(int,float)) else '—')

def experience(r):
    old = next(x for x in previous['experiences'] if x['day']==r['Day'])
    # Preserve curated, non-private display notes; raw voucher/contact columns are excluded.
    result = {k:old[k] for k in ['day','date','name','status','time','checkIn','meeting','notes']}
    if r['Day']=='D4': result['checkIn']='计划10:20抵达；10:55前集合'
    result.update(amount=r['订单总价'],currency=r['货币'])
    return result

data = dict(
    itinerary=[dict(day=r['Day'],date=r['日期'],route=r['路线与自驾里程'],
                    summary=r['当天行程安排与游玩项目'],schedule=public_schedule(r['具体时间规划与行程安排']))
               for r in rows('202611新西兰南岛-自驾详细行程.xlsx')],
    stays=[stay(r) for r in rows('202611新西兰南岛-住宿详情.xlsx')],
    sources=['202611新西兰南岛-自驾详细行程.xlsx','202611新西兰南岛-住宿详情.xlsx',
             '202611新西兰南岛-体验项目详情.xlsx','项目确认单/全部已预订项目确认文件','住宿行程单/全部已定住宿文件'],
    experiences=[experience(r) for r in rows('202611新西兰南岛-体验项目详情.xlsx')])
published=json.dumps(data,ensure_ascii=False,indent=2)
assert not re.search(r'(?:GYG|XQK|CQH|KLK)[A-Z0-9-]{5,}|\bHM[A-Z0-9]{6,}|PIN|7777',published)
out.write_text(published+'\n')
print(out)
