//Mobile Dropdown Menu
document.querySelector('.burger').addEventListener('click', () => {
document.querySelector('.nav-ul-list').classList.toggle('nav-active');
	});




//YouTube API App Carousel
jQuery(document).ready(function() {

  var key = 'AIzaSyCipJMqEaZvCAQycCJHb8Y5tti3h8Z56PQ';
  var playlistId = 'PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX';
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems';

  var options = {
    part: 'snippet',
    key: key,
    maxResults: 10,
    playlistId: playlistId
  }

  loadVids();

  function loadVids() {
    jQuery.getJSON(url, options, function(data){
      var id = data.items[0].snippet.resourceId.videoId;
      resultsLoop(data);
    })
  }


  function resultsLoop(data) {

    $.each(data.items, function(i, item) {

      var eachId = item.snippet.resourceId.videoId;

      jQuery('.carousel-track').append(`
        <iframe class="carousel-iframes"
        src="https://www.youtube.com/embed/${eachId}"
        frameborder="0" allow="accelerometer; autoplay;
        encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
        `);

    });

    var track = document.querySelector('.carousel-track');
    var theIframes = Array.from(track.children).reverse();
    var prevButton = document.querySelector('.carousel-button-prev');
    var nextButton = document.querySelector('.carousel-button-next');

    var iframeWidth = theIframes[0].getBoundingClientRect().width;

    var numberOfIframes = theIframes.length;

    //Initial Slide Arrangement
    /*theIframes[0].style.left = slideWidth * 0;
    theIframes[1].style.left = iframeWidth * 1 + 'px';
    theIframes[2].style.left = iframeWidth * 2 + 'px';
    theIframes[3].style.left = iframeWidth * 3 + 'px';
    theIframes[4].style.left = iframeWidth * 4 + 'px';*/

    var setIframePosition = (anIframe, index) => {
      anIframe.style.left = (iframeWidth * index) + 'px';
    };
    theIframes.forEach(setIframePosition);
    

track.style.width = (numberOfIframes * iframeWidth) + 'px';


    //Click Next Equals Move to Left
    nextButton.addEventListener('click', e => {
      var currentTrackPositionLeft = document.querySelector('.carousel-track').getBoundingClientRect().left;
      var currentTrackPositionRight = document.querySelector('.carousel-track').getBoundingClientRect().right;
      var currentTrackContainerWidth = document.querySelector('.carousel-track-container').getBoundingClientRect().width;
      var currentYtCarouselLeft = document.querySelector('.yt-carousel').getBoundingClientRect().left;

      if (currentTrackPositionRight < currentTrackContainerWidth + 5 || currentTrackPositionRight == currentTrackContainerWidth + 5) {
      track.style.right = currentTrackPositionLeft + 'px)';
    }else {
      track.style.transform = 'translateX(calc(' + (currentTrackPositionLeft - currentYtCarouselLeft) + 'px - 355px))';
    }
      });

    //Click Prev Equals Move to Right
    prevButton.addEventListener('click', e => {
      var currentTrackPositionLeft = document.querySelector('.carousel-track').getBoundingClientRect().left;
      var currentYtCarouselLeft = document.querySelector('.yt-carousel').getBoundingClientRect().left;

      if (currentTrackPositionLeft > 5 || currentTrackPositionLeft == 5) {
      track.style.left = currentTrackPositionLeft + 'px)';
    }else {
      track.style.transform = 'translateX(calc(' + (currentTrackPositionLeft - currentYtCarouselLeft) + 'px + 335px))';
    }
    });

  }

});



//Podcasts Page Button Switcher
jQuery(document).ready(function(){
    $('.youtube-pod-page-container').addClass('podcast-player-inactive');
    $('.wp-block-embed-spotify').addClass('podcast-player-inactive');
    $('.wp-block-embed-soundcloud').addClass('podcast-player-inactive');
    $('.youtube-pod-page-container').addClass('podcast-player-active');
    
    $( ".podcast-yt-player-btn" ).click(function() {
        $('.podcast-player-inactive').removeClass('podcast-player-active');
        $('.youtube-pod-page-container').addClass('podcast-player-active');
    });
    
    $( ".podcast-spotify-player-btn" ).click(function() {
        $('.podcast-player-inactive').removeClass('podcast-player-active');
        $('.wp-block-embed-spotify').addClass('podcast-player-active');
    });
    
    $( ".podcast-soundcloud-player-btn" ).click(function() {
        $('.podcast-player-inactive').removeClass('podcast-player-active');
        $('.wp-block-embed-soundcloud').addClass('podcast-player-active');
    });
    $( ".podcast-switcher-btn" ).click(function() {
        $('.podcast-switcher-btn').removeClass('active');
        $( this ).addClass('active');
    });
});






//Load More Articles on Front Page, Loop
jQuery(document).ready(function(){
    $( ".load-next-ten-btn" ).click(function() {
        
    if($(".m-s-load-one").hasClass("posts-active")) {
        $('.m-s-load-two').addClass('posts-active');
    }else {
        $('.m-s-load-one').addClass('posts-active');
    };
});
});





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
