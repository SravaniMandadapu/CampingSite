var express=require("express"),
	campground=require("../models/campground"),
	router=express.Router(),
	middleware=require("../middleware/index")

	

router.get("/", function(req, res){
	campground.find({},function(err,campgrounds){
		if(err){
			console.log(err)
		}
		else{
			
			
			res.render("campgrounds/index",{campgrounds:campgrounds});
		}
	})
    //res.render("campgrounds",{campgrounds:campgrounds});
});

//CREATE --add new campgrounds to DB
router.post("/",  function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
    var newCampground = {name: name, image: image ,price: price, description: description,author: author}
	campground.create(newCampground,function(err,newly){
		if(err){
			console.log(err)
		}
		else(
			console.log(newly)
		
		)
	})
    //campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});


//NEW--show form to create new campground
router.get("/new",middleware.Isloggedin, function(req, res){
   res.render("campgrounds/new.ejs"); 
});

// show --shows info about particular campground
router.get("/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		   
			if(err){
		
			console.log(err)
		    }
	
		    else{
				
			res.render("campgrounds/show",{campground:campground})
		    
			}
											   
	    
	})
	
})

//EDIT ROUTES

router.get("/:id/edit",middleware.CheckcampgroundOwnership,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if(err)
			{
				console.log(err)
			}
		else{
			res.render("../views/campgrounds/edit",{campground:campground})
			
		}
	})
		
	    
})


//UPDATE router
router.put("/:id",middleware.CheckcampgroundOwnership,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,edited){
		if(err)
			{
				console.log(err)
			}
		
		else{
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

///DELETE
router.delete("/:id",middleware.CheckcampgroundOwnership,function(req,res){
	
campground.findByIdAndRemove(req.params.id,function(err){
	if(err){
		console.log(err)
	}
	
		res.redirect("/campgrounds")

})
})





module.exports=router