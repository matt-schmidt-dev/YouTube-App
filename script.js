//YouTube-App-Pod-Page
jQuery(document).ready(function () {

    var key = 'AIzaSyCipJMqEaZvCAQycCJHb8Y5tti3h8Z56PQ';
    var playlistId = 'PLillGF-RfqbYeckUaD1z6nviTp31GLTH8';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 30,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#youtube-pod-page-video').html(`
					<iframe class="youtube-pod-page-video-iframe" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('.youtube-pod-page-main').append(`
							<article class="item youtube-pod-page-article" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('.youtube-pod-page-main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});
