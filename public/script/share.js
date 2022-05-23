  const url = 'https://iridescent-22bdc.web.app/';
  // const url = 'https://abit.ly/perfumbti_present/';


  var shareData = db.collection('share_data');





  function setShare() {

    // 공유 횟수 불러오기 & 1회 추가하기 [ 카카오 ] 
    shareData.get().then(snapshot => {
      snapshot.forEach(doc => {
        var kakaoCount = doc.data()["kakaotalk"];
        shareData.doc('click_count').update({
          kakaotalk: kakaoCount + 1
        });
      });
    }).catch(err => {
      console.log('Error getting documents', err);
    })



    const shareTitle = "나를 닮은 향수 선물 테스트";
    const shareImage = 'https://iridescent-22bdc.web.app/images/mbti_thumbnail.jpg';
    // const shareURL = url + 'pages/result_' + mbti + '.html';
    const shareURL = url;


    Kakao.Link.sendDefault({
      // container: '#create-kakao-link-btn',
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: '#향수 #선물 #나를 닮은 향수 #MBTI',
        imageUrl: shareImage,
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      },
      buttons: [{
        title: '선물 확인하러 가기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      }, ],
    });
  }

  //Facebook 공유 동작 function
  function shareFacebook() {
    var sendUrl = "https://abit.ly/perfumbti_present/";
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    //Facebook에 전송 정보 파라미터 삽입
  }


  //Twitter 공유 동작 function
  function shareTwitter() {
    var sendText = "나를 닮은 향수 선물 테스트";
    var sendUrl = "https://abit.ly/perfumbti_present/";
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
    //Twitter에 전송 정보 파라미터 삽입
  }


  // facebook share
  $("#btnFacebook").click(function () {
    // 공유 횟수 불러오기 & 1회 추가하기 [ 페이스북 ] 
    shareData.get().then(snapshot => {
      snapshot.forEach(doc => {
        var facebookCount = doc.data()["facebook"];
        shareData.doc('click_count').update({
          facebook: facebookCount + 1
        });
      });
    }).catch(err => {
      console.log('Error getting documents', err);
    })

    shareFacebook();
  });

  // twitter share
  $("#btnTwitter").click(function () {
    // 공유 횟수 불러오기 & 1회 추가하기 [ 트위터 ] 
    shareData.get().then(snapshot => {
      snapshot.forEach(doc => {
        var twitterCount = doc.data()["twitter"];
        shareData.doc('click_count').update({
          twitter: twitterCount + 1
        });
      });
    }).catch(err => {
      console.log('Error getting documents', err);
    })
    shareTwitter();
  });







  // URL 주소 복사
  $('.link_share').click(
    function () {
      // 공유 횟수 불러오기 & 1회 추가하기 [ 링크 ] 
      var clickCount = shareData.get().then(snapshot => {
        snapshot.forEach(doc => {
          var linkCount = doc.data()["link"];
          shareData.doc('click_count').update({
            link: linkCount + 1
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      })

      clip();
    }
  );

  function clip() {
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = 'https://abit.ly/perfumbti_present/';
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }


  // 버튼 클릭 이벤트
  // 카카오 공유
  $(function () {
    $(".kakao_share").mousedown(function () {
      $(".kakao_share").css('color', '#b612fb');
    });

    $(".kakao_share").mousedown(function () {
      $(".kakao_share").css('color', '#000000');
    });
  });

  // 링크 복사
  $(function () {
    $(".link_share").mousedown(function () {
      $(".fa-link").css('color', '#b612fb');
    });

    $(".link_share").mousedown(function () {
      $(".fa-link").css('color', '#000000');
    });
  });







  function moveHome() {
    location.href = "/index.html";
    num = 1;
    $(".question").hide();
    $(".question").removeClass("act");
    $(".question").removeClass("loading_block");
    $(".container").removeClass("c_act");
    $(".result").hide();
    $(".start").show();
    $("#footer").show();
    $("#footer").removeClass("hide");
    $('html, body').animate({
      scrollTop: 0
    }, 300);
  }
