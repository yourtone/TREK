"""Cache public OSRM road geometry. Does not send notes or private booking data."""
import json, subprocess, datetime
from pathlib import Path
routes = {
3:[(172.5602263,-43.5641938),(170.4740832,-44.0111201),(170.4829,-44.0033),(170.4740832,-44.0111201)],
4:[(170.4740832,-44.0111201),(170.1325,-44.1059),(170.1334316,-43.7666928),(169.1171381,-44.7061251)],
5:[(169.1171381,-44.7061251),(169.1177,-44.6982),(169.0823956,-44.7901333),(168.8356,-44.9387),(168.6635981,-45.0283972)],
7:[(168.6635981,-45.0283972),(168.7378199,-45.0251447),(168.6660045,-44.9852773)],
8:[(168.6660045,-44.9852773),(168.3835,-44.8503),(168.6660045,-44.9852773),(169.153029,-45.0885404)],
9:[(169.153029,-45.0885404),(169.9655968,-44.487876),(170.4694561,-44.7338879),(170.95948,-45.1143563),(170.9685,-45.1025),(170.9801779,-45.110276)],
10:[(170.95948,-45.1143563),(172.6205644,-43.5302611),(172.6365,-43.5309),(172.5322,-43.4894)]}
output = Path(__file__).resolve().parents[2] / 'client/src/nz/road-routes.json'
result = {}
for day, points in routes.items():
    url = 'https://router.project-osrm.org/route/v1/driving/' + ';'.join(f'{x},{y}' for x,y in points) + '?overview=simplified&geometries=geojson'
    raw = subprocess.check_output(['curl','-fsS','--connect-timeout','10','--max-time','35',url])
    data = json.loads(raw)
    if data['code'] != 'Ok': raise RuntimeError(f'Route D{day}: {data["code"]}')
    route = data['routes'][0]
    result[str(day)] = {'positions':[[round(y,5),round(x,5)] for x,y in route['geometry']['coordinates']], 'distanceKm':round(route['distance']/1000), 'provider':'OSRM / OpenStreetMap', 'retrievedAt':datetime.date.today().isoformat()}
    if day == 7:
        result[str(day)]['flightPositions'] = [[-45.02514,168.73782],[-44.6717,167.9256],[-45.02514,168.73782]]
    print(f'D{day}: {len(result[str(day)]["positions"])} road points',flush=True)
output.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
