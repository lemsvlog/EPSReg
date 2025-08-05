
 // Prevent background scroll while modal is open
  document.body.style.overflow = 'hidden';
  document.getElementById('confirmEntryBtn').onclick = function() {
    document.getElementById('preEntryModal').style.display = 'none';
    document.body.style.overflow = '';
  };

  // // If you want ONCE per session only (uncomment below, comment above)
  // if (sessionStorage.getItem('practiceNoticeConfirmed')) {
  //   document.getElementById('preEntryModal').style.display = 'none';
  //   document.body.style.overflow = '';
  // }
  // document.getElementById('confirmEntryBtn').onclick = function() {
  //   document.getElementById('preEntryModal').style.display = 'none';
  //   document.body.style.overflow = '';
  //   sessionStorage.setItem('practiceNoticeConfirmed', 'yes');
  // };

    // Session-based Hit Counter logic
    if (typeof(Storage) !== "undefined") {
        let sessionHits = sessionStorage.getItem("sessionPageHits"); 
        if (sessionHits) {
            sessionHits = parseInt(sessionHits) + 1;
        } else {
            sessionHits = 1;
        }
        sessionStorage.setItem("sessionPageHits", sessionHits);

        const counterDisplayElement = document.getElementById("sessionHitCounterDisplay");
        if (counterDisplayElement) {
            // Format the number to 6 digits with leading zeros
            const formattedHits = String(sessionHits).padStart(7, '0');
            counterDisplayElement.textContent = formattedHits;
        }
    } else {
        // Fallback kung hindi suportado ang sessionStorage
        const counterDisplayElement = document.getElementById("sessionHitCounterDisplay");
        if (counterDisplayElement) {
            counterDisplayElement.textContent = "N/A"; 
            counterDisplayElement.parentNode.style.display = 'none'; 
        }
    }

 $(function() {
    // Province/City data for offline dropdown
    const provinceCities = {
  "Abra": ["Bangued","Boliney","Bucay","Bucloc","Daguioman","Danglas","Dolores","La Paz","Lacub","Lagangilang","Lagayan","Langiden","Licuan-Baay","Luba","Malibcong","Manabo","Peñarrubia","Pidigan","Pilar","Sallapadan","San Isidro","San Juan","San Quintin","Tayum","Tineg","Tubo","Villaviciosa"],
  "Agusan del Norte": ["Buenavista","Butuan City","Cabadbaran City","Carmen","Jabonga","Kitcharao","Las Nieves","Magallanes","Nasipit","Remedios T. Romualdez","Santiago","Tubay"],
  "Agusan del Sur": ["Bayugan City","Bunawan","Esperanza","La Paz","Loreto","Prosperidad","Rosario","San Francisco","San Luis","Santa Josefa","Sibagat","Talacogon","Trento","Veruela"],
  "Aklan": ["Altavas","Balete","Banga","Batan","Buruanga","Ibajay","Kalibo","Lezo","Libacao","Madalag","Makato","Malay","Malinao","Nabas","New Washington","Numancia","Tangalan"],
  "Albay": ["Bacacay","Camalig","Daraga","Guinobatan","Jovellar","Legazpi City","Libon","Ligao City","Malilipot","Malinao","Manito","Oas","Pio Duran","Polangui","Rapu-Rapu","Santo Domingo","Tabaco City","Tiwi"],
  "Antique": ["Anini-y","Barbaza","Belison","Bugasong","Caluya","Culasi","Hamtic","Laua-an","Libertad","Pandan","Patnongon","San Jose","San Remigio","Sebaste","Sibalom","Tibiao","Tobias Fornier","Valderrama"],
  "Apayao": ["Calanasan","Conner","Flora","Kabugao","Luna","Pudtol","Santa Marcela"],
  "Aurora": ["Baler","Casiguran","Dilasag","Dinalungan","Dingalan","Dipaculao","Maria Aurora","San Luis"],
  "Basilan": ["Akbar","Al-Barka","Hadji Mohammad Ajul","Hadji Muhtamad","Isabela City","Lamitan City","Lantawan","Maluso","Sumisip","Tabuan-Lasa","Tipo-Tipo","Tuburan","Ungkaya Pukan"],
  "Bataan": ["Abucay","Bagac","Balanga City","Dinalupihan","Hermosa","Limay","Mariveles","Morong","Orani","Orion","Pilar","Samal"],
  "Batanes": ["Basco","Itbayat","Ivana","Mahatao","Sabtang","Uyugan"],
  "Batangas": ["Agoncillo","Alitagtag","Balayan","Balete","Batangas City","Bauan","Calaca","Calatagan","Cuenca","Ibaan","Laurel","Lemery","Lian","Lipa City","Lobo","Mabini","Malvar","Mataasnakahoy","Nasugbu","Padre Garcia","Rosario","San Jose","San Juan","San Luis","San Nicolas","San Pascual","Santa Teresita","Santo Tomas City","Taal","Talisay","Tanauan City","Taysan","Tingloy","Tuy"],
  "Benguet": ["Atok","Bakun","Bokod","Buguias","Itogon","Kabayan","Kapangan","Kibungan","La Trinidad","Mankayan","Sablan","Tuba","Tublay"],
  "Biliran": ["Almeria","Biliran","Cabucgayan","Caibiran","Culaba","Kawayan","Maripipi","Naval"],
  "Bohol": ["Alicia","Anda","Antequera","Baclayon","Balilihan","Batuan","Bien Unido","Bilar","Buenavista","Calape","Candijay","Carmen","Catigbian","Clarin","Corella","Cortes","Dagohoy","Danao","Dauis","Dimiao","Duero","Garcia Hernandez","Getafe","Guindulman","Inabanga","Jagna","Jetafe","Lila","Loay","Loboc","Loon","Mabini","Maribojoc","Panglao","Pilar","Pres. Carlos P. Garcia (Pitogo)","Sagbayan","San Isidro","San Miguel","Sevilla","Sierra Bullones","Sikatuna","Tagbilaran City","Talibon","Trinidad","Tubigon","Ubay","Valencia"],
  "Bukidnon": ["Baungon","Cabanglasan","Damulog","Dangcagan","Don Carlos","Impasug-ong","Kadingilan","Kalilangan","Kibawe","Kitaotao","Lantapan","Libona","Malaybalay City","Malitbog","Manolo Fortich","Maramag","Pangantucan","Quezon","San Fernando","Sumilao","Talakag","Valencia City"],
  "Bulacan": ["Angat","Balagtas","Baliuag","Bocaue","Bulacan","Bustos","Calumpit","Doña Remedios Trinidad","Guiguinto","Hagonoy","Malolos City","Marilao","Meycauayan City","Norzagaray","Obando","Pandi","Paombong","Plaridel","Pulilan","San Ildefonso","San Jose del Monte City","San Miguel","San Rafael","Santa Maria"],
  "Cagayan": ["Abulug","Alcala","Allacapan","Amulung","Aparri","Baggao","Ballesteros","Buguey","Calayan","Camalaniugan","Claveria","Enrile","Gattaran","Gonzaga","Iguig","Lal-lo","Lasam","Pamplona","Peñablanca","Piat","Rizal","Sanchez-Mira","Santa Ana","Santa Praxedes","Santa Teresita","Santo Niño","Solana","Tuao","Tuguegarao City"],
  "Camarines Norte": ["Basud","Capalonga","Daet","Jose Panganiban","Labo","Mercedes","Paracale","San Lorenzo Ruiz","San Vicente","Santa Elena","Talisay","Vinzons"],
  "Camarines Sur": ["Baao","Balatan","Bato","Bombon","Buhi","Bula","Cabusao","Calabanga","Camaligan","Canaman","Caramoan","Del Gallego","Gainza","Garchitorena","Goa","Iriga City","Lagonoy","Libmanan","Lupi","Magarao","Milaor","Minalabac","Nabua","Naga City","Ocampo","Pamplona","Pasacao","Pili","Presentacion","Ragay","Sagñay","San Fernando","San Jose","Sipocot","Siruma","Tigaon","Tinambac"],
  "Camiguin": ["Catarman","Guinsiliban","Mahinog","Mambajao","Sagay"],
  "Capiz": ["Cuartero","Dao","Dumalag","Dumarao","Ivisan","Jamindan","Ma-ayon","Mambusao","Panay","Panitan","Pilar","Pontevedra","Pres. Roxas","Roxas City","Sapian","Sigma","Tapaz"],
  "Catanduanes": ["Bagamanoc","Baras","Bato","Caramoran","Gigmoto","Pandan","Panganiban","San Andres","San Miguel","Viga","Virac"],
  "Cavite": ["Alfonso","Amadeo","Bacoor City","Carmona","Cavite City","Dasmariñas City","General Emilio Aguinaldo","General Trias City","GMA","Imus City","Indang","Kawit","Magallanes","Maragondon","Mendez","Naic","Noveleta","Rosario","Silang","Tagaytay City","Tanza","Ternate","Trece Martires City"],
  "Cebu": ["Alcantara","Alcoy","Alegria","Aloguinsan","Argao","Asturias","Badian","Balamban","Bantayan","Barili","Bogo City","Boljoon","Borbon","Carcar City","Carmen","Catmon","Cebu City","Compostela","Consolacion","Cordova","Daanbantayan","Dalaguete","Danao City","Dumanjug","Ginatilan","Lapu-Lapu City","Liloan","Madridejos","Malabuyoc","Mandaue City","Medellin","Minglanilla","Moalboal","Naga City","Oslob","Pilar","Pinamungajan","Poro","Ronda","Samboan","San Fernando","San Francisco","San Remigio","Santa Fe","Santander","Sibonga","Sogod","Tabogon","Tabuelan","Talisay City","Toledo City","Tuburan","Tudela"],
  "Cotabato": ["Alamada","Aleosan","Antipas","Arakan","Banisilan","Carmen","Kabacan","Kidapawan City","Libungan","M'lang","Magpet","Makilala","Matalam","Midsayap","Pigcawayan","Pikit","President Roxas","Tulunan"],
  "Davao de Oro": ["Compostela","Laak","Mabini","Maco","Mahayag","Monkayo","Montevista","Nabunturan","New Bataan","Pantukan"],
  "Davao del Norte": ["Asuncion","Braulio E. Dujali","Carmen","Kapalong","New Corella","Panabo City","Samal City","San Isidro","Santo Tomas","Tagum City","Talaingod"],
  "Davao del Sur": ["Bansalan","Davao City","Digos City","Hagonoy","Kiblawan","Magsaysay","Malalag","Matanao","Padada","Santa Cruz","Sulop"],
  "Davao Occidental": ["Don Marcelino","Jose Abad Santos","Malita","Santa Maria","Sarangani"],
  "Davao Oriental": ["Baganga","Banaybanay","Boston","Caraga","Cateel","Governor Generoso","Lupon","Manay","Mati City","San Isidro","Tarragona"],
  "Dinagat Islands": ["Basilisa","Cagdianao","Dinagat","Libjo","Loreto","San Jose","Tubajon"],
  "Eastern Samar": ["Arteche","Balangiga","Balangkayan","Borongan City","Can-avid","Dolores","General MacArthur","Giporlos","Guiuan","Hernani","Jipapad","Lawaan","Llorente","Maslog","Maydolong","Mercedes","Oras","Quinapondan","Salcedo","San Julian","San Policarpo","Sulat","Taft"],
  "Guimaras": ["Buenavista","Jordan","Nueva Valencia","San Lorenzo","Sibunag"],
  "Ifugao": ["Aguinaldo","Alfonso Lista","Asipulo","Banaue","Hingyon","Hungduan","Kiangan","Lagawe","Lamut","Mayoyao","Tinoc"],
  "Ilocos Norte": ["Adams","Bacarra","Badoc","Bangui","Banna","Batac City","Burgos","Carasi","Currimao","Dingras","Dumalneg","Laoag City","Marcos","Nueva Era","Pagudpud","Paoay","Pasuquin","Piddig","Pinili","San Nicolas","Sarrat","Solsona","Vintar"],
  "Ilocos Sur": ["Alilem","Banayoyo","Bantay","Burgos","Cabugao","Candon City","Caoayan","Cervantes","Galimuyod","Gregorio del Pilar","Lidlidda","Magsingal","Nagbukel","Narvacan","Quirino","Salcedo","San Emilio","San Esteban","San Ildefonso","San Juan","San Vicente","Santa","Santa Catalina","Santa Cruz","Santa Lucia","Santa Maria","Santiago","Santo Domingo","Sigay","Sinait","Sugpon","Suyo","Tagudin","Vigan City"],
  "Iloilo": ["Ajuy","Alimodian","Anilao","Badiangan","Balasan","Banate","Barotac Nuevo","Barotac Viejo","Batad","Bingawan","Cabatuan","Calinog","Carles","Concepcion","Dingle","Duenas","Dumangas","Estancia","Guimbal","Igbaras","Iloilo City","Janiuay","Lambunao","Leganes","Lemery","Leon","Maasin","Miagao","Mina","New Lucena","Oton","Passi City","Pavia","Pototan","San Dionisio","San Enrique","San Joaquin","San Miguel","San Rafael","Santa Barbara","Sara","Tigbauan","Tubungan","Zarraga"],
  "Isabela": ["Alicia","Angadanan","Aurora","Benito Soliven","Burgos","Cabagan","Cabatuan","Cauayan City","Cordon","Delfin Albano","Dinapigue","Divilacan","Echague","Gamu","Ilagan City","Jones","Luna","Maconacon","Mallig","Naguilian","Palanan","Quezon","Quirino","Ramon","Reina Mercedes","Roxas","San Agustin","San Guillermo","San Isidro","San Manuel","San Mariano","San Mateo","San Pablo","Santa Maria","Santiago City","Santo Tomas","Tumauini"],
  "Kalinga": ["Balbalan","Lubuagan","Pasil","Pinukpuk","Rizal","Tabuk City","Tanudan","Tinglayan"],
  "La Union": ["Agoo","Aringay","Bacnotan","Bagulin","Balaoan","Bangar","Bauang","Burgos","Caba","Luna","Naguilian","Pugo","Rosario","San Fernando City","San Gabriel","San Juan","Santo Tomas","Santol","Sudipen","Tubao"],
  "Laguna": ["Alaminos","Bay","Biñan City","Cabuyao City","Calamba City","Calauan","Cavinti","Famy","Kalayaan","Liliw","Los Baños","Luisiana","Lumban","Mabitac","Magdalena","Majayjay","Nagcarlan","Paete","Pagsanjan","Pakil","Pangil","Pila","Rizal","San Pablo City","San Pedro City","Santa Cruz","Santa Maria","Santa Rosa City","Siniloan","Victoria"],
  "Lanao del Norte": ["Bacolod","Baloi","Baroy","Iligan City","Kapatagan","Kauswagan","Kolambugan","Lala","Linamon","Magsaysay","Maigo","Matungao","Munai","Nunungan","Pantao Ragat","Pantar","Poona Piagapo","Salvador","Sapad","Sultan Naga Dimaporo","Tagoloan","Tangcal","Tubod"],
  "Lanao del Sur": ["Amai Manabilang","Bacolod-Kalawi","Balabagan","Balindong","Bayang","Binidayan","Buadiposo-Buntong","Bubong","Butig","Calanogas","Ditsaan-Ramain","Ganassi","Kapai","Kapatagan","Lumba-Bayabao","Lumbaca-Unayan","Lumbatan","Lumbayanague","Madalum","Madamba","Maguing","Malabang","Marantao","Marawi City","Masiu","Masiu","Mulondo","Pagayawan","Piagapo","Poona Bayabao","Pualas","Saguiaran","Sultan Dumalondong","Tagoloan II","Tamparan","Taraka","Tubaran","Tugaya","Wao"],
  "Leyte": ["Abuyog","Alangalang","Albuera","Babatngon","Barugo","Bato","Baybay City","Burauen","Calubian","Capoocan","Carigara","Dagami","Dulag","Hilongos","Hindang","Inopacan","Isabel","Jaro","Javier","Julita","Kananga","La Paz","Leyte","MacArthur","Mahaplag","Matag-ob","Matalom","Mayorga","Merida","Ormoc City","Palo","Palompon","Pastrana","San Isidro","San Miguel","Santa Fe","Tabango","Tabontabon","Tacloban City","Tanauan","Tolosa","Tunga","Villaba"],
  "Maguindanao": ["Ampatuan","Barira","Buldon","Buluan","Cotabato City","Datu Abdullah Sangki","Datu Anggal Midtimbang","Datu Blah T. Sinsuat","Datu Hoffer Ampatuan","Datu Montawal","Datu Odin Sinsuat","Datu Paglas","Datu Piang","Datu Salibo","Datu Saudi-Ampatuan","Datu Unsay","Gen. S.K. Pendatun","Guindulungan","Kabuntalan","Mamasapano","Mangudadatu","Matanog","Northern Kabuntalan","Pagalungan","Paglat","Pandag","Parang","Rajah Buayan","Shariff Aguak","Shariff Saydona Mustapha","South Upi","Sultan Kudarat","Sultan Mastura","Sultan sa Barongis","Talayan","Talitay","Upi"],
  "Marinduque": ["Boac","Buenavista","Gasan","Mogpog","Santa Cruz","Torrijos"],
  "Masbate": ["Aroroy","Baleno","Balud","Batuan","Cataingan","Cawayan","Claveria","Dimasalang","Esperanza","Mandaon","Masbate City","Milagros","Mobo","Monreal","Palanas","Pio V. Corpuz","Placer","San Fernando","San Jacinto","San Pascual","Uson"],
  "Metro Manila": ["Caloocan","Las Piñas","Makati","Malabon","Mandaluyong","Manila","Marikina","Muntinlupa","Navotas","Parañaque","Pasay","Pasig","Pateros","Quezon City","San Juan","Taguig","Valenzuela"],
  "Misamis Occidental": ["Aloran","Baliangao","Bonifacio","Calamba","Clarin","Concepcion","Don Victoriano Chiongbian","Jimenez","Lopez Jaena","Oroquieta City","Ozamiz City","Panaon","Plaridel","Sapang Dalaga","Sinacaban","Tangub City","Tudela"],
  "Misamis Oriental": ["Alubijid","Balingasag","Balingoan","Binuangan","Cagayan de Oro City","Claveria","El Salvador City","Gingoog City","Gitagum","Initao","Jasaan","Kinoguitan","Lagonglong","Laguitas","Lugait","Magsaysay","Manticao","Medina","Naawan","Opol","Salay","Sugbongcogon","Tagoloan","Talisayan","Villanueva"],
  "Mountain Province": ["Barlig","Bauko","Besao","Bontoc","Sabangan","Sadanga","Sagada","Tadian"],
  "Negros Occidental": ["Bacolod City","Bago City","Binalbagan","Cadiz City","Calatrava","Candoni","Cauayan","Enrique B. Magalona","Escalante City","Himamaylan City","Hinigaran","Hinoba-an","Ilog","Isabela","Kabankalan City","La Carlota City","La Castellana","Manapla","Moises Padilla","Murcia","Pontevedra","Pulupandan","Sagay City","Salvador Benedicto","San Carlos City","San Enrique","Silay City","Sipalay City","Talisay City","Toboso","Valladolid","Victorias City"],
  "Negros Oriental": ["Amlan","Ayungon","Bacong","Bais City","Basay","Bayawan City","Bindoy","Canlaon City","Dauin","Dumaguete City","Guihulngan City","Jimalalud","La Libertad","Mabinay","Manjuyod","Pamplona","San Jose","Santa Catalina","Siaton","Sibulan","Tanjay City","Tayasan","Valencia","Vallehermoso","Zamboanguita"],
  "Northern Samar": ["Allen","Biri","Bobon","Capul","Catarman","Catubig","Gamay","Laoang","Lapinig","Las Navas","Lavezares","Lope de Vega","Mapanas","Mondragon","Palapag","Pambujan","Rosario","San Antonio","San Isidro","San Jose","San Roque","San Vicente","Silvino Lobos","Victoria"],
  "Nueva Ecija": ["Aliaga","Bongabon","Cabanatuan City","Cabiao","Carranglan","Cuyapo","Gabaldon","Gapan City","General Mamerto Natividad","General Tinio","Guimba","Jaen","Laur","Licab","Llanera","Lupao","Muñoz City","Nampicuan","Palayan City","Pantabangan","Peñaranda","Quezon","Rizal","San Antonio","San Isidro","San Jose City","San Leonardo","Santa Rosa","Santo Domingo","Science City of Muñoz","Talavera","Talugtug","Zaragoza"],
  "Nueva Vizcaya": ["Alfonso Castañeda","Ambaguio","Aritao","Bagabag","Bambang","Bayombong","Diadi","Dupax del Norte","Dupax del Sur","Kasibu","Kayapa","Quezon","Santa Fe","Solano","Villaverde"],
  "Occidental Mindoro": ["Abra de Ilog","Calintaan","Looc","Lubang","Magsaysay","Mamburao","Paluan","Rizal","Sablayan","San Jose","Santa Cruz"],
  "Oriental Mindoro": ["Baco","Bansud","Bongabong","Bulalacao","Calapan City","Gloria","Mansalay","Naujan","Pinamalayan","Pola","Puerto Galera","Roxas","San Teodoro","Socorro","Victoria"],
  "Palawan": ["Aborlan","Agutaya","Araceli","Balabac","Bataraza","Brooke's Point","Busuanga","Cagayancillo","Coron","Culion","Cuyo","Dumaran","El Nido","Kalayaan","Linapacan","Magsaysay","Narra","Puerto Princesa City","Quezon","Rizal","Roxas","San Vicente","Sofronio Española","Taytay"],
  "Pampanga": ["Angeles City","Apalit","Arayat","Bacolor","Candaba","Floridablanca","Guagua","Lubao","Mabalacat City","Macabebe","Magalang","Masantol","Mexico","Minalin","Porac","San Fernando City","San Luis","San Simon","Santa Ana","Santa Rita","Santo Tomas","Sasmuan"],
  "Pangasinan": ["Agno","Aguilar","Alaminos City","Alcala","Anda","Asingan","Balungao","Bani","Basista","Bautista","Bayambang","Binalonan","Binmaley","Bolinao","Bugallon","Burgos","Calasiao","Dagupan City","Dasol","Infanta","Labrador","Laoac","Lingayen","Mabini","Malasiqui","Manaoag","Mangaldan","Mangatarem","Mapandan","Natividad","Pozorrubio","Rosales","San Carlos City","San Fabian","San Jacinto","San Manuel","San Nicolas","San Quintin","Santa Barbara","Santa Maria","Santo Tomas","Sison","Sual","Tayug","Umingan","Urbiztondo","Urdaneta City","Villasis"],
  "Quezon": ["Agdangan","Alabat","Atimonan","Buenavista","Burdeos","Calauag","Candelaria","Catanauan","Dolores","General Luna","General Nakar","Guinayangan","Gumaca","Infanta","Jomalig","Lopez","Lucban","Lucena City","Macalelon","Mauban","Mulanay","Padre Burgos","Pagbilao","Panukulan","Patnanungan","Perez","Pitogo","Plaridel","Polillo","Quezon","Real","Sampaloc","San Andres","San Antonio","San Francisco","San Narciso","Sariaya","Tagkawayan","Tayabas City","Tiaong","Unisan"],
  "Quirino": ["Aglipay","Cabarroguis","Diffun","Maddela","Nagtipunan","Saguday"],
  "Rizal": ["Angono","Antipolo City","Baras","Binangonan","Cainta","Cardona","Jala-Jala","Morong","Pililla","Rodriguez (Montalban)","San Mateo","Tanay","Taytay","Teresa"],
  "Romblon": ["Alcantara","Banton","Cajidiocan","Calatrava","Concepcion","Corcuera","Ferrol","Looc","Magdiwang","Odiongan","Romblon","San Agustin","San Andres","San Fernando","San Jose","Santa Fe","Santa Maria"],
  "Samar": ["Almagro","Basey","Calbayog City","Calbiga","Catbalogan City","Daram","Gandara","Hinabangan","Jiabong","Marabut","Matuguinao","Motiong","Pagsanghan","Paranas","Pinabacdao","San Jorge","San Jose de Buan","San Sebastian","Santa Margarita","Santa Rita","Santo Niño","Talalora","Tarangnan","Villareal","Zumarraga"],
  "Sarangani": ["Alabel","Glan","Kiamba","Maasim","Maitum","Malapatan","Malungon"],
  "Siquijor": ["Enrique Villanueva","Larena","Lazi","Maria","San Juan","Siquijor"],
  "Sorsogon": ["Barcelona","Bulan","Bulusan","Casiguran","Castilla","Donsol","Gubat","Irosin","Juban","Magallanes","Matnog","Pilar","Prieto Diaz","Santa Magdalena","Sorsogon City"],
  "South Cotabato": ["Banga","General Santos City","Koronadal City","Lake Sebu","Norala","Polomolok","Santo Niño","Surallah","Tampakan","Tantangan","T'boli","Tupi"],
  "Southern Leyte": ["Anahawan","Bontoc","Hinunangan","Hinundayan","Libagon","Liloan","Limasawa","Maasin City","Macrohon","Malitbog","Padre Burgos","Pintuyan","Saint Bernard","San Francisco","San Juan","San Ricardo","Silago","Sogod","Tomas Oppus"],
  "Sultan Kudarat": ["Bagumbayan","Columbio","Esperanza","Isulan","Kalamansig","Lambayong","Lebak","Lutayan","Palimbang","President Quirino","Senator Ninoy Aquino","Tacurong City"],
  "Sulu": ["Banguingui","Hadji Panglima Tahil","Indanan","Jolo","Kalingalan Caluang","Lugus","Luuk","Maimbung","Old Panamao","Omar","Pandami","Panglima Estino","Pangutaran","Parang","Pata","Patikul","Siasi","Talipao","Tapul","Tongkil"],
  "Surigao del Norte": ["Alegria","Bacuag","Burgos","Claver","Dapa","Del Carmen","General Luna","Gigaquit","Mainit","Malimono","Pilar","Placer","San Benito","San Francisco","San Isidro","Santa Monica","Sison","Socorro","Surigao City","Tagana-an","Tubod"],
  "Surigao del Sur": ["Barobo","Bayabas","Bislig City","Cagwait","Cantilan","Carmen","Carrascal","Cortes","Hinatuan","Lanuza","Lianga","Lingig","Madrid","Marihatag","San Agustin","San Miguel","Tagbina","Tago","Tandag City"],
  "Tarlac": ["Anao","Bamban","Camiling","Capas","Concepcion","Gerona","La Paz","Mayantoc","Moncada","Paniqui","Pura","Ramos","San Clemente","San Jose","San Manuel","Santa Ignacia","Tarlac City","Victoria"],
  "Tawi-Tawi": ["Bongao","Languyan","Mapun","Panglima Sugala","Sapa-Sapa","Sibutu","Simunul","Sitangkai","South Ubian","Tandubas","Turtle Islands"],
  "Zambales": ["Botolan","Cabangan","Candelaria","Castillejos","Iba","Masinloc","Olongapo City","Palauig","San Antonio","San Felipe","San Marcelino","San Narciso","Santa Cruz","Subic"],
  "Zamboanga del Norte": ["Bacungan (Leon T. Postigo)","Baliguian","Dapitan City","Dipolog City","Godod","Gutalac","Jose Dalman","Kalawit","Katipunan","La Libertad","Labason","Liloy","Manukan","Mutia","Piñan","Polanco","Pres. Manuel A. Roxas","Rizal","Salug","Sergio Osmeña Sr.","Siayan","Sibuco","Sibutad","Sindangan","Siocon","Sirawai","Tampilisan"],
  "Zamboanga del Sur": ["Aurora","Bayog","Dimataling","Dinas","Dumalinao","Dumingag","Guipos","Josefina","Kumalarang","Labangan","Lakewood","Lapuyan","Mahayag","Margosatubig","Midsalip","Molave","Pagadian City","Pitogo","Ramon Magsaysay","San Miguel","San Pablo","Sominot","Tabina","Tambulig","Tigbao","Tukuran","Vincenzo A. Sagun","Zamboanga City"],
  "Zamboanga Sibugay": ["Alicia","Buug","Diplahan","Imelda","Ipil","Kabasalan","Mabuhay","Malangas","Naga","Olutanga","Payao","Roseller Lim","Siay","Talusan","Titay","Tungawan"]
};
    // Populate province dropdown
    let $province = $('#province');
    let $city = $('#city');
    $province.append(
      Object.keys(provinceCities).sort().map(p => `<option value="${p}">${p}</option>`)
    );
    $province.on('change', function() {
      let cities = provinceCities[this.value] || [];
      $city.html('<option value="">Select a city</option>' +
        cities.map(c => `<option value="${c}">${c}</option>`).join('')
      );
    });
    // Show password toggle
    $('#show_password').on('change', function() {
      let type = this.checked ? 'text' : 'password';
      $('#password, #repassword').attr('type', type);
    });
    // ID photo upload preview and size check (offline)
    $('#appPhoto').on('change', function() {
      const file = this.files[0];
      if (!file) return;
      let reader = new FileReader();
      reader.onload = function(e) {
        $('#idphoto_preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
      // size check
      let size = (file.size / 1024).toFixed(2);
      let msg = '';
      if (size > 13.312) {
        msg = `<span class='p-2 bg-danger text-white'>WARNING: file size ${size} Kb is too large.</span>`;
      } else if (size < 9.216) {
        msg = `<span class='p-2 bg-danger text-white'>WARNING: file size ${size} Kb is too small.</span>`;
      }
      $('#app_size').html(msg);
    });
    // Passport photo upload preview and size check (offline)
    $('#ppPhoto').on('change', function() {
      const file = this.files[0];
      if (!file) return;
      let reader = new FileReader();
      reader.onload = function(e) {
        $('#passport_preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
      // size check
      let size = (file.size / 1024).toFixed(2);
      let msg = '';
      if (size > 100) {
        msg = `<span class='p-2 bg-danger text-white'>WARNING: file size ${size} Kb is too large.</span>`;
      } else if (size < 50) {
        msg = `<span class='p-2 bg-danger text-white'>WARNING: file size ${size} Kb is too small.</span>`;
      }
      $('#passport_size').html(msg);
    });
    // Allow clicking image to upload (only attach once)
    $('#idphoto_preview').off('click').on('click', function() {
      $('#appPhoto').click();
    });
    $('#passport_preview').off('click').on('click', function() {
      $('#ppPhoto').click();
    });
    // SUBMIT HANDLER for REGISTRATION
    $('#EPSforms').on('submit', function(e) {
      e.preventDefault(); // Prevent default form submission

      // --- START VALIDATION ---

      // 1. Birthday: Only applicants 18 to 38 years old are allowed.
      const bdateInput = $('#bdate').val();
      if (bdateInput) {
        const bdate = new Date(bdateInput);
        const today = new Date();
        let age = today.getFullYear() - bdate.getFullYear();
        const m = today.getMonth() - bdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
            age--; // Adjust age if birthday hasn't occurred yet this year
        }

        if (age < 18 || age > 38) {
          alert('Registration not allowed: Only applicants 18 to 38 years old are allowed.');
          return false;
        }
      } else {
        alert('Please enter your Birthdate.');
        return false;
      }

      // 2. Passport Validity: Passport must have at least 1 year of validity remaining from the current date.
      const passportValidityInput = $('#passport_validity').val();
      if (passportValidityInput) {
        const passportValidityDate = new Date(passportValidityInput);
        const today = new Date();
        const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

        if (passportValidityDate < oneYearFromNow) {
          alert('Registration not allowed: Passport must have at least 1 year of validity remaining from the current date.');
          return false;
        }
      } else {
        alert('Please enter Passport Validity date.');
        return false;
      }

      // 3. Password & Re-type Password: Must match.
      const password = $('#password').val();
      const repassword = $('#repassword').val();
      if (password !== repassword) {
        alert('Registration not allowed: Password and Re-type Password must match.');
        return false;
      }

      // 4. Mobile Number: Must be exactly 11 digits and contain only numbers.
      const mobileNumber = $('#mobile').val();
      if (!/^\d{11}$/.test(mobileNumber)) {
        alert('Registration not allowed: Mobile Number must be exactly 11 digits and contain only numbers.');
        return false;
      }

      // --- END VALIDATION ---

      // If all validations pass, proceed with data saving and redirection
      // Gather info
  let suffix = $('#suffix').val().trim();
let fullname = fname + ' ' + mname + ' ' + lname;
if (suffix) fullname += ' ' + suffix; // idikit kung meron


      // -- START: Application Number generation (global counter) --
      let successCount = localStorage.getItem('successCount');
      if (!successCount) {
        successCount = 1;
      } else {
        successCount = parseInt(successCount) + 1;
      }
      localStorage.setItem('successCount', successCount);
      let idStr = String(successCount).padStart(6, '0'); // Always 6 digits for app number
      // -- END: Application Number generation --

      // --- START: Save all registration data to reg_list in localStorage ---
      let regList = JSON.parse(localStorage.getItem('reg_list') || '[]');
      let newRegistration = {
          id: idStr, // Use the generated application number as unique ID
          fullname: fullname,
          sex: $('input[name="sex"]:checked').val(),
          bdate: $('#bdate').val(),
          passport: $('#passport').val(),
          passport_validity: $('#passport_validity').val(),
          email: $('#email').val(),
          mobile: $('#mobile').val(),
          province: $('#province').val(),
          city: $('#city').val(),
          password: $('#password').val() // Storing for practice, remind user about security
      };
      regList.push(newRegistration);
      localStorage.setItem('reg_list', JSON.stringify(regList));
      // --- END: Save all registration data ---

      // Save most recent data for success.html (redundant with reg_list but for previous success.html logic)
      localStorage.setItem('reg_fullname', fullname);
      localStorage.setItem('reg_email', email);
      localStorage.setItem('reg_id', idStr);
      
      // Redirect to success page
      window.location.href = 'success.html';
    });
  });

  // Auto-uppercase for all input[type="text"].uppercase class
  $(function(){
    $(document).on('input', 'input[type="text"].uppercase', function() {
      this.value = this.value.toUpperCase();
    });
    $(document).on('change', 'select.uppercase', function() {
      $(this).find('option').each(function() {
        $(this).text($(this).text().toUpperCase());
      });
    });

    // Passport Number Validation with Warning Message
    $('#passport').on('input', function() {
        const passportInput = $(this);
        const passportValue = passportInput.val().trim();
        const passportLength = passportValue.length;
        let warningMessage = '';

        // Check if length exceeds 9
        if (passportLength > 9) {
            warningMessage = 'Passport Number cannot exceed 9 digits.';
            passportInput.val(passportValue.substring(0, 9)); // Truncate if too long
        } else if (passportLength < 9) {
            warningMessage = 'Passport Number must be 9 digits.';
        }
        
        // Display warning message dynamically
        let $warningSpan = passportInput.next('.passport-warning');
        if ($warningSpan.length === 0) {
            $warningSpan = $('<span>').addClass('passport-warning text-danger d-block mt-1').insertAfter(passportInput);
        }
        $warningSpan.text(warningMessage);
    });

    // Mobile Number Validation with maxlength
    // The HTML maxlength handles this visually, but JS confirms on submit.
    $('#mobile').attr('maxlength', '11');

  });


  // Read data from localStorage
const lname = document.getElementById('lname').value.trim();
const fname = document.getElementById('fname').value.trim();
const mname = document.getElementById('mname').value.trim();
const suffix = document.getElementById('suffix').value.trim();

  // Remove leading zeros for display
  const numDisplay = Number(idnum).toString();

  // Function to get the ordinal suffix (th, st, nd, rd)
 function getOrdinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}


  const ordinalSuffix = getOrdinal(Number(idnum));

  document.getElementById('successDetail').innerHTML =
    `<div style="text-align:center; margin-bottom:3px;">
      
      <span style="font-size:0.98em; color:#444; display:block; font-weight:500; margin-top:2px;">
        You are the <span class="ord-number" style="color:#99a340;">${numDisplay}<span class="th-highlight" style="color:#99a340;">${ordinalSuffix}</span></span> person successfully registered for the <span class="highlight">EPS-TOPIK</span>.
      </span><br>
    </div>
    <div style="margin-top:6px;">
      <b>Full Name:</b> <span style="color:#218de7;" class="highlight">${fullname}</span><br>
      <b>Email:</b> <span style="color:#218de7;" class="highlight">${email}</span><br>
      <b>Application No.:</b> <span style="color:#218de7;" class="highlight">${idnum}</span><br>
    </div>`;

