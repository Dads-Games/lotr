import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

# Define the scope of access
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Load credentials from the .json file
creds = ServiceAccountCredentials.from_json_keyfile_name('keys.json', scope)

# Authorize the gspread client
client = gspread.authorize(creds)

# Open the spreadsheet by URL
sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1r7OSV56mFA4zolirh91UII3rYeDkE2WJXz_mhixMRXU/").sheet1

# Fetch all data from the sheet
rows = sheet.get_all_values()

# Convert data to the desired JSON format
json_dict = {}
for row in rows:
    if len(row) >= 2:  # Ensure there are at least two columns in each row
        key = row[0].strip()  # First column as the key, strip whitespace
        value = row[1].strip()  # Second column as the value, strip whitespace
        if key and value:  # Ensure both key and value are not empty
            json_dict[key] = value

# Convert the dictionary to JSON format
json_data = json.dumps(json_dict, indent=4)

# Write JSON data to a file
with open('languages/eng/main.json', 'w') as json_file:
    json_file.write(json_data)

print("English language JSON has been updated!")
