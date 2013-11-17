#**for Madukkarai **
import pandas
# install pandas through zip folder download unzip and run insatall command, it ask for cynogen, donwload and install that also
 df = pa.read_csv('/home/swl-sacon-dst/Documents/GISE_2013/LAB/SWE/tnau-csvfile/CBE_TNAU.csv')

#for filtering only madukkarai

df_MDKI = df[df['Station']== 'Madukkarai']

#for removing duplicates

df_MDKI_DR = df_MDKI.drop_duplicates('Time')

#to set index

dMDI = df_MDKI_DR.set_index(['Time'])

#to select particular columns

dMDI_F= pa.DataFrame(dMDI,columns=['AirTemp', 'RelativeHum', 'WindSpeed', 'WindDirection', 'SoilMois', 'SoilTemp', 'Rainfall', 'SolarRad', 'AtmPressure', 'LeafWetness'])

#for make time formate converiosn
dMDI_DT= pa.to_datetime(dMDI_F['Time'], format='%d-%m-%Y %H:%M')

#to convert the whole column

dMDI_F['Time'] =dMDI_DT.apply(lambda x: x.strftime('%Y-%m-%dT%H:%M:%S.000000+0530'))

#to set Time as index

dMDI_F.set_index(['Time'])

#to convert the column heading

dMDI_FI_R_C.reset_index(inplace = True)

dMDI_FI_R_C = dMDI_FI_R.rename(columns={'Time':'urn:ogc:def:parameter:x-istsos:1.0:time:iso8601','AirTemp':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:air:temperature','RelativeHum':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:relative:humidity','WindSpeed':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:wind:speed','WindDirection':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:wind:direction','SoilMois':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:soil:moisture','SoilTemp':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:soil:temperature','Rainfall':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:rainfall','SolarRad':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:solar:radiation','AtmPressure':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:atmospheric:pressure','LeafWetness':'urn:ogc:def:parameter:x-istsos:1.0:tnau:aws:leaf:wetness'})

#reset the index

dMDI_FI_R_CR3 = dMDI_FI_R_CR_2.set_index(['urn:ogc:def:parameter:x-istsos:1.0:time:iso8601'])

#to save as csv file
dMDI_FI_R_CR3.to_csv('/home/swl-sacon-dst/Documents/GISE_2013/LAB/SWE/tnau-csvfile/DF_ND.csv')
