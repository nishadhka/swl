import urllib2
import json
import csv
from datetime import date
from dateutil.rrule import rrule, DAILY

outfile_path='history0.csv'
writer = csv.writer(open(outfile_path, 'w'))
headers = ['TimeIST','TemperatureC','Dew PointC','Humidity','Wind SpeedKm/h','Gust SpeedKm/h','Wind DirectionDe','Wind Direction','VisibilityKm','Sea Level PressurehPa','Events','Heatindex','Precipitationmm','Conditions']
writer.writerow(headers)


a = date(2013, 8, 1)
b = date(2013, 8, 2)

dtm = []
for dt in rrule(DAILY, dtstart=a, until=b):
#    print dt.strftime("%Y%m%d")
    dtm.append(dt.strftime("%Y%m%d"))

dtl = []
for x in (dtm):
    shortURL = 'http://api.wunderground.com/api/YOURAPI/history_'+str(x)+'/q/India/Coimbatore.json'
    output = urllib2.urlopen(shortURL)
#    print output.url
    dtl.append(output.url)
    
#print dtl
dtd = []
for url in (dtl):
    req = urllib2.Request(url)
    opener = urllib2.build_opener()
    f = opener.open(req)
    data = json.load(f)
#    print data
    dtd.append(data)

for d in (dtd):
  for history in d['history']['observations']:
      if d != history:
           row = []
       	   datewu = history['date']['year']+'-'+history['date']['mon']+'-'+history['date']['mday']+'T'+history['date']['hour']+':'+history['date']['min']+':00.000000+0530'    
           row.append(str(datewu))
           row.append(str(history['tempm']))
           row.append(str(history['dewptm']))
           row.append(str(history['hum']))
           row.append(str(history['wspdm']))
           row.append(str(history['wgustm']))
           row.append(str(history['wdird']))
           row.append(str(history['wdire']))
           row.append(str(history['vism']))
           row.append(str(history['pressurem']))
           row.append(str(history['windchillm']))
           row.append(str(history['heatindexm']))
           row.append(str(history['precipm']))
           row.append(str(history['conds']))
           writer.writerow(row)


#print data

