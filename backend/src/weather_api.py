import aiohttp
import json
import logging
from datetime import datetime

logger = logging.getLogger("weather_api")

async def fetch_district_alert(district_name: str) -> str:
    """
    Fetches real-time weather data for a district and generates a disaster/flood alert status.
    Uses Open-Meteo Geocoding and Forecast APIs (Live Data Source).
    """
    try:
        async with aiohttp.ClientSession() as session:
            # Step 1: Geocoding (Get Lat/Lon for the district)
            geocode_url = f"https://geocoding-api.open-meteo.com/v1/search?name={district_name}&count=1"
            async with session.get(geocode_url, timeout=5) as resp:
                if resp.status != 200:
                    return json.dumps({"status": "error", "message": "Geocoding API unreachable."})
                
                geo_data = await resp.json()
                if not geo_data.get("results"):
                    return json.dumps({"status": "error", "message": f"Could not find coordinates for district: {district_name}"})
                
                lat = geo_data["results"][0]["latitude"]
                lon = geo_data["results"][0]["longitude"]
                resolved_name = geo_data["results"][0]["name"]

            # Step 2: Fetch Current Weather & Precipitation & Forecast
            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,precipitation,wind_speed_10m&hourly=precipitation,wind_speed_10m&forecast_hours=3&timezone=auto"
            
            async with session.get(weather_url, timeout=5) as resp:
                if resp.status != 200:
                    return json.dumps({"status": "error", "message": "Weather Forecast API unreachable."})
                
                weather_data = await resp.json()
                current = weather_data.get("current", {})
                hourly = weather_data.get("hourly", {})
                
                precipitation = current.get("precipitation", 0.0)
                wind_speed = current.get("wind_speed_10m", 0.0)

                # Extract 2-hour forecast (index 1 and 2, since index 0 is current hour)
                forecast = "No significant rain expected."
                if hourly and len(hourly.get("precipitation", [])) >= 3:
                    precip_1h = hourly["precipitation"][1]
                    precip_2h = hourly["precipitation"][2]
                    forecast = f"Next 1 hr: {precip_1h}mm rain. Next 2 hrs: {precip_2h}mm rain."
                
                # Simple heuristic for alerts based on live data
                alert_level = "Green (No Warning)"
                if precipitation > 15.0 or wind_speed > 60.0:
                    alert_level = "Red (Severe Alert - Evacuation Recommended)"
                elif precipitation > 5.0 or wind_speed > 40.0:
                    alert_level = "Orange (Moderate Alert - Be Prepared)"
                elif precipitation > 1.0 or wind_speed > 20.0:
                    alert_level = "Yellow (Watch - Stay Updated)"

                timestamp = datetime.now().strftime("%Y-%m-%d %I:%M %p")

                return json.dumps({
                    "status": "success",
                    "timestamp": timestamp,
                    "district": resolved_name,
                    "alert_level": alert_level,
                    "current_precipitation_mm": precipitation,
                    "current_wind_speed_kmh": wind_speed,
                    "next_2_hours_forecast": forecast
                })

    except Exception as e:
        logger.error(f"Error fetching district alert: {e}")
        return json.dumps({
            "status": "error", 
            "message": "I'm currently unable to reach the meteorological live feed. How else may I assist you?"
        })
