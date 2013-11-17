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


#output = subprocess.check_output(["./Adafruit_DHT", "11", "4"]);
#matches1 = re.search("Temp =\s+([0-9.]+)", output)
#if (not matches1):
#   time.sleep(3)
#temp = float(matches1.group(1))  
#print output
#print temp


while(True):
   output = subprocess.check_output(["./Adafruit_DHT", "11", "4"]);
   matches = re.search("Temp =\s+([0-9.]+)", output)
   if (not matches):
         time.sleep(5)
         continue
   temp = float(matches.group(1))
   matches2 = re.search("Hum =\s+([0-9.]+)", output)
   if (not matches):
         time.sleep(5)
         continue
   humidity = float(matches.group(1))
   #HmTemp = temp+humidity
#   return HumTemp
#   return output


print output
print temp
print humidity
