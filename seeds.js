var mongoose=require("mongoose"),
	comment=require("./models/comment"),
	campground=require("./models/campground")


var data=[
	{ name: "California ",
	  image: "https://hipcamp-res.cloudinary.com/images/c_fill,f_auto,g_auto,h_220,q_60,w_320/v1440960539/campground-photos/n7d25kyivpciw5in5mbb/buttermilk-falls-1-farmhouse-campground.jpg",
	 description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	},
	
	{ name: "National park ",
	  image: "https://jameskaiser.com/wp-content/uploads/2015/03/lower-pines-campground-yosemite-valley-2.jpg",
	 description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	},
	
	
	{ name: "Sunset magazine",
	  image: "https://img.sunset02.com/sites/default/files/image/2016/06/main/camping-western-guide-sites-california-moro-campground-cover-0513.jpg",
	 description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
	}
]

function seedDB(){
	///REMOVE campgrounds
      campground.remove({},function(err){
	     if(err){
		    console.log(err)
	       }
	       else{
		    console.log("campgrounds are removed")
		  
	  
		   
		   //      data.forEach(function(seed){
		   //        //ADDING campgrounds
		
		   // campground.create(seed,function(err,campground){
		   // if(err){
		   // console.log(err)
		   // }
		   // else{
		   // console.log("campground is created")
					
		   // comment.create({
		   // text: "This is nice campground",
		   // author: "Sravani Mandadapu"
		   // },function(err,comment){
		   // if(err){
		   // console.log(err)
		   // }
		   // else{
		   // console.log(comment)
		   // campground.comments.push(comment._id)
		   // campground.save()
		   // console.log("Comment added")
								
		   // }
		   // })
		   // }
				
		   // })	
				
		   //  })
		
	
		   }
	
	})
	
}



module.exports=seedDB
