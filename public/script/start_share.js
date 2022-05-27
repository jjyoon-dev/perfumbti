var mbti = '';


// 테스트 시작 페이지 공유 버튼
function kakaoTestShare() {
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
    const shareTitle = "나를 닮은 향수 선물 테스트\n내가 선물 받은 나를 닮은 향수는?";
    const shareImage = 'https://iridescent-22bdc.web.app/images/mbti_thumbnail.jpg';
    const shareURL = 'https://iridescent-22bdc.web.app/'
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
            title: '선물 확인하러 가기',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL
            },
        },],

    });

    countData.doc("share_count").get().then((snapshot) => {
        var count = snapshot.data()["total"] + 124;
        var share_count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $('.count_share_num').html(share_count);
    });
}

function shareTestFacebook() {
    var sendUrl = 'https://iridescent-22bdc.web.app/';
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareTestTwitter() {
    var sendText = "나를 닮은 향수 선물 테스트";
    var sendUrl = 'https://iridescent-22bdc.web.app/';
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}
$("#btnTestFacebook").click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var facebookCount = snapshot.data()["facebook"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            facebook: facebookCount + 1,
            total: totalCount + 1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    shareTestFacebook();
});
$("#btnTestTwitter").click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var twitterCount = snapshot.data()["twitter"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            twitter: twitterCount + 1,
            total: totalCount + 1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    shareTestTwitter();
});
$('.link_share').click(function () {
    countData.doc("share_count").get().then((snapshot) => {
        var copyCount = snapshot.data()["link_copy"];
        var totalCount = snapshot.data()["total"];
        countData.doc("share_count").update({
            link_copy: copyCount + 1,
            total: totalCount + 1
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
    test_clip();
});

function test_clip() {
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = 'https://abit.ly/perfumbti_present/';
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