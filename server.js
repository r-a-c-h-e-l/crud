var express = require("express")
var fs = require("fs");
var app = express();


var menagerie = JSON.parse(fs.readFileSync("menagerie.JSON", "utf8"));
console.log(menagerie);

var Pet = function(name,type) {
  this.petName = name
  this.petType = type
}
var rite = function(){
  var str = JSON.stringify(menagerie)
  fs.writeFile("menagerie.JSON", str, function(err,data) {})
}

app.get("/create/:pet_name/:pet_type", function(req,res) {
  var name = req.params.pet_name
  var type = req.params.pet_type
  var animal = new Pet(name,type)
  menagerie.push(animal);
  rite();
  res.json({"status":"success!"})
});

app.get("/read/:pet_name", function(req,res) {
  var name = req.params.pet_name
  var format = name.replace(/ /,"_")
  var petArray = []
  var obj= {};
  menagerie.forEach(function(pet) {
    if (pet.petName == format) {
      petArray.push(pet)
    }
  });
  if (petArray.length > 0) {
    obj[format]= petArray
    res.json(obj)
  } else {
    res.json({"status": "A pet by that name does not exist"});
  }
});

app.get("/update/:pet_name/:new_pet_name", function(req,res) {
  var name = req.params.pet_name
  var newName = req.params.new_pet_name
  var format = name.replace(/ /,"_")
  var formatNew = newName.replace(/ /,"_")
  menagerie.forEach(function(pet) {
    if (pet.petName == format) {
      pet.petName= formatNew
    }
  });
  rite();
  res.json({"status":"success!"})
});

app.get("/destroy/:pet_name", function(req,res) {
  var name = req.params.pet_name
  var format = name.replace(/ /,"_")
  var counter= 0
  var j = 0
  menagerie.forEach(function(pet) {
    if(pet.petName == format) {
      menagerie.splice(counter,1);
      counter++
      j++
    }else {
      counter++
    }
  })
  if (j > 0 ) {
    rite();
    res.json({"status": "success!"})
  }else {
    res.json({"status": "A pet by that name does not exist"})
  }
});

app.get("/all_pets", function(req,res) {
  res.json({"all pets": menagerie})
});

app.listen(3000);
console.log("listening on port 3000!");
