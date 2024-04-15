const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://nachiketnijap:nani3005@cluster0.fzmoseu.mongodb.net/vote"
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// model for storing candidates and their votes
const Votecount = mongoose.model("Votecount", {
  name: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
});

//model for registered candidates

const User = mongoose.model("User", {
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false },
  isVoted: { type: Number, default: 0 },
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  console.log("inside fetch");

  const token = req.header("auth-token");
  if (!token) {
    console.log(req.header("auth-token"));
    console.log("log found");
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "please authenticate" });
    }
  }
};

//to register candidates
app.post("/register-users", async (req, res) => {
  let check=await User.findOne({email:req.body.username});
  if (check){
    return  res.status(400).json({success:false,errors:"Existing user found"})
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone_number: req.body.phone_number,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong username" });
  }
});

//to add candidates in list
app.post("/addcandidates", (req, res) => {
  const candidates = new Votecount({
    name: req.body.name,
  });
  candidates.save();
  res.json(candidates);
});

//update vote count
app.post("/addvotes/:item", fetchUser, async (req, res) => {
  try {
    
    const index = req.params.item;
    let userData = await User.findOne({ _id: req.user.id });
    console.log(userData.isVoted);
    if (userData.isVoted == 0) {

      const updateStatus = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $inc: { isVoted: 1 } },
        { new: true }
      );
      if (!updateStatus) {
        return res.status(404).json({ errors: "Candidate not found" });
      }
      const updatedCandidate = await Votecount.findOneAndUpdate(
        { name: index },
        { $inc: { voteCount: 1 } },
        { new: true }
      );

      if (!updatedCandidate) {
        return res.status(404).json({ errors: "Candidate not found" });
      }
      res.json({ success: true, message: "Voted" });
    } 
    else 
    {
      res.json({ success: false, errors: "you have already voted" });
    }

    console.log("Received index:", index);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to get all candidates data
app.get("/getDataOfCandidates", async (req, res) => {
  const candidates = await Votecount.find();
  res.json(candidates);
});

app.post('/getDataOfSingleCandidate',async (req, res) => {
  const { searchTerm } = req.body;
  // const result = Votecount.filter(candidate =>
  //     candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const candidates = await Votecount.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
  console.log(candidates);
  res.json(candidates);
});


//check isAdmin
app.post("/isAdmin", fetchUser, async (req, res) => {
  try {
    

    let userData = await User.findOne({ _id: req.user.id });
    console.log(userData.isAdmin);
    if (userData.isAdmin) {
      console.log("right");
      res.json({ success: true, message: "welcome" });
    } 
    else 
    {
      console.log("wrong");
      res.json({ success: false, errors: "you are not allowed" });
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
