sportsApp = {};

var teams = [];

sportsApp.getResults = function() {
	$.ajax({
		url: 'https://www.mysportsfeeds.com/api/feed/sample/pull/nba/2015-2016-regular/overall_team_standings.json?', 
		method: 'GET', 
		dataType: 'json'
	}).then(function(teams) {
		var teamsList = teams.overallteamstandings.teamstandingsentry;
		// console.log(teamsList);
		for (var i = 0; i < teamsList.length; i++) {
			console.log(`${teamsList[i].rank}: ${teamsList[i].team.City} ${teamsList[i].team.Name}`)
			teams = teamsList[i].team.City;
			teamID = teamsList[i].team.ID;
			$('body').append($('<p>').text(`${teams}... ${teamID}`));
		}
	})
}

sportsApp.getRosters = function() {
	$.ajax({
		url: 'https://www.mysportsfeeds.com/api/feed/sample/pull/nba/2015-2016-regular/roster_players.json?fordate=20151028&', 
		method: 'GET', 
		dataType: 'json'
	}).then(function(rosters) {
		var rostersTotal = rosters.rosterplayers.playerentry; 
		// console.log(rostersTotal);
		$.each(rostersTotal, function(i, roster) {
			if (roster !== undefined) {
				if (roster.team.ID === "102") {
					console.log(roster);
				} else {
					console.log('sorry')
				}
			}
		})
	})
}




sportsApp.init = function() {
	sportsApp.getResults();
	sportsApp.getRosters();
}

$(function() {
	sportsApp.init();
})