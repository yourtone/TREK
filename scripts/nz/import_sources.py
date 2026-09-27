"""Read the supplied NZ workbooks without modifying them; rebuild source-data.json."""
import json
from pathlib import Path
import openpyxl
root = Path(__file__).resolve().parents[3]
out = Path(__file__).resolve().parents[2] / 'client/src/nz/source-data.json'
def rows(name):
    return list(openpyxl.load_workbook(root / name, data_only=True).active.values)[1:]
def public_text(value):
    text = value or ''
    return (text
        .replace('按房东指引停在Manchester Place街上，不要把车开进房屋车道；', '请按房东停车指引操作，勿驶入房屋车道；')
        .replace('D8皇后镇缆车后需前往Bannockburn', 'D8格林诺奇返回皇后镇后需前往Bannockburn')
        .replace('导航使用9A Traill Street，详见地址列；', '导航需使用房东确认的实际门牌，详见原始订单；'))
def stay(r):
    # Keep publishable booking details; never bundle addresses, phone numbers,
    # confirmation codes, PINs, or door-access details into the web client.
    return dict(
        day=r[0], date=r[1], city=r[2], name=r[3] or '', provider=r[4] or '',
        amount=r[5], cancellation=r[6] or '', checkIn=r[7] or '',
        amenities=public_text(r[8]), notes=public_text(r[9]), payment=r[13] or ''
    )
data = {
    'itinerary': [dict(day=r[0], date=r[1], route=r[2], summary=r[3], schedule=r[4]) for r in rows('202611新西兰南岛-自驾详细行程.xlsx') if r[0]],
    'stays': [stay(r) for r in rows('202611新西兰南岛-住宿详情.xlsx') if r[0]],
    'sources': ['202611新西兰南岛-自驾详细行程.xlsx', '202611新西兰南岛-住宿详情.xlsx', '202611新西兰南岛-行程篇.docx', '202611新西兰信息汇总.docx', '路程.csv']
}
out.write_text(json.dumps(data, ensure_ascii=False, indent=2))
print(out)
