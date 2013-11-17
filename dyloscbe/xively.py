#!/usr/bin/env python
from __future__ import division
import time
import os
import eeml
import sys
import syslog
import json
import serial
import subprocess
import re

a = 0.02832
ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=60)
def getCPUtemperature():
    res = os.popen('vcgencmd measure_temp').readline()
    return(res.replace("temp=","").replace("'C\n",""))

def getDiskSpace():
    p = os.popen("df -h /")
    i = 0
    while 1:
        i = i +1
        line = p.readline()
        if i==2:
            return(line.split()[1:5])

def getRAMinfo():
    p = os.popen('free')
    i = 0
    while 1:
        i = i + 1
        line = p.readline()
        if i==2:
            return(line.split()[1:4])

var = 1
while var ==1:
   output = subprocess.check_output(["./Adafruit_DHT", "11", "4"]);
   matches = re.search("Temp =\s+([0-9.]+)", output)
   if (not matches):
         time.sleep(3)
         continue
   temp = float(matches.group(1))
   matches = re.search("Hum =\s+([0-9.]+)", output)
   if (not matches):
         time.sleep(3)
         continue
   humidity = float(matches.group(1))
   break  

def dylos_ser():
     dylos = ser.readline() 
     return dylos


API_KEY = 'APIKEY'
FEED = FEEDNUM
API_URL = '/v2/feeds/{feednum}.xml'.format(feednum = FEED)

CPU_temp = getCPUtemperature()
DISK_stats = getDiskSpace()
DISK_total = DISK_stats[0]
DISK_free  = DISK_stats[1]
DISK_perc  = DISK_stats[3]
RAM_stats = getRAMinfo()
RAM_total = round(int(RAM_stats[0]) / 1000,1)
RAM_used  = round(int(RAM_stats[1]) / 1000,1)
RAM_free  = round(int(RAM_stats[2]) / 1000,1)
dylos_red = dylos_ser()
dylos_red1 = dylos_red.split(",")
dylos_red11 = dylos_red1[0]
dylos_red22 = dylos_red1[1]
dylos_05l =float(dylos_red11) / a
dylos_25l =float(dylos_red22) / a
dylos_05ls = str(round(dylos_25l))
dylos_25ls = str(round(dylos_05l))
tempS = str(temp)
HumS = str(humidity)

# open up your feed
pac = eeml.Pachube(API_URL, API_KEY)

#compile dataunit=eeml.NoOfPm3())])

pac.update([eeml.Data("CPU_Temperature", CPU_temp, unit=eeml.Celsius())])
pac.update([eeml.Data("Disk_free", DISK_free, unit=eeml.Celsius())])
pac.update([eeml.Data("RAM__Used", RAM_used, unit=eeml.Celsius())])
pac.update([eeml.Data("RAM_Free", RAM_free, unit=eeml.Celsius())])
pac.update([eeml.Data("Dylos_2.5l", dylos_05ls, unit=eeml.NoOfPm3())])
pac.update([eeml.Data("Dylos_0.5l", dylos_25ls, unit=eeml.NoOfPm3())])
pac.update([eeml.Data("Humidity", HumS, unit=eeml.RH())])
pac.update([eeml.Data("Temperature", tempS, unit=eeml.Celsius())])

#print dylos_red
#print dylos_red1
print dylos_25ls
print dylos_05ls
print dylos_red11
print dylos_red22
print humidity
print temp
# send data to cosm
pac.put()


