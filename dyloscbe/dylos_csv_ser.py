#!/usr/bin/env python
import serial
import time
import gammu

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=60)
time.sleep(60)

logfile = open('DYLOS_log.csv', 'a')

while 1:
	line = ser.readline() 
	now = time.strftime("%Y-%m-%dT%H:%M:%S:00.000000+0530", time.localtime())
	a =  "%s,%s" % (now,line)
	#print a	
	logfile.write(a)
        logfile.flush()    
logfile.close()
ser.close()
time.sleep(180)
SMS = {
        'Class': 1,                            #SMS Class
        'Text': a,     #Message
        'SMSC': {'Location': 1},
        'Number': "+919488458674",              #The phone number
      }
gamu_sm = gammu.StateMachine()
gamu_sm.ReadConfig()              #Read the default config file (~/.gammurc)
gamu_sm.Init()                    #Connect to the phone   
gamu_sm.SendSMS(SMS)
