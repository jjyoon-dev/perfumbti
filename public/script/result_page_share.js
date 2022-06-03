const test_thumbnail_image ='https://iridescent-22bdc.web.app/images/mbti_thumbnail.jpg';
var mbti = '';

// 결과 페이지 공유
function kakaoResultPageShare() {
    mbti = $('#shareMbti').val();
    console.log(mbti);    
    countData.doc("share_count").get().then((snapshot) => {
        var kakaoCount = snapshot.data()["kakaotalk"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            kakaotalk: kakaoCount + 1,
            total: totalCount +1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });

    const shareTitle = "나를 닮은 향수 선물 테스트\n내가 선물 받은 나를 닮은 향수는...";
    const shareImage = 'https://iridescent-22bdc.web.app/images/mbti_result/result_thumbnails/result_share_' + mbti + '.jpeg';
    // location.href = 'https://iridescent-22bdc.web.app/images/mbti_result/result_share_' + mbti + '.jpeg';
    const shareURL = 'https://iridescent-22bdc.web.app/pages/result_' + mbti + '.html';
    Kakao.Link.sendDefault({
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
            title: '선물 확인',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL
            },
        }, {
            title: '테스트 하기',
            link: {
                mobileWebUrl: 'https://iridescent-22bdc.web.app/',
                webUrl: 'https://iridescent-22bdc.web.app/'
            },
        }, ],

    });
}

function shareResultPageFacebook() {
    mbti = $('#shareMbti').val();
    console.log(mbti);
    var sendUrl = "https://iridescent-22bdc.web.app/pages/result_" + mbti + ".html";
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareResultPageTwitter() {
    mbti = $('#shareMbti').val();
    console.log(mbti);
    var sendText = "내가 받은 나를 닮은 향수 테스트 결과";
    var sendUrl = "https://iridescent-22bdc.web.app/pages/result_" + mbti + ".html";
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}
$("#btnResultPageFacebook").click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var facebookCount = snapshot.data()["facebook"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            facebook: facebookCount + 1,
            total: totalCount +1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    shareResultPageFacebook();
});
$("#btnResultPageTwitter").click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var twitterCount = snapshot.data()["twitter"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            twitter: twitterCount + 1,
            total: totalCount +1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    shareResultPageTwitter();
});
$('.link_share').click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var copyCount = snapshot.data()["link_copy"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            link_copy: copyCount + 1,
            total: totalCount +1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    clip();
});

function resultPageClip() {
    var url = '';
    mbti = $('#shareMbti').val();
    console.log(mbti);
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // url = window.document.location.href;
    url = "https://iridescent-22bdc.web.app/pages/result_" + mbti + ".html";
    textarea.value = "https://iridescent-22bdc.web.app/pages/result_" + mbti + ".html";
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}




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