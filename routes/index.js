var express=require("express"),
	router=express.Router(),
	passport=require("passport"),
	user=require("../models/user"),
	campground=require("../models/campground"),
	comment=require("../models/comment")



router.get("/", function(req, res){
	
    res.render("landing")
})



router.get("/register",function(req,res){
	res.render("register")
})

router.post("/register",function(req,res){
	user.register( new user({username:req.body.username}),req.body.password,function(err,user){
		if(err){
		req.flash("error", err.message)
		   res.render("register")
		}
		else{
			
			
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to "+ user.username)
				res.redirect("/campgrounds")
			})
		}
	})
})

//LOGIN ROUTES
router.get("/login",function(req,res){

	res.render("login")
})

router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req,res){
	
})


router.get("/logout",function(req,res){
	
	req.logout()
	req.flash("success","You've successfully logged out")
	res.redirect("/campgrounds")
})

module.exports=router

