import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Package, 
  User, 
  Mail, 
  Phone, 
  Building2,
  FileText,
  Clock,
  DollarSign,
  CheckCircle,
  Plane,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';
import { Footer } from './Footer';

// Comprehensive Country and Airport data
export const COUNTRY_AIRPORTS: Record<string, string[]> = {
  'Afghanistan': ['Ahmad Shah Baba International Airport / Kandahar Airfield', 'Herat - Khwaja Abdullah Ansari International Airport', 'Kabul International Airport', 'Mazar-i-Sharif International Airport'],
  'Albania': ['Tirana International Airport Mother Teresa'],
  'Algeria': ['Ain Arnat Airport', 'Annaba Rabah Bitat Airport', 'Batna Mostefa Ben Boulaid Airport', 'Biskra - Mohamed Khider Airport', 'Chlef Aboubakr Belkaid International Airport', 'Hassi Messaoud-Oued Irara Krim Belkacem Airport', 'Houari Boumediene Airport', 'Mohamed Boudiaf International Airport', 'Oran Es-Sénia (Ahmed Ben Bella) International Airport', 'Soummam–Abane Ramdane Airport', 'Zenata – Messali El Hadj Airport'],
  'American Samoa': ['Pago Pago International Airport'],
  'Angola': ['Lubango Airport', 'Quatro de Fevereiro International Airport'],
  'Anguilla': ['Clayton J Lloyd International Airport'],
  'Antigua and Barbuda': ['V C Bird International Airport'],
  'Argentina': ['El Plumerillo Airport', 'Ingeniero Ambrosio Taravella Airport', 'Jorge Newbery Airpark', 'Minister Pistarini International Airport', 'Piloto Civil N. Fernández Airport', 'Rosario Islas Malvinas International Airport'],
  'Armenia': ['Shirak International Airport', 'Zvartnots International Airport'],
  'Aruba': ['Queen Beatrix International Airport'],
  'Australia': ['Adelaide International Airport', 'Brisbane International Airport', 'Cairns International Airport', 'Darwin International Airport / RAAF Darwin', 'Gold Coast Airport', 'Melbourne Airport', 'Perth International Airport', 'Port Hedland International Airport', 'Sydney Kingsford Smith International Airport'],
  'Austria': ['Graz Airport', 'Innsbruck Airport', 'Klagenfurt Airport', 'Linz-Hörsching Airport / Vogler Air Base', 'Salzburg Airport', 'Vienna International Airport'],
  'Azerbaijan': ['Gabala International Airport', 'Heydar Aliyev International Airport', 'Lankaran International Airport', 'Nakhchivan Airport'],
  'Bahamas': ['Exuma International Airport', 'Governor\'s Harbour Airport', 'Grand Bahama International Airport', 'Leonard M Thompson International Airport', 'Lynden Pindling International Airport', 'North Eleuthera Airport', 'San Salvador Airport', 'South Bimini Airport', 'Treasure Cay Airport'],
  'Bahrain': ['Bahrain International Airport'],
  'Bangladesh': ['Hazrat Shahjalal International Airport', 'Osmany International Airport', 'Shah Amanat International Airport'],
  'Barbados': ['Grantley Adams International Airport'],
  'Belarus': ['Minsk National Airport'],
  'Belgium': ['Antwerp International Airport (Deurne)', 'Brussels Airport', 'Brussels South Charleroi Airport', 'Liège Airport', 'Oostende-Brugge International Airport'],
  'Belize': ['Philip S. W. Goldson International Airport'],
  'Benin': ['Cadjehoun Airport'],
  'Bermuda': ['L.F. Wade International Airport'],
  'Bhutan': ['Paro International Airport'],
  'Bolivia': ['El Alto International Airport', 'Jorge Wilsterman International Airport', 'Viru Viru International Airport'],
  'Bonaire, Sint Eustatius and Saba': ['Flamingo International Airport', 'Juancho E. Yrausquin Airport'],
  'Bosnia and Herzegovina': ['Banja Luka International Airport', 'Mostar International Airport', 'Sarajevo International Airport', 'Tuzla International Airport'],
  'Botswana': ['Kasane Airport', 'Maun Airport', 'P G Matante Intl', 'Sir Seretse Khama International Airport'],
  'Brazil': ['Afonso Pena Airport', 'Cataratas International Airport', 'Deputado Luiz Eduardo Magalhães International Airport', 'Eduardo Gomes International Airport', 'Guarulhos - Governador André Franco Montoro International Airport', 'Hercílio Luz International Airport', 'Pinto Martins International Airport', 'Presidente Juscelino Kubitschek International Airport', 'Recife/Guararapes - Gilberto Freyre International Airport', 'Rio Galeão – Tom Jobim International Airport', 'Salgado Filho International Airport', 'São Gonçalo do Amarante - Governador Aluízio Alves International Airport', 'Tancredo Neves International Airport', 'Val de Cans/Júlio Cezar Ribeiro International Airport', 'Viracopos International Airport'],
  'British Virgin Islands': ['Terrance B. Lettsome International Airport', 'Virgin Gorda Airport'],
  'Brunei': ['Brunei International Airport'],
  'Bulgaria': ['Burgas Airport', 'Plovdiv International Airport', 'Sofia Airport', 'Varna Airport'],
  'Burkina Faso': ['Bobo Dioulasso Airport', 'Ouagadougou Airport'],
  'Burundi': ['Bujumbura Melchior Ndadaye International Airport'],
  'Cabo Verde': ['Amílcar Cabral International Airport', 'Rabil Airport', 'São Pedro Airport'],
  'Cambodia': ['Phnom Penh International Airport'],
  'Cameroon': ['Douala International Airport', 'Garoua International Airport', 'N\'Gaoundéré Airport', 'Yaoundé Nsimalen International Airport'],
  'Canada': ['Billy Bishop Toronto City Centre Airport', 'Calgary International Airport', 'Edmonton International Airport', 'Fort McMurray Airport', 'Greater Moncton Roméo LeBlanc International Airport', 'Halifax / Stanfield International Airport', 'Kelowna International Airport', 'London Airport', 'Montreal / Pierre Elliott Trudeau International Airport', 'Ottawa Macdonald-Cartier International Airport', 'Quebec Jean Lesage International Airport', 'Regina International Airport', 'Region of Waterloo International Airport', 'Saskatoon John G. Diefenbaker International Airport', 'St. John\'s International Airport', 'Toronto Lester B. Pearson International Airport', 'Vancouver International Airport', 'Victoria International Airport', 'Winnipeg / James Armstrong Richardson International Airport'],
  'Cayman Islands': ['Charles Kirkconnell International Airport', 'Owen Roberts International Airport'],
  'Central African Republic': ['Bangui M\'Poko International Airport'],
  'Chad': ['N\'Djamena International Airport'],
  'Chile': ['Andrés Sabella Gálvez International Airport', 'Chacalluta Airport', 'Comodoro Arturo Merino Benítez International Airport', 'Diego Aracena Airport', 'Mataveri Airport', 'President Carlos Ibañez del Campo International Airport'],
  'China': ['Beijing Capital International Airport', 'Changchun Longjia International Airport', 'Changsha Huanghua International Airport', 'Chengdu Shuangliu International Airport', 'Chongqing Jiangbei International Airport', 'Dalian Zhoushuizi International Airport', 'Fuzhou Changle International Airport', 'Guangzhou Baiyun International Airport', 'Guilin Liangjiang International Airport', 'Guiyang Longdongbao International Airport', 'Haikou Meilan International Airport', 'Hangzhou Xiaoshan International Airport', 'Harbin Taiping International Airport', 'Hefei Xinqiao International Airport', 'Hohhot Baita International Airport', 'Huai\'an Lianshui International Airport', 'Hulunbuir Hailar Airport', 'Jiamusi Dongjiao Airport', 'Jieyang Chaoshan International Airport', 'Jinan Yaoqiang International Airport', 'Kunming Changshui International Airport', 'Lanzhou Zhongchuan International Airport', 'Lhasa Gonggar Airport', 'Lianyungang Huaguoshan International Airport', 'Lijiang Sanyi International Airport', 'Manzhouli Xijiao Airport', 'Meizhou Meixian Changgangji International Airport', 'Mudanjiang Hailang International Airport', 'Nanchang Changbei International Airport', 'Nanjing Lukou International Airport', 'Nanning Wuxu Airport', 'Nanping Wuyishan Airport', 'Ningbo Lishe International Airport', 'Qingdao Jiaodong International Airport', 'Quanzhou Jinjiang International Airport', 'Sanya Phoenix International Airport', 'Shanghai Hongqiao International Airport', 'Shanghai Pudong International Airport', 'Shenyang Taoxian International Airport', 'Shenzhen Bao\'an International Airport', 'Shijiazhuang Zhengding International Airport', 'Sunan Shuofang International Airport', 'Taiyuan Wusu International Airport', 'Tianjin Binhai International Airport', 'Tunxi International Airport', 'Wenzhou Longwan International Airport', 'Wuhan Tianhe International Airport', 'Xi\'an Xianyang International Airport', 'Xiamen Gaoqi International Airport', 'Xishuangbanna Gasa International Airport', 'Xuzhou Guanyin International Airport', 'Yancheng Nanyang International Airport', 'Yanji Chaoyangchuan Airport', 'Yantai Penglai International Airport', 'Yichang Sanxia Airport', 'Zhangjiajie Hehua International Airport', 'Zhanjiang Wuchuan Airport', 'Zhengzhou Xinzheng International Airport', 'Ürümqi Tianshan International Airport'],
  'Christmas Island': ['Christmas Island Airport'],
  'Cocos (Keeling) Islands': ['Cocos (Keeling) Islands Airport'],
  'Colombia': ['Alfonso Bonilla Aragon International Airport', 'Camilo Daza International Airport', 'El Dorado International Airport', 'El Eden Airport', 'Ernesto Cortissoz International Airport', 'Gustavo Rojas Pinilla International Airport', 'Jose Maria Córdova International Airport', 'Matecaña International Airport', 'Palonegro Airport', 'Rafael Nuñez International Airport'],
  'Comoros': ['Prince Said Ibrahim International Airport'],
  'Congo': ['Antonio Agostinho-Neto International Airport', 'Maya-Maya Airport'],
  'Cook Islands': ['Rarotonga International Airport'],
  'Costa Rica': ['Guanacaste Airport', 'Juan Santamaría International Airport'],
  'Croatia': ['Dubrovnik Ruđer Bošković Airport', 'Osijek Airport', 'Pula Airport', 'Rijeka Airport', 'Split Airport', 'Zadar Airport', 'Zagreb Franjo Tuđman International Airport'],
  'Cuba': ['Abel Santamaria Airport', 'Antonio Maceo International Airport', 'Frank Pais International Airport', 'Ignacio Agramonte International Airport', 'Jardines Del Rey Airport', 'José Martí International Airport', 'Juan Gualberto Gomez International Airport', 'Vilo Acuña International Airport'],
  'Curaçao': ['Hato International Airport'],
  'Cyprus': ['Larnaca International Airport', 'Nicosia (Lefkoşa) Ercan International Airport', 'Paphos International Airport'],
  'Czech Republic': ['Brno-Tuřany Airport', 'Karlovy Vary Airport', 'Ostrava Leos Janáček Airport', 'Pardubice Airport', 'Václav Havel Airport Prague'],
  'Democratic Republic of the Congo': ['Lubumbashi International Airport', 'Ndjili International Airport'],
  'Denmark': ['Aalborg Airport', 'Aarhus Airport', 'Billund Airport', 'Copenhagen Kastrup Airport', 'Esbjerg Airport'],
  'Djibouti': ['Djibouti-Ambouli Airport'],
  'Dominica': ['Douglas-Charles Airport'],
  'Dominican Republic': ['Casa De Campo International Airport', 'Cibao International Airport', 'Gregorio Luperon International Airport', 'La Isabela International Airport', 'Las Américas International Airport', 'Punta Cana International Airport', 'Samaná El Catey International Airport'],
  'Ecuador': ['Carlos Concha Torres International Airport', 'José Joaquín de Olmedo International Airport', 'Mariscal Sucre International Airport'],
  'Egypt': ['Alexandria International Airport', 'Aswan International Airport', 'Asyut International Airport', 'Cairo International Airport', 'Hurghada International Airport', 'Luxor International Airport', 'Marsa Alam International Airport', 'Sharm El Sheikh International Airport', 'Sohag International Airport'],
  'El Salvador': ['Monseñor Óscar Arnulfo Romero International Airport'],
  'Equatorial Guinea': ['Bata Airport', 'Malabo Airport'],
  'Eritrea': ['Asmara International Airport'],
  'Estonia': ['Lennart Meri Tallinn Airport', 'Tartu Airport'],
  'Eswatini': ['Matsapha Airport'],
  'Ethiopia': ['Aba Tenna Dejazmach Yilma International Airport', 'Addis Ababa Bole International Airport'],
  'Falkland Islands (Malvinas)': ['Mount Pleasant Airport'],
  'Faroe Islands': ['Vágar Airport'],
  'Fiji': ['Nadi International Airport', 'Nausori International Airport'],
  'Finland': ['Helsinki Vantaa Airport', 'Lappeenranta Airport', 'Mariehamn Airport', 'Oulu Airport', 'Pori Airport', 'Tampere-Pirkkala Airport', 'Turku Airport', 'Vaasa Airport'],
  'France': ['Ajaccio Napoléon Bonaparte airport', 'Bastia Poretta airport', 'Beauvais Tillé airport', 'Bergerac Dordogne-Périgord airport', 'Biarritz Pays Basque airport', 'Bordeaux–Mérignac Airport', 'Brest Bretagne airport', 'Brive Souillac airport', 'Béziers Vias airport', 'Calvi Sainte Catherine Airport', 'Carcassonne Salvaza Airport', 'Chalons Vatry airport', 'Charles de Gaulle International Airport', 'Clermont-Ferrand Auvergne airport', 'Deauville Normandie airport', 'Dinard Pleurtuit Saint-Malo airport', 'Dole Tavaux Airport', 'EuroAirport Basel–Mulhouse–Freiburg', 'Figari Sud-Corse Airport', 'La Rochelle Île de Ré Airport', 'Lille Airport', 'Limoges Airport', 'Lyon Saint-Exupéry Airport', 'Marseille Provence Airport', 'Metz-Nancy-Lorraine Airport', 'Montpellier-Méditerranée Airport', 'Nantes Atlantique Airport', 'Nice-Côte d\'Azur Airport', 'Nîmes-Arles-Camargue Airport', 'Paris-Orly Airport', 'Perpignan-Rivesaltes (Llabanère) Airport', 'Poitiers-Biard Airport', 'Rennes-Saint-Jacques Airport', 'Rodez–Aveyron Airport', 'Saint-Étienne-Bouthéon Airport', 'Strasbourg Airport', 'Tarbes-Lourdes-Pyrénées Airport', 'Toulon-Hyères Airport', 'Toulouse-Blagnac Airport', 'Tours Val de Loire Airport'],
  'French Guiana': ['Cayenne – Félix Eboué Airport'],
  'French Polynesia': ['Faa\'a International Airport'],
  'Gabon': ['Libreville Leon M\'ba International Airport', 'Port Gentil Airport'],
  'Gambia': ['Banjul International Airport'],
  'Georgia': ['Batumi International Airport', 'David the Builder Kutaisi International Airport', 'Tbilisi International Airport'],
  'Germany': ['Augsburg Airport', 'Bremen Airport', 'Cologne Bonn Airport', 'Dortmund Airport', 'Dresden Airport', 'Düsseldorf Airport', 'Erfurt-Weimar Airport', 'Frankfurt Airport', 'Frankfurt-Hahn Airport', 'Friedrichshafen Airport', 'Hamburg Helmut Schmidt Airport', 'Hamburg-Finkenwerder Airport', 'Hannover Airport', 'Karlsruhe Baden-Baden Airport', 'Kassel Airport', 'Leipzig/Halle Airport', 'Lübeck Blankensee Airport', 'Memmingen Allgau Airport', 'Munich Airport', 'Münster Osnabrück Airport', 'Nuremberg Airport', 'Paderborn Lippstadt Airport', 'Rostock-Laage Airport', 'Saarbrücken Airport', 'Stuttgart Airport', 'Weeze Airport', 'Westerland Sylt Airport', 'Zweibrücken Airport'],
  'Ghana': ['Kotoka International Airport'],
  'Gibraltar': ['Gibraltar Airport'],
  'Greece': ['Aktion National Airport', 'Athens Eleftherios Venizelos International Airport', 'Chania International Airport', 'Chios Island National Airport', 'Corfu Ioannis Kapodistrias International Airport', 'Diagoras Airport', 'Heraklion International Nikos Kazantzakis Airport', 'Kalamata Airport', 'Karpathos Airport', 'Kavala Alexander the Great International Airport', 'Kefallinia Airport', 'Kithira Airport', 'Kos Airport', 'Mykonos Island National Airport', 'Mytilene International Airport', 'Nea Anchialos National Airport', 'Patras Araxos Agamemnon Airport', 'Samos Airport', 'Santorini Airport', 'Thessaloniki Macedonia International Airport', 'Zakynthos International Airport Dionysios Solomos'],
  'Greenland': ['Kangerlussuaq Airport', 'Nuuk Airport'],
  'Grenada': ['Maurice Bishop International Airport'],
  'Guadeloupe': ['Guadeloupe - Maryse Condé International Airport'],
  'Guam': ['Antonio B. Won Pat International Airport'],
  'Guatemala': ['La Aurora Airport', 'Mundo Maya International Airport'],
  'Guernsey': ['Alderney Airport', 'Guernsey Airport'],
  'Guinea': ['Conakry International Airport'],
  'Guinea-Bissau': ['Osvaldo Vieira International Airport'],
  'Guyana': ['Cheddi Jagan International Airport', 'Eugene F. Correia International Airport'],
  'Haiti': ['Cap Haitien International Airport', 'Toussaint Louverture International Airport'],
  'Honduras': ['Goloson International Airport', 'Juan Manuel Gálvez International Airport', 'Ramón Villeda Morales International Airport', 'Toncontín International Airport'],
  'Hong Kong': ['Hong Kong International Airport'],
  'Hungary': ['Budapest Liszt Ferenc International Airport', 'Debrecen International Airport'],
  'Iceland': ['Keflavik International Airport', 'Reykjavík Domestic Airport'],
  'India': ['Bagdogra Airport', 'Calicut International Airport', 'Chaudhary Charan Singh International Airport', 'Chennai International Airport', 'Chhatrapati Shivaji International Airport', 'Cochin International Airport', 'Coimbatore International Airport', 'Dabolim Airport', 'Dr. Babasaheb Ambedkar International Airport', 'Indira Gandhi International Airport', 'Jaipur International Airport', 'Kempegowda International Airport', 'Lal Bahadur Shastri Airport', 'Lokpriya Gopinath Bordoloi International Airport', 'Madurai Airport', 'Mangalore International Airport', 'Netaji Subhash Chandra Bose International Airport', 'Pune Airport / Lohagaon Air Force Station', 'Rajiv Gandhi International Airport', 'Sardar Vallabh Bhai Patel International Airport', 'Sri Guru Ram Dass Jee International Airport', 'Thiruvananthapuram International Airport', 'Tiruchirappalli International Airport', 'Visakhapatnam Airport'],
  'Indonesia': ['Achmad Yani Airport', 'Adisumarmo Airport', 'Adisutjipto Airport', 'Denpasar I Gusti Ngurah Rai International Airport', 'Hang Nadim International Airport', 'Hasanuddin International Airport', 'Husein Sastranegara International Airport', 'Juanda International Airport', 'Juwata International Airport / Suharnoko Harbani AFB', 'Lombok International Airport', 'Minangkabau International Airport', 'Sam Ratulangi Airport', 'Soekarno-Hatta International Airport', 'Sultan Aji Muhammad Sulaiman Sepinggan International Airport', 'Sultan Iskandar Muda International Airport', 'Sultan Mahmud Badaruddin II Airport', 'Sultan Syarif Kasim II International Airport / Roesmin Nurjadin AFB', 'Supadio Airport'],
  'Iran': ['Bandar Abbas International Airport', 'Bandar Lengeh International Airport', 'Bushehr Airport', 'Chabahar Konarak International Airport', 'Gorgan Airport', 'Imam Khomeini International Airport', 'Isfahan Shahid Beheshti International Airport', 'Kish International Airport', 'Lamerd Airport', 'Lar Airport', 'Lieutenant General Qasem Soleimani International Airport', 'Mashhad International Airport', 'Mehrabad International Airport', 'Sardar-e-Jangal Airport', 'Shahid Ashrafi Esfahani Airport', 'Shahid Sadooghi Airport', 'Shiraz Shahid Dastghaib International Airport', 'Tabriz International Airport', 'Urmia Airport', 'Zahedan International Airport'],
  'Iraq': ['Al Najaf International Airport', 'Baghdad International Airport / New Al Muthana Air Base', 'Basra International Airport', 'Erbil International Airport', 'Mosul International Airport', 'Sulaymaniyah International Airport'],
  'Ireland': ['Cork Airport', 'Donegal Airport', 'Dublin Airport', 'Ireland West Knock Airport', 'Kerry Airport', 'Shannon Airport', 'Waterford Airport'],
  'Isle of Man': ['Isle of Man Airport'],
  'Israel': ['Ben Gurion International Airport', 'Ovda Airport'],
  'Italy': ['Abruzzo Airport', 'Alghero-Fertilia Airport', 'Bari Karol Wojtyła International Airport', 'Bologna Guglielmo Marconi Airport', 'Brindisi Airport', 'Cagliari Elmas Airport', 'Catania-Fontanarossa Airport', 'Ciampino–G. B. Pastine International Airport', 'Comiso Airport', 'Cuneo International Airport', 'Falcone–Borsellino Airport', 'Federico Fellini International Airport', 'Florence Airport, Peretola', 'Genoa Cristoforo Colombo Airport', 'Lamezia Terme Sant\'Eufemia International Airport', 'Marche Airport', 'Marina di Campo Airport', 'Milan Bergamo Airport / Antonio Locatelli Air Base', 'Milan Malpensa International Airport', 'Milano Linate Airport', 'Naples International Airport', 'Olbia Costa Smeralda Airport', 'Parma Airport', 'Perugia San Francesco d\'Assisi – Umbria International Airport', 'Pisa International Airport', 'Rome–Fiumicino Leonardo da Vinci International Airport', 'Treviso Antonio Canova Airport', 'Trieste–Friuli Venezia Giulia Airport', 'Turin Airport', 'Venice Marco Polo Airport', 'Verona Villafranca Valerio Catullo Airport', 'Vincenzo Florio Airport Trapani-Birgi'],
  'Ivory Coast': ['Félix-Houphouët-Boigny International Airport'],
  'Jamaica': ['Norman Manley International Airport', 'Sangster International Airport'],
  'Japan': ['Akita Airport', 'Aomori Airport', 'Asahikawa Airport', 'Chubu Centrair International Airport', 'Fukuoka Airport', 'Hakodate Airport', 'Hiroshima Airport', 'Ibaraki Airport / JASDF Hyakuri Air Base', 'Kagoshima Airport', 'Kansai International Airport', 'Komatsu Airport / JASDF Komatsu Air Base', 'Kumamoto Airport', 'Kushiro Airport', 'Matsuyama Airport', 'Miyazaki Airport', 'Nagasaki Airport', 'Naha Airport / JASDF Naha Air Base', 'Narita International Airport', 'New Chitose Airport', 'New Ishigaki Airport', 'Niigata Airport', 'Oita Airport', 'Okayama Momotaro Airport', 'Saga Airport', 'Sendai Airport', 'Takamatsu Airport', 'Tokyo Haneda International Airport', 'Toyama Airport', 'Yamaguchi Ube Airport', 'Yonago Kitaro Airport / JASDF Miho Air Base'],
  'Jersey': ['Jersey Airport'],
  'Jordan': ['Aqaba King Hussein International Airport', 'Queen Alia International Airport'],
  'Kazakhstan': ['Aktau Airport', 'Aktobe Airport', 'Almaty International Airport', 'Atyrau International Airport', 'Kokshetau Airport', 'Kostanay West Airport', 'Pavlodar Airport', 'Sary-Arka Airport', 'Shymkent Airport', 'Taraz Airport', 'Ust-Kamenogorsk Airport'],
  'Kenya': ['Jomo Kenyatta International Airport', 'Moi International Airport', 'Nairobi Wilson Airport', 'Wajir Airport'],
  'Kiribati': ['Bonriki International Airport', 'Cassidy International Airport'],
  'Kuwait': ['Kuwait International Airport'],
  'Kyrgyzstan': ['Osh Airport'],
  'Laos': ['Luang Phabang International Airport', 'Pakse International Airport', 'Savannakhet Airport', 'Wattay International Airport'],
  'Latvia': ['Riga International Airport'],
  'Lebanon': ['Beirut Rafic Hariri International Airport'],
  'Lesotho': ['Moshoeshoe I International Airport'],
  'Liberia': ['Roberts International Airport', 'Spriggs Payne Airport'],
  'Libya': ['Al Abraq International Airport', 'Benina International Airport', 'Sirt International Airport / Ghardabiya Airbase', 'Tobruk International Airport'],
  'Lithuania': ['Kaunas International Airport', 'Palanga International Airport', 'Vilnius International Airport'],
  'Luxembourg': ['Luxembourg-Findel International Airport'],
  'Macao': ['Macau International Airport'],
  'Madagascar': ['Amborovy Airport', 'Arrachart Airport', 'Fascene Airport', 'Ivato Airport', 'Sainte Marie Airport', 'Toamasina Ambalamanasy Airport'],
  'Malawi': ['Chileka International Airport', 'Kamuzu International Airport'],
  'Malaysia': ['Kota Kinabalu International Airport', 'Kuala Lumpur International Airport', 'Kuantan Airport', 'Kuching International Airport', 'LTS Pulau Redang Airport', 'Langkawi International Airport', 'Miri Airport', 'Mulu Airport', 'Penang International Airport', 'Senai International Airport', 'Sultan Abdul Aziz Shah International Airport', 'Sultan Azlan Shah Airport', 'Sultan Ismail Petra Airport', 'Sultan Mahmud Airport', 'Tawau Airport'],
  'Maldives': ['Gan International Airport', 'Hanimaadhoo Airport', 'Malé International Airport'],
  'Mali': ['Modibo Keita International Airport'],
  'Malta': ['Malta International Airport'],
  'Marshall Islands': ['Bucholz Army Air Field', 'Marshall Islands International Airport'],
  'Martinique': ['Martinique Aimé Césaire International Airport'],
  'Mauritania': ['Nouadhibou International Airport', 'Nouakchout–Oumtounsy International Airport', 'Tazadit Airport'],
  'Mauritius': ['Sir Seewoosagur Ramgoolam International Airport'],
  'Mayotte': ['Dzaoudzi Pamandzi International Airport'],
  'Mexico': ['Adolfo López Mateos International Airport', 'Bahías de Huatulco International Airport', 'Benito Juárez International Airport', 'Cancún International Airport', 'Carlos Rovirosa Pérez International Airport', 'Ciudad del Carmen International Airport', 'Cozumel International Airport', 'Del Bajío International Airport', 'Francisco Sarabia Tinoco International Airport', 'General Abelardo L. Rodriguez International Airport', 'General Francisco J. Mujica International Airport', 'General Francisco Javier Mina International Airport', 'General Guadalupe Victoria International Airport', 'General Heriberto Jara International Airport', 'General Ignacio P. Garcia International Airport', 'General Juan N. Álvarez International Airport', 'General Leobardo C. Ruiz International Airport', 'General Rafael Buelna International Airport', 'General Roberto Fierro Villalobos International Airport', 'Guadalajara International Airport', 'Hermanos Serdán International Airport', 'Ixtapa-Zihuatanejo International Airport', 'Jesús Terán Peredo International Airport', 'Loreto International Airport', 'Los Cabos International Airport', 'Manuel Crescencio Rejón International Airport', 'Monterrey International Airport', 'Plan De Guadalupe International Airport', 'Playa de Oro International Airport', 'Ponciano Arriaga International Airport', 'Puerto Vallarta International Airport', 'Querétaro Intercontinental Airport', 'Tapachula International Airport', 'Uruapan - Licenciado y General Ignacio Lopez Rayon International Airport', 'Xoxocotlán International Airport'],
  'Micronesia': ['Chuuk International Airport', 'Kosrae International Airport', 'Pohnpei International Airport', 'Yap International Airport'],
  'Mongolia': ['Buyant-Ukhaa International Airport', 'Choibalsan Airport'],
  'Montenegro': ['Podgorica Airport / Podgorica Golubovci Airbase', 'Tivat Airport'],
  'Morocco': ['Al Massira Airport', 'Essaouira-Mogador Airport', 'Fes Saïss International Airport', 'Menara Airport', 'Mohammed V International Airport', 'Nador Al Aaroui International Airport', 'Ouarzazate Airport', 'Oujda Angads Airport', 'Rabat-Salé Airport', 'Tangier Ibn Battuta Airport'],
  'Mozambique': ['Beira Airport', 'Chingozi Airport', 'Inhambane Airport', 'Maputo Airport', 'Nampula Airport', 'Pemba Airport', 'Vilankulo Airport'],
  'Myanmar': ['Mandalay International Airport', 'Nay Pyi Taw International Airport', 'Yangon International Airport'],
  'Namibia': ['Hosea Kutako International Airport', 'Walvis Bay Airport'],
  'Nauru': ['Nauru International Airport'],
  'Nepal': ['Tribhuvan International Airport'],
  'Netherlands': ['Amsterdam Airport Schiphol', 'Eindhoven Airport', 'Groningen Airport Eelde', 'Maastricht Aachen Airport', 'Rotterdam The Hague Airport'],
  'New Caledonia': ['La Tontouta International Airport'],
  'New Zealand': ['Auckland International Airport', 'Christchurch International Airport', 'Dunedin International Airport', 'Queenstown International Airport', 'Wellington International Airport'],
  'Nicaragua': ['Augusto C. Sandino (Managua) International Airport'],
  'Niger': ['Diori Hamani International Airport'],
  'Nigeria': ['Akanu Ibiam International Airport', 'Mallam Aminu International Airport', 'Murtala Muhammed International Airport', 'Nnamdi Azikiwe International Airport'],
  'Niue': ['Niue International Airport'],
  'Norfolk Island': ['Norfolk Island International Airport'],
  'North Korea': ['Pyongyang Sunan International Airport'],
  'North Macedonia': ['Skopje International Airport'],
  'Northern Mariana Islands': ['Rota International Airport', 'Saipan International Airport'],
  'Norway': ['Bergen Airport, Flesland', 'Haugesund Airport, Karmøy', 'Kristiansand Airport, Kjevik', 'Kristiansund Airport, Kvernberget', 'Molde Airport, Årø', 'Oslo Airport, Gardermoen', 'Stavanger Airport, Sola', 'Trondheim Airport, Værnes', 'Ålesund Airport, Vigra'],
  'Oman': ['Muscat International Airport', 'Salalah Airport'],
  'Pakistan': ['Allama Iqbal International Airport', 'Dera Ghazi Khan Airport', 'Islamabad International Airport', 'Jinnah International Airport', 'Multan International Airport', 'New Gwadar International Airport', 'Peshawar International Airport', 'Quetta International Airport', 'Shaikh Zaid Airport', 'Sialkot International Airport', 'Turbat International Airport'],
  'Palau': ['Palau International Airport'],
  'Panama': ['Bocas del Toro International Airport', 'Enrique Malek International Airport', 'Tocumen International Airport'],
  'Papua New Guinea': ['Port Moresby Jacksons International Airport', 'Tokua Airport'],
  'Paraguay': ['Aeropuerto Internacional Guaraní', 'Aeropuerto Internacional Silvio Pettirossi'],
  'Peru': ['Alejandro Velasco Astete International Airport', 'Coronel FAP Francisco Secada Vignetta International Airport', 'Jorge Chávez International Airport', 'Rodríguez Ballón International Airport'],
  'Philippines': ['Clark International Airport / Clark Air Base', 'Francisco Bangoy International Airport', 'Iloilo International Airport', 'Kalibo International Airport', 'Mactan Cebu International Airport', 'Ninoy Aquino International Airport', 'Puerto Princesa International Airport / PAF Antonio Bautista Air Base'],
  'Poland': ['Bydgoszcz Ignacy Jan Paderewski Airport', 'Copernicus Wrocław Airport', 'Gdańsk Lech Wałęsa Airport', 'Katowice Wojciech Korfanty International Airport', 'Kraków John Paul II International Airport', 'Lublin Airport', 'Modlin Airport', 'Poznań-Ławica Airport', 'Rzeszów-Jasionka Airport', 'Solidarity Szczecin–Goleniów Airport', 'Warsaw Chopin Airport'],
  'Portugal': ['Faro Airport', 'Francisco de Sá Carneiro Airport', 'João Paulo II Airport', 'Lisbon Humberto Delgado Airport', 'Madeira International Airport Cristiano Ronaldo'],
  'Puerto Rico': ['Antonio Rivera Rodriguez Airport', 'Luis Munoz Marin International Airport', 'Mercedita Airport', 'Rafael Hernández International Airport'],
  'Qatar': ['Hamad International Airport'],
  'Romania': ['Arad International Airport', 'Bucharest Henri Coandă International Airport', 'Cluj Avram Iancu International Airport', 'Craiova International Airport', 'Iaşi Airport', 'Mihail Kogălniceanu International Airport', 'Sibiu International Airport', 'Timişoara Traian Vuia Airport', 'Târgu Mureş Transilvania International Airport'],
  'Russia': ['Astrakhan Narimanovo Boris M. Kustodiev International Airport', 'Baikal International Airport', 'Begishevo Airport', 'Belgorod International Airport', 'Chelyabinsk Balandino Airport', 'Cherepovets Airport', 'Chita-Kadala International Airport', 'Domodedovo International Airport', 'Irkutsk International Airport', 'Kazan International Airport', 'Khabarovsk Novy Airport', 'Khanty Mansiysk Airport', 'Khrabrovo Airport', 'Koltsovo Airport', 'Krasnodar Pashkovsky International Airport', 'Krasnoyarsk International Airport', 'Kurumoch International Airport', 'Makhachkala Uytash International Airport', 'Mineralnyye Vody Airport', 'Nizhnevartovsk Airport', 'Nizhny Novgorod / Strigino International Airport', 'Novosibirsk Tolmachevo Airport', 'Omsk Central Airport', 'Orenburg Central Airport', 'Perm International Airport', 'Platov International Airport', 'Pulkovo Airport', 'Roshchino International Airport', 'Sheremetyevo International Airport', 'Sochi International Airport', 'Stavropol Shpakovskoye Airport', 'Surgut Airport', 'Ufa International Airport', 'Vladivostok International Airport', 'Vnukovo International Airport', 'Volgograd International Airport', 'Voronezh International Airport', 'Yakutsk Airport', 'Yuzhno-Sakhalinsk Airport'],
  'Rwanda': ['Kigali International Airport'],
  'Réunion': ['Pierrefonds Airport', 'Roland Garros Airport'],
  'Saint Barthélemy': ['Saint Barthélemy - Gustaf III Airport'],
  'Saint Kitts and Nevis': ['Robert L. Bradshaw International Airport', 'Vance W. Amory International Airport'],
  'Saint Lucia': ['George F. L. Charles Airport', 'Hewanorra International Airport'],
  'Saint Martin (French part)': ['Grand Case-l\'Espérance Airport'],
  'Saint Pierre and Miquelon': ['St Pierre Airport'],
  'Saint Vincent and the Grenadines': ['Argyle International Airport'],
  'Samoa': ['Faleolo International Airport'],
  'Sao Tome and Principe': ['São Tomé International Airport'],
  'Saudi Arabia': ['Abha International Airport', 'Al-Ahsa International Airport', 'Gassim Airport', 'Ha\'il Airport', 'King Abdulaziz International Airport', 'King Fahd International Airport', 'King Khaled International Airport', 'Prince Abdul Mohsin bin Abdulaziz International Airport / Yanbu Airport', 'Prince Mohammad Bin Abdulaziz Airport', 'Tabuk Airport', 'Ta\'if Regional Airport'],
  'Senegal': ['Léopold Sédar Senghor International Airport'],
  'Serbia': ['Belgrade Nikola Tesla Airport'],
  'Seychelles': ['Seychelles International Airport'],
  'Sierra Leone': ['Lungi International Airport'],
  'Singapore': ['Singapore Changi Airport'],
  'Sint Maarten (Dutch part)': ['Princess Juliana International Airport'],
  'Slovakia': ['Košice International Airport', 'M. R. Štefánik Airport'],
  'Slovenia': ['Ljubljana Jože Pučnik Airport'],
  'Solomon Islands': ['Honiara International Airport'],
  'Somalia': ['Aden Adde International Airport', 'Berbera Airport', 'Egal International Airport', 'Galcaio Airport'],
  'South Africa': ['Cape Town International Airport', 'King Shaka International Airport', 'Kruger Mpumalanga International Airport', 'O.R. Tambo International Airport'],
  'South Korea': ['Cheongju International Airport/Cheongju Air Base (K-59/G-513)', 'Daegu Airport', 'Gimhae International Airport', 'Gimpo International Airport', 'Incheon International Airport', 'Jeju International Airport', 'Muan International Airport', 'Yangyang International Airport'],
  'South Sudan': ['Juba International Airport'],
  'Spain': ['A Coruña Airport', 'Adolfo Suárez Madrid–Barajas Airport', 'Alicante-Elche Miguel Hernández Airport', 'Almería Airport', 'Asturias Airport', 'Bilbao Airport', 'César Manrique-Lanzarote Airport', 'F.G.L. Airport Granada-Jaén Airport', 'Fuerteventura Airport', 'Girona-Costa Brava Airport', 'Gran Canaria Airport', 'Ibiza Airport', 'Jerez Airport', 'Josep Tarradellas Barcelona-El Prat Airport', 'La Palma Airport', 'Menorca Airport', 'Málaga-Costa del Sol Airport', 'Palma de Mallorca Airport', 'Reus Airport', 'Santiago-Rosalía de Castro Airport', 'Seve Ballesteros-Santander Airport', 'Sevilla Airport', 'Tenerife Norte-Ciudad de La Laguna Airport', 'Tenerife Sur Airport', 'Valencia Airport', 'Vigo Airport', 'Zaragoza Airport'],
  'Sri Lanka': ['Bandaranaike International Colombo Airport', 'Mattala Rajapaksa International Airport'],
  'Sudan': ['Khartoum International Airport', 'Port Sudan New International Airport'],
  'Suriname': ['Johan Adolf Pengel International Airport'],
  'Sweden': ['Göteborg Landvetter Airport', 'Karlstad Airport', 'Linköping City Airport', 'Malmö Sturup Airport', 'Norrköping Airport', 'Pajala Airport', 'Skellefteå Airport', 'Stockholm Skavsta Airport', 'Stockholm Västerås Airport', 'Stockholm-Arlanda Airport', 'Stockholm-Bromma Airport', 'Säve Airport', 'Torsby Airport', 'Umeå Airport', 'Växjö Kronoberg Airport'],
  'Switzerland': ['Bern Airport', 'Geneva Cointrin International Airport', 'Sankt Gallen Altenrhein Airport', 'Zürich Airport'],
  'Taiwan': ['Hualien Airport', 'Kaohsiung International Airport', 'Taichung International Airport / Ching Chuang Kang Air Base', 'Tainan International Airport / Tainan Air Base', 'Taipei Songshan Airport', 'Taiwan Taoyuan International Airport'],
  'Tajikistan': ['Dushanbe International Airport', 'Khujand Airport', 'Kulob Airport', 'Qurghonteppa International Airport'],
  'Tanzania': ['Abeid Amani Karume International Airport', 'Julius Nyerere International Airport', 'Kilimanjaro International Airport', 'Mwanza Airport'],
  'Thailand': ['Chiang Mai International Airport', 'Don Mueang International Airport', 'Hat Yai International Airport', 'Krabi Airport', 'Mae Fah Luang - Chiang Rai International Airport', 'Phuket International Airport', 'Samui Airport', 'Surat Thani Airport', 'Suvarnabhumi Airport'],
  'Timor-Leste': ['Presidente Nicolau Lobato International Airport'],
  'Togo': ['Lomé–Tokoin International Airport'],
  'Tonga': ['Fua\'amotu International Airport'],
  'Trinidad and Tobago': ['A.N.R. Robinson International Airport', 'Piarco International Airport'],
  'Tunisia': ['Djerba Zarzis International Airport', 'Enfidha - Hammamet International Airport', 'Monastir Habib Bourguiba International Airport', 'Sfax Thyna International Airport', 'Tozeur Nefta International Airport', 'Tunis Carthage International Airport'],
  'Turkey': ['Adana Şakirpaşa Airport', 'Adnan Menderes International Airport', 'Anadolu Airport', 'Antalya International Airport', 'Dalaman International Airport', 'Esenboğa International Airport', 'Gaziantep International Airport', 'Gazipaşa-Alanya Airport', 'Hatay Airport', 'Istanbul Sabiha Gökçen International Airport', 'Kayseri Erkilet Airport', 'Konya Airport', 'Milas Bodrum International Airport', 'Trabzon International Airport', 'Zonguldak Çaycuma Airport', 'İstanbul Airport'],
  'Turkmenistan': ['Ashgabat International Airport'],
  'Turks and Caicos Islands': ['Providenciales International Airport'],
  'Tuvalu': ['Funafuti International Airport'],
  'U.S. Virgin Islands': ['Cyril E. King Airport', 'Henry E Rohlsen Airport'],
  'Uganda': ['Entebbe International Airport'],
  'Ukraine': ['Boryspil International Airport', 'Dnipro International Airport', 'Ihor Sikorsky Kyiv International Airport (Zhuliany)', 'Kharkiv International Airport', 'Lviv International Airport', 'Odessa International Airport', 'Sevastopol International Airport / Belbek Air Base', 'Simferopol International Airport', 'Vinnytsia/Gavyryshivka International Airport', 'Zaporizhzhia International Airport'],
  'United Arab Emirates': ['Al Ain International Airport', 'Al Maktoum International Airport', 'Dubai International Airport', 'Sharjah International Airport', 'Zayed International Airport'],
  'United Kingdom': ['Aberdeen International Airport', 'Belfast International Airport', 'Birmingham Airport', 'Blackpool Airport', 'Bournemouth Airport', 'Bristol Airport', 'Cardiff International Airport', 'City of Derry Airport', 'Cornwall Airport Newquay', 'East Midlands Airport', 'Edinburgh Airport', 'Exeter International Airport', 'George Best Belfast City Airport', 'Glasgow Airport', 'Glasgow Prestwick Airport', 'Gloucestershire Airport', 'Hawarden Airport', 'Humberside Airport', 'Inverness Airport', 'Leeds Bradford Airport', 'Liverpool John Lennon Airport', 'London City Airport', 'London Gatwick Airport', 'London Heathrow Airport', 'London Luton Airport', 'London Southend Airport', 'London Stansted Airport', 'Manchester Airport', 'Newcastle International Airport', 'Norwich Airport', 'Southampton Airport', 'Teesside International Airport'],
  'United States': ['Austin Bergstrom International Airport', 'Baltimore/Washington International Thurgood Marshall Airport', 'Birmingham-Shuttlesworth International Airport', 'Bradley International Airport', 'Charlotte Douglas International Airport', 'Chicago Midway International Airport', 'Chicago O\'Hare International Airport', 'Cincinnati Northern Kentucky International Airport', 'Cleveland Hopkins International Airport', 'Dallas Fort Worth International Airport', 'Daniel K Inouye International Airport', 'Denver International Airport', 'Detroit Metropolitan Wayne County Airport', 'Ellison Onizuka Kona International Airport at Keahole', 'Fort Lauderdale Hollywood International Airport', 'Frederick Douglass Greater Rochester International Airport', 'Fresno Yosemite International Airport', 'General Mitchell International Airport', 'George Bush Intercontinental Houston Airport', 'Harrisburg International Airport', 'Harry Reid International Airport', 'Hartsfield Jackson Atlanta International Airport', 'Indianapolis International Airport', 'Jacksonville International Airport', 'John F Kennedy International Airport', 'John Glenn Columbus International Airport', 'John Wayne Orange County International Airport', 'Kahului International Airport', 'Kansas City International Airport', 'LaGuardia Airport', 'Lihue Airport', 'Logan International Airport', 'Los Angeles International Airport', 'Louis Armstrong New Orleans International Airport', 'McAllen Miller International Airport', 'Miami International Airport', 'Minneapolis–Saint Paul International Airport / Wold–Chamberlain Field', 'Myrtle Beach International Airport', 'Nashville International Airport', 'Newark Liberty International Airport', 'Norman Y. Mineta San Jose International Airport', 'Ontario International Airport', 'Orlando International Airport', 'Orlando Sanford International Airport', 'Palm Beach International Airport', 'Palm Springs International Airport', 'Philadelphia International Airport', 'Phoenix Sky Harbor International Airport', 'Pittsburgh International Airport', 'Portland International Airport', 'Raleigh Durham International Airport', 'Richmond International Airport', 'Ronald Reagan Washington National Airport', 'Sacramento International Airport', 'Salt Lake City International Airport', 'San Antonio International Airport', 'San Diego International Airport', 'San Francisco Bay Oakland International Airport', 'San Francisco International Airport', 'Seattle–Tacoma International Airport', 'Southwest Florida International Airport', 'St. Louis Lambert International Airport', 'Syracuse Hancock International Airport', 'Tampa International Airport', 'Washington Dulles International Airport'],
  'Uruguay': ['Capitan Corbeta CA Curbelo International Airport', 'Carrasco General Cesáreo L. Berisso International Airport'],
  'Uzbekistan': ['Andizhan Airport', 'Bukhara International Airport', 'Fergana International Airport', 'Karshi Airport', 'Namangan Airport', 'Navoi Airport', 'Nukus Airport', 'Samarkand Airport', 'Tashkent International Airport', 'Termez Airport', 'Urgench Airport'],
  'Vanuatu': ['Bauerfield International Airport', 'Santo Pekoa International Airport'],
  'Venezuela': ['Arturo Michelena International Airport', 'Barquisimeto International Airport', 'Del Caribe Santiago Mariño International Airport', 'General José Antonio Anzoategui International Airport', 'General Manuel Carlos Piar International Airport', 'Josefa Camejo International Airport', 'La Chinita International Airport', 'Maiquetía Simón Bolívar International Airport'],
  'Vietnam': ['Cam Ranh International Airport / Cam Ranh Air Base', 'Da Nang International Airport', 'Noi Bai International Airport', 'Tan Son Nhat International Airport', 'Vinh Airport'],
  'Wallis and Futuna': ['Hihifo Airport'],
  'Western Sahara': ['Dakhla Airport', 'Hassan I Airport'],
  'XK': ['Priština Adem Jashari International Airport'],
  'Yemen': ['Aden International Airport', 'Riyan Mukalla International Airport', 'Sanaa International Airport', 'Seiyun Hadhramaut International Airport', 'Ta\'izz International Airport'],
  'Zambia': ['Harry Mwanga Nkumbula International Airport', 'Kenneth Kaunda International Airport', 'Simon Mwansa Kapwepwe International Airport'],
  'Zimbabwe': ['Joshua Mqabuko Nkomo International Airport', 'Robert Gabriel Mugabe International Airport', 'Victoria Falls International Airport']
};

// Get sorted country list
const countries = Object.keys(COUNTRY_AIRPORTS).sort();

const goodsTypes = [
  'Documents',
  'Electronics',
  'Clothing & Textiles',
  'Food Items',
  'Handicrafts',
  'Industrial Goods',
  'Personal Effects',
  'Other'
];

const serviceTypes = [
  {
    id: 'standard',
    name: 'Standard',
    duration: '5-7 days',
    icon: Package,
    description: 'Cost-effective solution for non-urgent shipments'
  },
  {
    id: 'express',
    name: 'Express',
    duration: '2-3 days',
    icon: Zap,
    description: 'Fast delivery for time-sensitive cargo'
  },
  {
    id: 'overnight',
    name: 'Overnight',
    duration: 'Next day',
    icon: Plane,
    description: 'Premium overnight delivery service'
  },
  {
    id: 'economy',
    name: 'International Economy',
    duration: '10-15 days',
    icon: DollarSign,
    description: 'Budget-friendly option for large shipments'
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Free, No Obligation',
    description: 'Get accurate quotes with no commitment required'
  },
  {
    icon: Clock,
    title: '24-Hour Response',
    description: 'Receive your detailed quote within one business day'
  },
  {
    icon: Shield,
    title: 'Competitive Pricing',
    description: 'Best rates backed by 14+ years of industry expertise'
  },
  {
    icon: Headphones,
    title: 'Expert Consultation',
    description: 'Personalized support from our logistics specialists'
  }
];

export function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Form state
  const [pickupCountry, setPickupCountry] = useState('Nepal');
  const [pickupAirport, setPickupAirport] = useState('');
  const [destCountry, setDestCountry] = useState('');
  const [destAirport, setDestAirport] = useState('');
  const [serviceType, setServiceType] = useState('express');
  
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    destAddress: '',
    destCity: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    goodsType: '',
    estimatedValue: '',
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    notes: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for URL parameter for destination
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    if (destination) {
      // Find country by name (case-insensitive match)
      const country = countries.find(c => c.toLowerCase() === destination.toLowerCase());
      if (country) {
        setDestCountry(country);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.pickupCity.trim()) newErrors.pickupCity = 'Pickup city is required';
    if (!pickupCountry) newErrors.pickupCountry = 'Pickup country is required';
    if (!pickupAirport) newErrors.pickupAirport = 'Pickup airport is required';
    
    if (!formData.destAddress.trim()) newErrors.destAddress = 'Destination address is required';
    if (!formData.destCity.trim()) newErrors.destCity = 'Destination city is required';
    if (!destCountry) newErrors.destCountry = 'Destination country is required';
    if (!destAirport) newErrors.destAirport = 'Destination airport is required';
    
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    if (!formData.length.trim()) newErrors.length = 'Length is required';
    if (!formData.width.trim()) newErrors.width = 'Width is required';
    if (!formData.height.trim()) newErrors.height = 'Height is required';
    if (!formData.goodsType) newErrors.goodsType = 'Goods type is required';
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', {
        ...formData,
        pickupCountry,
        pickupAirport,
        destCountry,
        destAirport,
        serviceType
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.error-message');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (submitted) {
    return (
      <div className="relative bg-[#F5F7F8] min-h-screen">
        <section className="relative pt-48 pb-32 px-6 lg:px-20">
          <div className="max-w-[800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-[#1A1A1B] tracking-tight mb-6" style={{ fontWeight: 700 }}>
                Quote Request
                <br />
                <span className="opacity-40">Received!</span>
              </h1>
              
              <p className="text-xl text-[#1A1A1B] opacity-70 leading-relaxed mb-12">
                Thank you for your quote request. Our logistics team will review your requirements 
                and send you a detailed quote within 24 hours.
              </p>

              <div className="bg-white p-8 mb-8 text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-5 h-5 text-[#003893]" />
                  <h3 className="text-lg text-[#1A1A1B]" style={{ fontWeight: 600 }}>
                    What Happens Next?
                  </h3>
                </div>
                <ul className="space-y-3 text-[#1A1A1B] opacity-70">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[#1A1A1B]" style={{ fontWeight: 700 }}>1</span>
                    </div>
                    <span>Our team will review your shipment details and requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[#1A1A1B]" style={{ fontWeight: 700 }}>2</span>
                    </div>
                    <span>You'll receive a detailed quote via email within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[#1A1A1B]" style={{ fontWeight: 700 }}>3</span>
                    </div>
                    <span>A logistics specialist will contact you to discuss your options</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 bg-[#003893] text-white hover:bg-[#002670] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Submit Another Quote
              </button>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative bg-[#F5F7F8] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
              <span className="text-[#1A1A1B] text-sm tracking-[0.2em] uppercase font-mono opacity-40">
                Request Quote
              </span>
              <div className="w-12 h-px bg-[#1A1A1B] opacity-20" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl text-[#1A1A1B] tracking-tight mb-6" style={{ fontWeight: 700 }}>
              Get Your
              <br />
              <span className="opacity-40">Free Quote</span>
            </h1>
            
            <p className="text-xl text-[#1A1A1B] opacity-60 leading-relaxed">
              Fast, accurate shipping estimates tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form and Sidebar Layout */}
      <section className="relative pb-32 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Pickup Information */}
                <div className="bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <MapPin className="w-6 h-6 text-[#003893]" />
                    <h2 className="text-2xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
                      Pickup Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Pickup Address <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="Street address"
                      />
                      {errors.pickupAddress && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.pickupAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Pickup City <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="pickupCity"
                        value={formData.pickupCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="City"
                      />
                      {errors.pickupCity && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.pickupCity}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Pickup Country <span className="text-[#DC143C]">*</span>
                      </label>
                      <select
                        value={pickupCountry}
                        onChange={(e) => {
                          setPickupCountry(e.target.value);
                          setPickupAirport('');
                        }}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] bg-white"
                      >
                        {countries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.pickupCountry && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.pickupCountry}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Pickup Airport <span className="text-[#DC143C]">*</span>
                      </label>
                      <select
                        value={pickupAirport}
                        onChange={(e) => setPickupAirport(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] bg-white"
                      >
                        <option value="">Select airport...</option>
                        {COUNTRY_AIRPORTS[pickupCountry]?.map(airport => (
                          <option key={airport} value={airport}>
                            {airport}
                          </option>
                        ))}
                      </select>
                      {errors.pickupAirport && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.pickupAirport}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Destination Information */}
                <div className="bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Plane className="w-6 h-6 text-[#003893]" />
                    <h2 className="text-2xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
                      Destination Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Destination Address <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="destAddress"
                        value={formData.destAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="Street address"
                      />
                      {errors.destAddress && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.destAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Destination City <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="destCity"
                        value={formData.destCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="City"
                      />
                      {errors.destCity && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.destCity}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Destination Country <span className="text-[#DC143C]">*</span>
                      </label>
                      <select
                        value={destCountry}
                        onChange={(e) => {
                          setDestCountry(e.target.value);
                          setDestAirport('');
                        }}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] bg-white"
                      >
                        <option value="">Select country...</option>
                        {countries.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.destCountry && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.destCountry}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Destination Airport <span className="text-[#DC143C]">*</span>
                      </label>
                      <select
                        value={destAirport}
                        onChange={(e) => setDestAirport(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] bg-white"
                        disabled={!destCountry}
                      >
                        <option value="">Select airport...</option>
                        {destCountry && COUNTRY_AIRPORTS[destCountry]?.map(airport => (
                          <option key={airport} value={airport}>
                            {airport}
                          </option>
                        ))}
                      </select>
                      {errors.destAirport && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.destAirport}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Package Details */}
                <div className="bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Package className="w-6 h-6 text-[#003893]" />
                    <h2 className="text-2xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
                      Package Details
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Weight (kg) <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="0.00"
                        step="0.01"
                      />
                      {errors.weight && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.weight}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Goods Type <span className="text-[#DC143C]">*</span>
                      </label>
                      <select
                        name="goodsType"
                        value={formData.goodsType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] bg-white"
                      >
                        <option value="">Select type...</option>
                        {goodsTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.goodsType && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.goodsType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Length (cm) <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="0.00"
                        step="0.01"
                      />
                      {errors.length && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.length}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Width (cm) <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="0.00"
                        step="0.01"
                      />
                      {errors.width && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.width}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Height (cm) <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="0.00"
                        step="0.01"
                      />
                      {errors.height && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.height}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Estimated Value (USD)
                      </label>
                      <input
                        type="number"
                        name="estimatedValue"
                        value={formData.estimatedValue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Type Selection */}
                <div className="bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-6 h-6 text-[#003893]" />
                    <h2 className="text-2xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
                      Service Type
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {serviceTypes.map(service => (
                      <label
                        key={service.id}
                        className={`relative flex items-start gap-4 p-6 border-2 cursor-pointer transition-all ${
                          serviceType === service.id
                            ? 'border-[#003893] bg-[#003893]/5'
                            : 'border-[#1A1A1B]/10 hover:border-[#003893]/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={service.id}
                          checked={serviceType === service.id}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <service.icon className="w-5 h-5 text-[#003893]" />
                            <h3 className="text-lg text-[#1A1A1B]" style={{ fontWeight: 700 }}>
                              {service.name}
                            </h3>
                          </div>
                          <p className="text-sm text-[#FFD700] mb-2 font-mono" style={{ fontWeight: 600 }}>
                            {service.duration}
                          </p>
                          <p className="text-sm text-[#1A1A1B] opacity-60">
                            {service.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 4: Contact Information */}
                <div className="bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="w-6 h-6 text-[#003893]" />
                    <h2 className="text-2xl text-[#1A1A1B] tracking-tight" style={{ fontWeight: 700 }}>
                      Contact Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Full Name <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="Your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Email <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Phone Number <span className="text-[#DC143C]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="+977 98XXXXXXXX"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-[#DC143C] error-message">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B]"
                        placeholder="Your company (optional)"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#1A1A1B] opacity-60 mb-2">
                        Additional Notes / Special Requirements
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-[#1A1A1B]/10 focus:border-[#003893] outline-none transition-colors text-[#1A1A1B] resize-none"
                        placeholder="Any special handling requirements, delivery instructions, or questions..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-5 bg-[#003893] text-white hover:bg-[#002670] transition-colors text-lg flex items-center justify-center gap-3"
                  style={{ fontWeight: 700 }}
                >
                  <FileText className="w-6 h-6" />
                  Get Quote
                </button>
              </form>
            </motion.div>

            {/* Benefits Sidebar - 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 bg-white p-8">
                <h3 className="text-2xl text-[#1A1A1B] mb-2 tracking-tight" style={{ fontWeight: 700 }}>
                  Why Get a Quote
                  <br />
                  <span className="opacity-40">From Us?</span>
                </h3>
                
                <div className="w-12 h-1 bg-[#FFD700] mb-8" />

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#003893]/10 rounded-full flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-[#003893]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-[#1A1A1B] mb-1" style={{ fontWeight: 600 }}>
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-[#1A1A1B] opacity-60 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#1A1A1B]/10">
                  <p className="text-sm text-[#1A1A1B] opacity-40 text-center">
                    All fields marked with <span className="text-[#DC143C]">*</span> are required
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
