import requests
import json

def main():
    with open("index.json",'r') as file:
        index = json.load(file)

    for cur in index:
        res = requests.get(f"https://terminal.sexy/templates/{cur}.html")
        content = res.content.decode('utf-8')
        with open(f"{cur}.html", "w") as file:
            file.write(content)
            print(f"Written {file.name}")

if __name__ == "__main__":
    main()