///DEFINITION BLOCK////


function GeekyGigs() {
	this.jobs_url = ".json?description=";
	this.jobs_loc = "&" + "location=";
	this.getJob();

}

"https://jobs.github.com/positions.json?description=python&location=new+york"

// GeekyGigs.prototype.getJob = function(jobKeyword, city) {
// 	var completeJobURL = "https://jobs.github.com/positions" + this.jobs_url + jobKeyword + this.jobs_loc + city;
// 		return completeJobURL;
// 		console.log(completeJobURL);
// }
GeekyGigs.prototype.getJob = function(jobKeyword, city) {
	var job_url_array = [
		"https://jobs.github.com/positions",
		this.jobs_url,
		jobKeyword,
		this.jobs_loc,
		city
	];
	
	var job_url = (job_url_array.join(''));
	// $.get(job_url), {paramOne : jobKeyword, param2 : city}
	// return job_url;

}

$(function (){

	$.ajax({
		type: 'GET',
		url: this.job_url,
		sucess: function(data) {
			console.log('success', data);
		}
	})
})

// GeekyGigs.prototype.showJobs = function(jobKeyword, city) {
// 	$.when(
// 		this.getJob(jobKeyword, city)
// 	).then(
// 	function(jobData){
// 		var jobListing = jobData.
	






//////ROUTER///////


// var Router = Backbone.Router.extend({

// 	GigsURL: new GeekyGigs(),

// 	routes: {
// 		"jobSearch": "search"
// 	},
// 		search: function(jobKeyword, city) {
// 			this.GigsURL.showJobs(jobKeyword, city);
			
// 		}

// });


/////////////EXECUTION////////////////

// window.onload = app;

// function app() {
//     var myRouter = new Router();
//     if (!Backbone.history.start()) {
//         myRouter.navigate("jobSearch", {
//             trigger: true
//         });
//     }
// }
