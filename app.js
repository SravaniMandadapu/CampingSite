var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
	user=require("./models/user"),
	flash=require("connect-flash"),
	passport=require("passport"),
	localstrategy=require("passport-local"),
	methodOverride=require("method-override"),
	comment=require("./models/comment"),
	campground=require("./models/campground"),
	seedDB=require("./seeds")


var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
  
var options={
	useNewUrlParser: true,
	useUnifiedTopology: true
}


mongoose.connect("mongodb+srv://sravani:sravani@cluster0.lgxen.mongodb.net/<dbname>?retryWrites=true&w=majority", options)

//mongoose.connect("mongodb://localhost:27017/Yelp_camp_v3", options)

// seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"))
app.use(flash())


// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error")
	res.locals.success=req.flash("success")
	return next()
		
		})
// campground.create({
// 	name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", description: "This is Salmon Creek campground"
	
	 
//  },function(err, camp){
// 	 if(err){
// 		 console.log(err)
// 	 }
// // 	 else{
// 		 console.log(camp)
// 	// }
// //})
//var campgrounds = [
  //      {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    ///    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
       /// {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        //{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
       // {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        //{name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        //{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        //{name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        //{name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
//];
    
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});