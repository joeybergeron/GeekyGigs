var DiceJobsCollection = Backbone.Collection.extend({
	initialize:function(options){
		this.location = options.location;
		this.description = options.description;
	},
	url: function(){
		return "/jobsearch/"+this.description+"/"+this.location;
	},
	parse: function(data){
		console.log(data);
		this.count = data.count;
		this.firstDocument = data.firstDocument;
		this.lastDocument = data.lastDocument;
		this.nextUrl = data.nextUrl;
		return data.resultItemList;
	}
})

var AuthenticJobsCollection = Backbone.Collection.extend({
	initialize:function(options){
		this.location = options.location;
		this.keywords = options.keywords;
		this.perpage = options.perpage;
		this.page = options.page;
		this.sort = options.sort;
	},
	url: function(){
		var url = [
			"/authenticjobs",
			"?api_key=", 
			"7770219dad2350459bd66d5c3bf70485",
			"&method=",
			"aj.jobs.search",
			"&format=",
			"json"
		]
		
		if(this.keywords){
	        url.push("&keywords=", this.keywords);
	    }
	    if(this.location){
	        url.push("&location=",this.location);
	    }
	    if(this.perpage){
	        url.push("&perpage=",this.perpage);
	    }
	    if(this.page){
	        url.push("&page=",this.page);
	    }
	    if(this.sort){
	        url.push("&sort=",this.sort);
	    }

		return url.join("")
	},
	parse: function(data){
		console.log(data);
		return data.listings.listing;
	}
})

window.onload = app;

function app(){
	testCollection = new AuthenticJobsCollection({
		location:"houston", 
		keywords: "javascript",
		perpage: 100,
		page: 1,
		// sort: ""
	});
	testCollection.fetch();
}