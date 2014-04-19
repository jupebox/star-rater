// Star Rater Javascript

function updateStarRaterUI () {
	var average = $(".star-rater").data("average"),
		outOf = $(".star-rater li").length;
		// reset stars
		$(".star-rater li").removeClass();
	if (average && outOf) {
		// sub point 4: display the updated average ratings
		// round newAverage to 1 decimal place
		average = 5*(Math.round(average*2)) / 10;
		$(".star-rater-average dd").html(average + "/" + outOf);
		var stars = Math.floor(average);
		if (stars) {
			var index;
			for (index = 0; index < stars; ++index) {
			    $($(".star-rater li")[index]).addClass("full-star");
			}
			if (stars < average) {
				$($(".star-rater li")[stars]).addClass("half-star");
			}
		}
	}
}

$( document ).ready( function () {

	updateStarRaterUI();
	
// point 3: when a user clicks, things happen
	$(".star-rater li a").click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		var parent = $(this).parents(".star-rater");
		// sub point 2: disable future rating
		if (parent.hasClass("unrated")) {
			parent.removeClass("unrated").addClass("rated");

			// sub point 1: save the rating
			// sub sub point 1: get the rating
			var rating = $(this).parent().index() + 1,
				outOf = $(".star-rater li").length,
				averageRating = $(".star-rater").data("average"),
				totalRatings =$(".star-rater").data("ratings"),
				newAverage = null;

			if (rating && outOf) {

				var index;
				for (index = 0; index < rating; ++index) {
				    $($(".star-rater li")[index]).find("a").addClass("chosen");
				}

				// in case of brand new rating with no previous records
				averageRating = averageRating ? averageRating : 0;
				totalRatings = totalRatings ? totalRatings : 0;

				averageRating = averageRating * totalRatings;

				// we're adding a rating now
				totalRatings = totalRatings + 1;

				// sub point 3: add rating to total score
				newAverage = (averageRating + rating) / totalRatings;

				$(".star-rater").data("average", newAverage);
				$(".star-rater").data("ratings", totalRatings);
				updateStarRaterUI();
			}
		}
	});
});