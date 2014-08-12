var JobsCollection = Backbone.Collection.extend({
	initialize:function(options){
		this.location = options.location;
		this.description = options.description;
	},
	url: function(){
		return "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text="+this.description+"&city="+this.location;
	}
})



window.onload = app;

function app(){
	testCollection = new JobsCollection({
		location:"77003", 
		description: "JavaScript" 
	});
	testCollection.fetch();
}