//middleware's goes here
var middleware={
	
}
var campground=require("../models/campground"),
	comment=require("../models/comment")

middleware.Isloggedin=function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	else{
		req.flash("error", "You need to be login")
		res.redirect("/login")
	}
}

middleware.CheckcampgroundOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,campground){
			if(err){
				res.redirect("back")
				
			}
			else{
				if(campground.author.id.equals(req.user._id)){
	             return next()
	         }
				else{
				
		   
		              res.redirect("back")
	   
				}
			}
		})
		
	   
	   
		
	}
	else{
		
		res.redirect("back")
	}
	
}

middleware.CheckcommentOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,comment){
			if(err){
				res.redirect("back")
				
			}
			else{
				if(comment.author.id.equals(req.user._id)){
	             return next()
	         }
				else{
				
		   
		              res.redirect("back")
	   
				}
			}
		})
		
	   
	   
		
	}
	else{
		
		res.redirect("back")
	}
	
}

module.exports= middleware