// JavaScript Document
// wird für die Seite stat.htm benötigt
//
// Eigenschaft "disko": 
//					0 = kontinuierliche Messung (Bild: Diagramm)
//					1 = diskontinuierliche Messung (Bild: Reagenzgläser)
//					2 = zur Zeit [noch] keine Messwerte (kein Bild)
// *************************************************************************
var stationen = new Object();


stationen.ANMI = new Object();
stationen.ANMI.kuerzel = "ANMI";
stationen.ANMI.type = "AWS";
stationen.ANMI.name = "Anamalai";
stationen.ANMI.plz = "45325";
stationen.ANMI.longitude = 76.93829896612112;
stationen.ANMI.latitude = 10.58275739368259;
stationen.ANMI.altitude = "257m";
stationen.ANMI.address = "Anamalai";
stationen.ANMI.disko = 0;


stationen.ANUR = new Object();
stationen.ANUR.kuerzel = "ANUR";
stationen.ANUR.type = "AWS";
stationen.ANUR.name = "Annur";
stationen.ANUR.plz = "53117";
stationen.ANUR.longitude = 77.10512760998314;
stationen.ANUR.latitude = 11.23393200691487;
stationen.ANUR.altitude = "380m";
stationen.ANUR.address = "Annur";
stationen.ANUR.disko = 0;


stationen.CART = new Object();
stationen.CART.kuerzel = "CART";
stationen.CART.type = "AWS";
stationen.CART.name = "Coimbatore Airport";
stationen.CART.plz = "33615";
stationen.CART.longitude = 77.03393701472285
stationen.CART.latitude = 11.03074973240749;
stationen.CART.altitude = "324m";
stationen.CART.address = "Coimbatore Airport";
stationen.CART.disko = 0;


stationen.KNKU = new Object();
stationen.KNKU.kuerzel = "KNKU";
stationen.KNKU.type = "AWS";
stationen.KNKU.name = "Kinathukadavu";
stationen.KNKU.plz = "33615";
stationen.KNKU.longitude = 77.01666651663963;
stationen.KNKU.latitude = 10.81667057188987;
stationen.KNKU.altitude = "324m";
stationen.KNKU.address = "Kinathukadavu";
stationen.KNKU.disko = 0;


stationen.KRMI = new Object();
stationen.KRMI.kuerzel = "KRMI";
stationen.KRMI.type = "AWS";
stationen.KRMI.name = "Karamadai";
stationen.KRMI.plz = "44793";
stationen.KRMI.longitude = 76.95944399949092;
stationen.KRMI.latitude = 11.23972199971095;
stationen.KRMI.altitude = "387m";
stationen.KRMI.address = "Karamadai";
stationen.KRMI.disko = 0;



stationen.MDKI = new Object();
stationen.MDKI.kuerzel = "MDKI";
stationen.MDKI.type = "AWS";
stationen.MDKI.name = "Madukkarai";
stationen.MDKI.plz = "33607";
stationen.MDKI.longitude = 76.95299;
stationen.MDKI.latitude = 10.91289;
stationen.MDKI.altitude = "352m";
stationen.MDKI.address = "Madukkarai";
stationen.MDKI.disko = 0;



stationen.PNKP = new Object();
stationen.PNKP.kuerzel = "PNKP";
stationen.PNKP.type = "AWS";
stationen.PNKP.name = "Periyanayakkanpalayam";
stationen.PNKP.plz = "52070";
stationen.PNKP.longitude = 76.94113;
stationen.PNKP.latitude = 11.15037;
stationen.PNKP.altitude = "429m";
stationen.PNKP.address = "Periyanayakkanpalayam";
stationen.PNKP.disko = 0;

stationen.POLA = new Object();
stationen.POLA.kuerzel = "POLA";
stationen.POLA.type = "AWS";
stationen.POLA.name = "Pollachi (North)";
stationen.POLA.plz = "52064";
stationen.POLA.longitude = 77.01066;
stationen.POLA.latitude = 10.65728;
stationen.PNKP.altitude = "278m";
stationen.POLA.address = "Pollachi (North)";
stationen.POLA.disko = 0;


stationen.POLS = new Object();
stationen.POLS.kuerzel = "POLS";
stationen.POLS.type = "AWS";
stationen.POLS.name = "Pollachi (South)";
stationen.POLS.plz = "44145";
stationen.POLS.longitude = 77.0157268069908;
stationen.POLS.latitude = 10.66051295308319;
stationen.POLS.altitude = "266m";
stationen.POLS.address = "Pollachi (South)";
stationen.POLS.disko = 0;



stationen.SRCM = new Object();
stationen.SRCM.kuerzel = "SRCM";
stationen.SRCM.type = "AWS";
stationen.SRCM.name = "Sarcarsamakulam";
stationen.SRCM.plz = "46236";
stationen.SRCM.longitude = 77.02246966357929;
stationen.SRCM.latitude = 11.14116410926101;
stationen.SRCM.altitude = "396m";
stationen.SRCM.address = "Sarcarsamakulam";
stationen.SRCM.disko = 0;

stationen.STPT = new Object();
stationen.STPT.kuerzel = "STPT";
stationen.STPT.type = "village";
stationen.STPT.name = "Sultanpet";
stationen.STPT.plz = "46238";
stationen.STPT.longitude = 77.19739676235839;
stationen.STPT.latitude = 10.87713988868933;
stationen.STPT.altitude = "388m";
stationen.STPT.address = "Sultanpet";
stationen.STPT.disko = 0;

stationen.SULR = new Object();
stationen.SULR.kuerzel = "SULR";
stationen.SULR.type = "AWS";
stationen.SULR.name = "Sulur";
stationen.SULR.plz = "45711";
stationen.SULR.longitude = 77.12573200088909;
stationen.SULR.latitude = 11.02269999870223;
stationen.SULR.altitude = "375m";
stationen.SULR.address = "Sulur";
stationen.SULR.disko = 0;



stationen.THMR = new Object();
stationen.THMR.kuerzel = "THMR";
stationen.THMR.type = "AWS";
stationen.THMR.name = "Thondamuthur";
stationen.THMR.plz = "33615";
stationen.THMR.longitude = 76.87915953408303;
stationen.THMR.latitude = 10.96043915074323;
stationen.THMR.altitude = "443m";
stationen.THMR.address = "Thondamuthur";
stationen.THMR.disko = 0;



stationen.TNAU = new Object();
stationen.TNAU.kuerzel = "TNAU";
stationen.TNAU.type = "AWS";
stationen.TNAU.name = "TNAU";
stationen.TNAU.plz = "44139";
stationen.TNAU.longitude = 76.93285501513489;
stationen.TNAU.latitude = 11.01327712985975;
stationen.TNAU.altitude = "433m";
stationen.TNAU.address = "TNAU";
stationen.TNAU.disko = 1;
