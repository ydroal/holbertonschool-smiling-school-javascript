$(document).ready(function () {
  function loadQuotes() {
    // ローダーを表示
    $('.loader-container').show();

    // APIからquotesをフェッチ
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function (data) {
            let carouselInner = $('#quotes-carousel');
            carouselInner.html(''); // static contentとloaderをクリア

            // レスポンスデータからカルーセルのitemを作成
            // ajaxメソッドが背後で既にJSONのパースを行っているのでJSON.parse()は不要
            data.forEach((quote, index) => {
                let activeClass = (index === 0) ? 'active' : '';
                let quoteHTML = `
                <div class="carousel-item ${activeClass}">
                    <div class="row mx-auto align-items-center">
                        <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                            <img src="${quote.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
                        </div>
                        <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                            <div class="quote-text">
                                <p class="text-white">« ${quote.text} »</p>
                                <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                <span class="text-white">${quote.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                carouselInner.append(quoteHTML);
            });

            // Initialize the carousel again
            $('#carouselExampleControls').carousel();
            $('.loader-container').hide();
        },
        error: function () {
            console.error('Failed to fetch quotes');
            $('.loader-container').hide();
        }
    });
  };

  function loadPopularTutorials() {
    $('.loader-container').show(); 

    // APIからpopular-tutorialsをフェッチ
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        method: 'GET',
        success: function (data) {
          let carouselInner = $('#carouselExampleControls2 .carousel-inner');
            carouselInner.html(''); // static contentとloaderをクリア

            for (let i = 0; i < data.length; i += 4) {
              let carouselItem = $('<div class="carousel-item"></div>');
              let rowDiv = $('<div class="row align-items-center mx-auto"></div>');

              if (i === 0) {
                  carouselItem.addClass('active');
              }

              for (let j = 0; j < 4 && i + j < data.length; j++) {
                let tutorial = data[i + j];
                // starsを作成する
                let starsHTML = '';
                for (let k = 0; k < 5; k++) {
                    if (k < tutorial.star) {
                        starsHTML += '<i class="fas fa-star"></i>'; // starをつける
                    } else {
                        starsHTML += '<i class="far fa-star"></i>'; // 0 star
                    }
                }

                let tutorialHTML = `
                  <div class="col-3"> 
                    <div class="card">
                        <img src="${tutorial.thumb_url}" class="card-img-top" alt="Video thumbnail">
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${tutorial.title}</h5>
                            <p class="card-text text-muted">${tutorial["sub-title"]}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${tutorial.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                                <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">${starsHTML}</div>
                                <span class="main-color">${tutorial.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                rowDiv.append(tutorialHTML); 
            }
            carouselItem.append(rowDiv);
            carouselInner.append(carouselItem);

          }

            // カルーセルを初期化
            $('#carouselExampleControls2').carousel({
                interval: false,
                wrap: true
            });

            $('.loader-container').hide();
        },
        error: function() {
            console.error('Failed to fetch popular tutorials');
            $('.loader-container').hide();
        }
    });
  };
  
  loadQuotes();
  loadPopularTutorials();
});