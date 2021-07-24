from flask import Flask, render_template, jsonify
from bson import ObjectId
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



@app.route("/$")
def oneDS():
    restaurant_data = db.Ohio_Business.find({"$and":[{"categories":{"$regex":"Restaurants"}}, {"attributes.RestaurantsPriceRange2":"1"}]})
    

    oneDollarSign = []

    for i in restaurant_data:
        i['_id'] = str(i['_id'])
        oneDollarSign.append(i)

    return jsonify(oneDollarSign)

@app.route("/$$")
def twoDS():
    restaurant_data = db.Ohio_Business.find({"$and":[{"categories":{"$regex":"Restaurants"}}, {"attributes.RestaurantsPriceRange2":"2"}]})
    

    twoDollarSign = []

    for i in restaurant_data:
        i['_id'] = str(i['_id'])
        twoDollarSign.append(i)

    return jsonify(twoDollarSign)
    
@app.route("/$$$")
def threeDS():
    restaurant_data = db.Ohio_Business.find({"$and":[{"categories":{"$regex":"Restaurants"}}, {"attributes.RestaurantsPriceRange2":"3"}]})
    

    threeDollarSign = []

    for i in restaurant_data:
        i['_id'] = str(i['_id'])
        threeDollarSign.append(i)

    return jsonify(threeDollarSign)

@app.route("/$$$$")
def fourDS():
    restaurant_data = db.Ohio_Business.find({"$and":[{"categories":{"$regex":"Restaurants"}}, {"attributes.RestaurantsPriceRange2":"4"}]})
    

    fourDollarSign = []

    for i in restaurant_data:
        i['_id'] = str(i['_id'])
        fourDollarSign.append(i)

    return jsonify(fourDollarSign)

if __name__ == "__main__":
    app.run(debug=True)
