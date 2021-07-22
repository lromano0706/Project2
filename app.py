from flask import Flask, render_template
import pymongo

app = Flask(__name__)

# setup mongo connection
conn = "mongodb+srv://project2:project2@cluster0.g4en2.mongodb.net/myFirstDatabase"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.Ohio_data

@app.route("/")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    # restaraunt_data = list(db.Ohio_Business.find({"categories":{"$regex":"Restaurants"}}))
    restaraunt_data = list(db.Ohio_Business.find({"name":{"$regex":"Scramblers"}}))
    print(restaraunt_data)

    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index.html", restaraunt_data=restaraunt_data)


if __name__ == "__main__":
    app.run(debug=True)
