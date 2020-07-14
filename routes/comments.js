var express=require("express"),
	router=express.Router({mergeParams: true}),
	campground=require("../models/campground"),
	comment=require("../models/comment"),
	middleware=require("../middleware/index")



/// COMMENTS new
router.get("/new",middleware.Isloggedin,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		}
		else{
			
			res.render("comments/new",{campground: campground})
			
		}
	})
	
})

//comments post
router.post("/", middleware.Isloggedin,function(req, res){
   //lookup campground using ID
   campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
		   
		    //comment.author.id= req.user._id
		   
		   
       
        comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
			   
			   comment.author.username= req.user.username
			   comment.author.id=req.user._id
			   comment.save()
               campground.comments.push(comment);
               campground.save();
			   req.flash("success","Comment added")
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});


//EDIT comment router
router.get("/:comment_id/edit",middleware.CheckcommentOwnership,function(req,res){
	
	comment.findById(req.params.comment_id,function(err,comment){
		if(err)
			{
				console.log(err)
			}
		else{
			res.render("comments/edit",{comment: comment,campground_id:req.params.id})
			
		}
	})
		
	    
})
	
	


//update comment router
router.put("/:comment_id",middleware.CheckcommentOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,edited){
		if(err)
			{
				console.log(err)
			}
		
		else{
			res.redirect("/campgrounds/"+req.params.id)
		   }
	})
})



//DESTROY router
router.delete("/:comment_id",middleware.CheckcommentOwnership,function(req,res){
	
	comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
		if(err){
			res.redirect("back")
		}
		else{
			res.redirect("back")
		}
	})
})





	
module.exports=router