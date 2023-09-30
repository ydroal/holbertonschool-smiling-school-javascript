$(document).ready(function () {
  // ローダーを表示
  $('.loader-container').show();

  // APIからquotesをフェッチ
  $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      method: 'GET',
      success: function (data) {
          let carouselInner = $('.carousel-inner');
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
});
