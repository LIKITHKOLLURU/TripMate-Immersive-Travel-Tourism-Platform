export type PlaceKind = '360' | '3d' | 'streetview';

export interface PreviewPlace {
  id: string;
  name: string;
  type: PlaceKind;
  file: string;
  desc: string;
}

export const PLACES: Record<string, PreviewPlace> = {
  'hundru-falls': {
    id: 'hundru-falls',
    name: 'Hundru Falls',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701121728!6m8!1m7!1sCAoSHENJQUJJaERLcXIyYWpwOVh3QVB4SGRzNFhtQ1M.!2m2!1d23.44972456183475!2d85.66668677324596!3f318.91556571178955!4f11.257275289449169!5f0.7820865974627469',
    desc: 'Spectacular waterfall near Ranchi on the Subarnarekha River'
  },
  'charminar': {
    id: 'charminar',
    name: 'Charminar',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701346698!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDJtYmVkeHdF!2m2!1d17.35404246746228!2d78.47705919264827!3f244.98680786291425!4f26.682037925576537!5f0.7820865974627469',
    desc: 'Iconic 16th-century mosque with four grand arches'
  },
  'gateway-of-india': {
    id: 'gateway-of-india',
    name: 'Gateway of India',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701385894!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDQ0Tm1JZXc.!2m2!1d18.92221286802085!2d72.83437240969954!3f141.12120843024746!4f20.528363424688266!5f0.7820865974627469',
    desc: 'Triumphal arch monument overlooking the Arabian Sea'
  },
  'marine-drive': {
    id: 'marine-drive',
    name: 'Marine Drive',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701468347!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0xpc09kRkE.!2m2!1d18.94321107911568!2d72.82299833602174!3f306.91537698763307!4f-5.662073039196812!5f0.4000000000000002',
    desc: 'Street View along Marine Drive, Mumbai'
  },
  'india-gate': {
    id: 'india-gate',
    name: 'India Gate',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701087338!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3hoNlNERkE.!2m2!1d28.61296450226106!2d77.22914821955358!3f8.190448968108907!4f35.27915293720028!5f0.7820865974627469',
    desc: 'War memorial and popular promenade in New Delhi'
  },
  'hotel-room': {
    id: 'hotel-room',
    name: 'Luxury Hotel Room',
    type: '3d',
    file: 'https://cdn.aframe.io/basic-guide/hello-world/hello-world.glb',
    desc: 'Experience a luxurious hotel room in 3D'
  },
  'vizag-street': {
    id: 'vizag-street',
    name: 'Vizag Beach Road (Street View)',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757697054976!6m8!1m7!1sqbSJTrvdZkXs9wyUHBqu5w!2m2!1d17.71061180116925!2d83.3181762452422!3f142.43045438110084!4f-8.195008253885618!5f1.0300499365336577',
    desc: 'Interactive Google Street View embed of Vizag area'
  },
  // France - Paris
  'eiffel-tower': {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698414316!6m8!1m7!1sc8NIyvmYw086J0oxyEmm8w!2m2!1d48.85885748614059!2d2.293438224684207!3f126.54523008287688!4f0!5f0.7820865974627469',
    desc: 'Street View near Eiffel Tower'
  },
  'louvre': {
    id: 'louvre',
    name: 'Louvre Museum',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698555154!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2VsUFM3UFE.!2m2!1d48.86061111854634!2d2.337644001224909!3f142.08692543263908!4f5.826224595901451!5f0.7820865974627469',
    desc: 'Street View at Louvre Museum'
  },
  'notre-dame': {
    id: 'notre-dame',
    name: 'Notre-Dame Cathedral',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698676419!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2tpWmZQa1FF!2m2!1d48.85296822445235!2d2.349902096839076!3f288.141998861685!4f3.0667365319949624!5f0.7820865974627469',
    desc: 'Street View at Notre-Dame Cathedral'
  },
  // France - Nice
  'promenade-des-anglais': {
    id: 'promenade-des-anglais',
    name: 'Promenade des Anglais',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698835045!6m8!1m7!1srG1KWEqtX2yzSYNpXcl-Jg!2m2!1d43.69490160589921!2d7.267950568032354!3f352.81737891752584!4f-3.5180116654379816!5f0.7820865974627469',
    desc: 'Street View on Promenade des Anglais'
  },
  'old-town-nice': {
    id: 'old-town-nice',
    name: 'Old Town',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698901368!6m8!1m7!1sgnDDs8LAzMMmo2Xi_9lK0g!2m2!1d43.69718638600989!2d7.277586271182974!3f100.85371036434707!4f-0.07461479907995283!5f0.7820865974627469',
    desc: 'Street View in Old Town Nice'
  },
  // Japan - Tokyo
  'shibuya': {
    id: 'shibuya',
    name: 'Shibuya Crossing',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757698972762!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ3h1YWF3Z1FF!2m2!1d35.65948200739641!2d139.70055958634!3f199.07909565180742!4f17.081352852288347!5f0.7820865974627469',
    desc: 'Street View at Shibuya Crossing'
  },
  'sensoji': {
    id: 'sensoji',
    name: 'Senso-ji Temple',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699081588!6m8!1m7!1sCEwJOyE9OcFtiLUYw25Nvw!2m2!1d35.71474476864149!2d139.7964156132171!3f83.02083207272503!4f6.106015360789684!5f0.7820865974627469',
    desc: 'Street View at Senso-ji Temple'
  },
  'tokyo-skytree': {
    id: 'tokyo-skytree',
    name: 'Tokyo Skytree',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699248432!6m8!1m7!1sNvJHQx1-QdS_nOoNbh49CQ!2m2!1d35.71094293583027!2d139.8102677397586!3f178.014732024824!4f42.21056075865798!5f0.7820865974627469',
    desc: 'Street View at Tokyo Skytree'
  },
  // Japan - Kyoto
  'fushimi-inari': {
    id: 'fushimi-inari',
    name: 'Fushimi Inari Shrine',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699322119!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDQxYnFpUGc.!2m2!1d34.96683802799923!2d135.772125035082!3f186.98602270375312!4f0.008963375235168769!5f0.7820865974627469',
    desc: 'Street View at Fushimi Inari Shrine'
  },
  'kinkaku-ji': {
    id: 'kinkaku-ji',
    name: 'Kinkaku-ji (Golden Pavilion)',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699373704!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREd1LV9uRlE.!2m2!1d35.03937000450229!2d135.7292431065783!3f29.89103649274265!4f-9.217373633102284!5f0.7820865974627469',
    desc: 'Street View at Kinkaku-ji (Golden Pavilion)'
  },
  // USA - New York
  'statue-of-liberty': {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699422006!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRqNVBPaXdF!2m2!1d40.68924943532081!2d-74.04450042238021!3f309.1295816849258!4f3.427595804701909!5f0.7820865974627469',
    desc: 'Street View at Statue of Liberty'
  },
  'central-park': {
    id: 'central-park',
    name: 'Central Park',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699585541!6m8!1m7!1sfHhgv6SOEU6Re-5mXnTnuw!2m2!1d40.78458544637856!2d-73.96969074884989!3f274.9137844865092!4f13.051062157794746!5f0.7820865974627469',
    desc: 'Street View in Central Park'
  },
  'times-square': {
    id: 'times-square',
    name: 'Times Square',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699629654!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREVzYVR0Z1FF!2m2!1d40.75929308131595!2d-73.98511479407647!3f216.43314832725932!4f11.554054836057702!5f0.7820865974627469',
    desc: 'Street View at Times Square'
  },
  // USA - San Francisco
  'golden-gate-bridge': {
    id: 'golden-gate-bridge',
    name: 'Golden Gate Bridge',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699721525!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHFpY3lZcUFF!2m2!1d37.80778757551914!2d-122.4752007087292!3f223.77573629417054!4f-0.5663301159767968!5f0.7820865974627469',
    desc: 'Street View at Golden Gate Bridge'
  },
  'alcatraz': {
    id: 'alcatraz',
    name: 'Alcatraz Island',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699783428!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ3htZm5uLUFF!2m2!1d37.82666359599909!2d-122.4230121961602!3f227.4209016795101!4f9.185359583409507!5f0.7820865974627469',
    desc: 'Street View at Alcatraz Island'
  },
  // UK - London
  'tower-bridge': {
    id: 'tower-bridge',
    name: 'Tower Bridge',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699863132!6m8!1m7!1sbIXeRa82HflW7XanJS2DGQ!2m2!1d51.50423696996278!2d-0.0762524151713722!3f18.564638411656215!4f11.091522744522365!5f0.7820865974627469',
    desc: 'Street View near Tower Bridge, London'
  },
  'buckingham': {
    id: 'buckingham',
    name: 'Buckingham Palace',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699925693!6m8!1m7!1sPyT3wxaWUA_pUjQ4J73w5w!2m2!1d51.50168088473334!2d-0.1411772209419391!3f74.92728892679723!4f7.231408243821562!5f0.7820865974627469',
    desc: 'Street View near Buckingham Palace'
  },
  'big-ben': {
    id: 'big-ben',
    name: 'Big Ben',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757699964306!6m8!1m7!1sa9YmJcZFqkGNZtBb9OhaUg!2m2!1d51.50101336465158!2d-0.1245061548423654!3f149.76855286760843!4f10.547487485837493!5f0.7820865974627469',
    desc: 'Street View near Big Ben, London'
  },
  // UK - Edinburgh
  'edinburgh-castle': {
    id: 'edinburgh-castle',
    name: 'Edinburgh Castle',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700023245!6m8!1m7!1sRe4IZ-2IZ0VdXH9z7e4-iA!2m2!1d55.9486531523425!2d-3.199919807083846!3f276.26207678304274!4f-11.691541713415816!5f0.7820865974627469',
    desc: 'Street View near Edinburgh Castle'
  },
  'royal-mile': {
    id: 'royal-mile',
    name: 'Royal Mile',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700079742!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGV4dlBkaEFF!2m2!1d55.95010929353242!2d-3.188020959257087!3f314.3467567711762!4f32.62628229118572!5f0.7820865974627469',
    desc: 'Street View on the Royal Mile, Edinburgh'
  },
  // UAE - Dubai
  'burj-khalifa': {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700134955!6m8!1m7!1s7k9-w26dHNwQhzvJ0JZWhw!2m2!1d25.19639786850101!2d55.27464591546173!3f119.88743!4f20.112570000000005!5f0.7820865974627469',
    desc: 'Street View near Burj Khalifa'
  },
  'palm-jumeirah': {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700190108!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHN3cm1RRGc.!2m2!1d25.11243173374593!2d55.13897799756051!3f9.742939164172117!4f7.942454827833117!5f0.7820865974627469',
    desc: 'Street View on Palm Jumeirah'
  },
  'dubai-mall': {
    id: 'dubai-mall',
    name: 'Dubai Mall',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700232371!6m8!1m7!1s9JnMVj1XpsM6Yf1YJhtWvw!2m2!1d25.19672560870035!2d55.28083895127335!3f230.8142776400027!4f3.0437966472859017!5f0.7820865974627469',
    desc: 'Street View near Dubai Mall'
  },
  // UAE - Abu Dhabi
  'sheikh-zayed-mosque': {
    id: 'sheikh-zayed-mosque',
    name: 'Sheikh Zayed Grand Mosque',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700293545!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREIxc3l1R1E.!2m2!1d24.4128334057905!2d54.47497537666586!3f9.647612514643868!4f6.493492066852426!5f0.7820865974627469',
    desc: 'Street View at Sheikh Zayed Grand Mosque'
  },
  'louvre-abu-dhabi': {
    id: 'louvre-abu-dhabi',
    name: 'Louvre Abu Dhabi',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700368650!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHNocWl4VGc.!2m2!1d24.5348037242012!2d54.40007672702192!3f232.46813633091924!4f-16.687266845543647!5f0.7820865974627469',
    desc: 'Street View at Louvre Abu Dhabi'
  },
  // Spain - Barcelona
  'sagrada-familia': {
    id: 'sagrada-familia',
    name: 'Sagrada Familia',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700611136!6m8!1m7!1sox9BzoJxx9BU34Uz8QE2xA!2m2!1d41.40389386219678!2d2.173703061323884!3f129.8049141441761!4f19.530661010225487!5f0.7820865974627469',
    desc: 'Street View near Sagrada Familia'
  },
  'park-guell': {
    id: 'park-guell',
    name: 'Park Güell',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700654662!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0U3OHJSRUE.!2m2!1d41.41449481389226!2d2.152694510596638!3f356.6862547047227!4f-2.145813786265421!5f0.7820865974627469',
    desc: 'Street View in Park Güell'
  },
  'la-rambla': {
    id: 'la-rambla',
    name: 'La Rambla',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700703538!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2U4NXFSWHc.!2m2!1d41.38560866928033!2d2.169816569421465!3f31.136113718268298!4f30.32963566061875!5f0.7820865974627469',
    desc: 'Street View on La Rambla'
  },
  // Spain - Madrid
  'royal-palace-madrid': {
    id: 'royal-palace-madrid',
    name: 'Royal Palace of Madrid',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700744569!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQy1nZk9wbmdF!2m2!1d40.41795503065277!2d-3.714312035317524!3f174.2386835330955!4f12.159207548535235!5f0.7820865974627469',
    desc: 'Street View near Royal Palace of Madrid'
  },
  'retiro-park': {
    id: 'retiro-park',
    name: 'El Retiro Park',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700776396!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2tqS1dkMFFF!2m2!1d40.41469331812556!2d-3.682708771727777!3f12.774081516174704!4f-1.8041737012170245!5f0.7820865974627469',
    desc: 'Street View in El Retiro Park'
  },
  // India - Sikkim
  'mg-marg': {
    id: 'mg-marg',
    name: 'MG Marg',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700941435!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRfZU9Ec2dF!2m2!1d27.32522766458906!2d88.61252589806882!3f26.953117384639754!4f8.013282793339272!5f0.7820865974627469',
    desc: 'Street View at MG Marg, Gangtok'
  },
  'rumtek-monastery': {
    id: 'rumtek-monastery',
    name: 'Rumtek Monastery',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701014196!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHNqcnJmWUE.!2m2!1d27.3059104605377!2d88.53628917812625!3f108.6008609418125!4f19.266428978562814!5f0.7820865974627469',
    desc: 'Street View at Rumtek Monastery'
  },
  'tsomgo-lake': {
    id: 'tsomgo-lake',
    name: 'Tsomgo (Changu) Lake',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701071558!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0Uwcktla1FF!2m2!1d27.37455760126746!2d88.76322832075564!3f348.79885627402183!4f18.246646737754986!5f0.7820865974627469',
    desc: 'Street View at Tsomgo Lake'
  },
  // India - Jharkhand
  'patratu-valley': {
    id: 'patratu-valley',
    name: 'Patratu Valley',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701178236!6m8!1m7!1sCAoSHENJQUJJaEJqUGM0U1RlZE5fY19GUHJMcnhYRGg.!2m2!1d23.57485287118338!2d85.27403147350091!3f135.4444415051753!4f16.475741186250275!5f0.7820865974627469',
    desc: 'Street View at Patratu Valley'
  },
  // India - Hyderabad
  'golconda-fort': {
    id: 'golconda-fort',
    name: 'Golconda Fort',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701432710!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHFfWlhIclFF!2m2!1d17.38497103741592!2d78.40343511690885!3f321.24057838190396!4f-1.6461972743975508!5f0.4000000000000002',
    desc: 'Street View at Golconda Fort'
  },
  // India - Vizag
  'kailasagiri': {
    id: 'kailasagiri',
    name: 'Kailasagiri',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757700933920!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDRvT3ZFZUE.!2m2!1d17.74894207829664!2d83.3421513673036!3f55.12509499999993!4f0!5f0.7820865974627469',
    desc: 'Street View at Kailasagiri'
  },
  // India - Bangalore
  'bangalore-palace': {
    id: 'bangalore-palace',
    name: 'Bangalore Palace',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701009193!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzRvN3JDYWc.!2m2!1d13.00405570904921!2d77.59015850614391!3f45.135029999999915!4f0!5f0.7820865974627469',
    desc: 'Street View at Bangalore Palace'
  },
  'lalbagh': {
    id: 'lalbagh',
    name: 'Lalbagh Botanical Garden',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701071354!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGUtdmZsZVE.!2m2!1d12.94979088992125!2d77.58664232630626!3f291.46127!4f0!5f0.7820865974627469',
    desc: 'Street View at Lalbagh Botanical Garden'
  },
  // India - Odisha (Puri)
  'jagannath-temple-ranchi': {
    id: 'jagannath-temple-ranchi',
    name: 'Jagannath Temple, Ranchi',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701233531!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDFfcERtWVE.!2m2!1d19.80493790465897!2d85.81793863470557!3f94.29920523080438!4f5.497322335009358!5f0.7820865974627469',
    desc: 'Street View at Jagannath Temple, Puri'
  },
  // India - Delhi
  'qutub-minar': {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701126855!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHkydHFqandF!2m2!1d28.52449458435398!2d77.18551770923123!3f332.59836!4f0!5f0.7820865974627469',
    desc: 'Street View at Qutub Minar'
  },
  // India - Kolkata
  'victoria-memorial': {
    id: 'victoria-memorial',
    name: 'Victoria Memorial',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701506913!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0VyNnpZbGdF!2m2!1d22.54480821678563!2d88.34255780350053!3f190.90203999999994!4f0!5f0.7820865974627469',
    desc: 'Street View at Victoria Memorial'
  },
  'howrah-bridge': {
    id: 'howrah-bridge',
    name: 'Howrah Bridge',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701643337!6m8!1m7!1sh_RynX-shP-AXwcBpRLbMw!2m2!1d22.5851689435637!2d88.34679177337917!3f242.71886!4f0!5f0.7820865974627469',
    desc: 'Street View at Howrah Bridge'
  },
  // India - Chennai
  'marina-beach': {
    id: 'marina-beach',
    name: 'Marina Beach',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701607698!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREV1OWZfdWdF!2m2!1d13.04995260460426!2d80.28240257341209!3f100.07973!4f0!5f0.7820865974627469',
    desc: 'Street View at Marina Beach'
  },
  'kapaleeshwarar-temple': {
    id: 'kapaleeshwarar-temple',
    name: 'Kapaleeshwarar Temple',
    type: 'streetview',
    file: 'https://www.google.com/maps/embed?pb=!4v1757701257647!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDQzWU9RSWc.!2m2!1d13.03398051344354!2d80.26987771662046!3f143.83874767047337!4f2.664609113998111!5f1.0091306358760836',
    desc: 'Street View at Kapaleeshwarar Temple, Chennai'
  }
};
