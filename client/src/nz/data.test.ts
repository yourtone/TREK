import { describe, expect, it } from 'vitest';
import { days, mapsUrl, places, routeUrl, source } from './data';
import roads from './road-routes.json';
describe('NZ source-backed itinerary', () => {
  it('covers each source itinerary day exactly once', () => {
    expect(days.map((d) => `D${d.id}`)).toEqual(source.itinerary.map((d) => d.day));
    expect(new Set(days.map((d) => d.id)).size).toBe(8);
  });
  it('uses the latest detailed-itinerary distances, including D7 ground transfers', () => {
    expect(days.reduce((sum, d) => sum + d.km, 0)).toBe(1274);
    expect(days.find((d) => d.id === 7)).toMatchObject({ mode: 'flight', km: 25 });
    expect(days.find((d) => d.id === 8)).toMatchObject({ mode: 'drive', km: 152, city: 'Bannockburn' });
    expect(days.find((d) => d.id === 9)).toMatchObject({ km: 236, subtitle: '班诺克本 → 奥马拉马 → 库罗 → 奥马鲁' });
  });
  it('keeps every map coordinate in the South Island', () => {
    for (const day of days)
      for (const { place } of day.stops) {
        expect(place.position[0]).toBeGreaterThan(-47);
        expect(place.position[0]).toBeLessThan(-41);
        expect(place.position[1]).toBeGreaterThan(166);
        expect(place.position[1]).toBeLessThan(175);
      }
  });
  it('creates encoded navigation links with all intermediate stops', () => {
    const url = new URL(routeUrl(days[1]));
    expect(url.searchParams.get('origin')).toContain('Lake Tekapo');
    expect(url.searchParams.get('destination')).toContain('67 Matai Road');
    expect(url.searchParams.get('waypoints')).toContain('Mount Cook');
    expect(new URL(mapsUrl(places.church)).searchParams.get('query')).toContain('Church of the Good Shepherd');
    expect(new URL(routeUrl(days[0])).searchParams.get('destination')).toContain('5 Mistake Drive');
    expect(days[0].stops.find((stop) => stop.place.id === 'stars')).toMatchObject({ category: '肉眼观星' });
  });
  it('retains 8 accommodation nights across 7 bookings with verified addresses', () => {
    expect(source.stays.filter((s) => s.city !== '飞机')).toHaveLength(7);
    expect(source.stays.find((s) => s.day === 'D5-D6')?.checkIn).toContain('连住2晚');
    expect(source.stays.find((s) => s.day === 'D5-D6')?.name).toContain('Central Studio');
    for (const stay of source.stays) {
      expect(stay).not.toHaveProperty('contact');
      expect(stay).not.toHaveProperty('confirmation');
    }
    for (const stay of source.stays.filter((s) => s.city !== '飞机')) {
      expect(stay).toHaveProperty('address');
      expect(stay).toHaveProperty('mapQuery');
    }
    expect(source.stays.find((s) => s.day === 'D5-D6')?.address).toContain('2 Anderson Heights Unit 2');
    expect(source.stays.find((s) => s.day === 'D9')?.mapQuery).toBe('-45.1143563,170.95948');
    expect(places.stars.approximate).toBe(true);
    for (const k of ['cook', 'guns', 'skydive'] as const) expect(places[k].approximate).toBe(false);
  });
  it('lists all confirmed experiences without private booking fields', () => {
    expect(source.experiences).toHaveLength(5);
    expect(source.experiences.map((item) => item.day)).toEqual(['D4', 'D5', 'D6', 'D7', 'D9']);
    for (const experience of source.experiences) {
      expect(experience.status).toBe('已预订');
      expect(experience).not.toHaveProperty('confirmation');
      expect(experience).not.toHaveProperty('contact');
    }
  });
  it('caches road geometry and the mixed D7 flight line', () => {
    expect(Object.keys(roads)).toEqual(['3', '4', '5', '7', '8', '9', '10']);
    for (const road of Object.values(roads)) {
      expect(road.positions.length).toBeGreaterThan(10);
      for (const [lat, lng] of road.positions) {
        expect(lat).toBeGreaterThan(-47);
        expect(lat).toBeLessThan(-41);
        expect(lng).toBeGreaterThan(166);
        expect(lng).toBeLessThan(175);
      }
    }
    expect(roads['7'].flightPositions).toHaveLength(3);
  });
});
