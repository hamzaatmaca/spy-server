from geopy.geocoders import Nominatim
import sys
import json


arg1 = sys.argv[1]  
arr = json.loads(arg1) 

def cityTransform(param):
   
    latitude = param["latitude"]
    longitude = param["longitude"]

    geolocator = Nominatim(user_agent="GetLoc")
    location = geolocator.reverse(f"{latitude}, {longitude}", language='tr')  
    address = location.raw['address']
    city = address.get('city') 
   
    print(city+",")

for data in arr:
    cityTransform(data)




   
    

    
   





