const db = firebase.firestore();
var database = db.collection('perfumbti').doc('data');
var userData = database.collection('user_data');
var countData = database.collection('count_data');
var testCount = db.collection('test_count');

// 참여횟수, 공유횟수 count
countData.doc("result_count").get().then((snapshot) => {
    var count = snapshot.data()["count"] + 257;
    var play_count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $('.count_play_num').text(play_count);
});

countData.doc("share_count").get().then((snapshot) => {
    var count = snapshot.data()["total"] + 124;
    var share_count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $('.count_share_num').text(share_count);
});


var mbti = "";
var num = 1;
var q = {
    1: {
        "title": "첫 수업이다!</br>OO강의동에 도착했는데</br>강의실을 찾기가 어렵다면?",
        "type": "EI",
        "A": "건물 안에 내부 지도가 있는지 찾아본다.",
        "B": "\"안녕하세요, 혹시 516호는 어디로 가야하나요?\"</br>지나가는 사람에게 물어본다.",
        "value": 0,
        "number": 1,
        "question_img": "images/mbti_question/mbti_1.jpg"
    },
    2: {
        "title": "다행히 강의 시작 전에 도착했다.</br>\'자리가 얼마 없는데 어디에 앉지?\'",
        "type": "EI",
        "A": "가운데 자리가 비어 있지만</br>뒷편에 있는 빈 자리에 앉는다.",
        "B": "가장 가까운 가운데 빈 자리에 앉는다.",
        "value": 0,
        "number": 2,
        "question_img": "images/mbti_question/mbti_2.jpg"
    },
    3: {
        "title": "첫눈에 호감이 가는 상대가</br>옆자리에 와서 앉았다.</br>이 때 나는",
        "type": "EI",
        "A": "상대방이 어떤 사람인지 파악하기 위해</br>지켜본다.",
        "B": "\"저기...\" 상대방에게 아무 말이라도 건네본다.",
        "value": 0,
        "number": 3,
        "question_img": "images/mbti_question/mbti_3.jpg"
    },
    4: {
        "title": "수업 중 고흐의 명화를 감상했다.</br>이걸 보고 드는 나의 생각은?",
        "type": "SN",
        "A": "#밤하늘 #별 #야경 #호수</br>#가격 #색감 #질감",
        "B": "#왜 이걸 그렸을까? #그리는데 오래 걸렸겠지?</br>#밤산책 나가고 싶다.",
        "value": 0,
        "number": 4,
        "question_img": "images/mbti_question/mbti_4.jpg"
    },
    5: {
        "title": "수업이 끝난 뒤 친구들과의 술자리,</br>한 친구가 호감 상대를 데리고 왔다.</br>이 때 드는 생각은...</br>",
        "type": "SN",
        "A": "\'오! 이런 우연이?\'</br>호감 상대와 친해질 수 있는</br>기회라고 생각한다.",
        "B": "\'헐. 이건 운명인가?\'</br>호감 상대와 잘 되어가는 미래를 상상한다.",
        "value": 0,
        "number": 5,
        "question_img": "images/mbti_question/mbti_5.jpg"
    },
    6: {
        "title": "친구들과 대화 중에</br>이상형 이야기가 나왔다.</br>나에게 어떤 사람을</br>좋아하는지 물어보는데...",
        "type": "SN",
        "A": "\"나는 OOO 같은 스타일이 좋아\"</br>구체적인 생김새나 연예인을 예시로 든다.",
        "B": "\"나는 대화가 잘 통하고</br>같은 관심사를 가진 사람이 좋아\"</br>정신적인 교류를 할 수 있는 사람이 좋다.",
        "value": 0,
        "number": 6,
        "question_img": "images/mbti_question/mbti_6.jpg"
    },
    7: {
        "title": "친구가 전공 프로젝트를 준비하는데</br>잘 안된다고 이야기한다.</br>친구의 고민에 대한 나의 반응은?",
        "type": "TF",
        "A": "\"이번 프로젝트가 어렵긴 하지,</br>이 웹사이트 한 번 들어가볼래?\"</br>도움이 될만한 정보들을 알려준다.",
        "B": "\"맞아...나도 어떻게 준비해야할지 막막하더라.</br>그래도 너는 잘 할 수 있을거야\"</br>공감과 격려의 말을 건네준다.",
        "value": 0,
        "number": 7,
        "question_img": "images/mbti_question/mbti_7.jpg"
    },
    8: {
        "title": "시험 성적이 잘 나온 나에게</br>친구가 이렇게 말한다.</br>\"넌 공부를 별로 안하는 것 같더니</br>성적이 잘 나오는 비결이 뭐야?\"",
        "type": "TF",
        "A": "\'내가 머리가 좀 좋은 듯?\'</br>친구의 말에 으쓱해진다.",
        "B": "\'내가 공부를 안한다고?\'</br>친구의 말에 기분이 언짢다.",
        "value": 0,
        "number": 8,
        "question_img": "images/mbti_question/mbti_8.jpg"
    },
    9: {
        "title": "호감 상대가 내게 프로젝트 파트너로</br>함께 하자고 제안했다.</br>이에 대한 나의 반응은?",
        "type": "TF",
        "A": "\"그래! 혹시 생각해 둔 주제가 있어?\"</br>효율적인 진행을 위해 자세히 물어본다.",
        "B": "\"당연하지! 언제 보는게 좋을까?\"</br>상대와 최대한 시간을 맞추려고 한다.",
        "value": 0,
        "number": 9,
        "question_img": "images/mbti_question/mbti_9.jpg"
    },
    10: {
        "title": "프로젝트 미팅 첫날</br>어떻게 옷을 입고 갈까?",
        "type": "OD",
        "A": "평소에 내가 입던 스타일로 편하게 입는다.",
        "B": "평소보다는 좀 더 신경써서 차려 입는다.",
        "value": 0,
        "number": 10,
        "question_img": "images/mbti_question/mbti_10.jpg"
    },
    11: {
        "title": "외출 하기 전 마지막으로</br>향수를 뿌리려고 하는데,</br>내가 뿌릴 향수의 향기는...",
        "type": "WU",
        "A": "대중적으로 알려진 친숙한 향기",
        "B": "비교적 생소한 개성 있는 향기",
        "value": 0,
        "number": 11,
        "question_img": "images/mbti_question/mbti_11.jpg"
    },
    12: {
        "title": "프로젝트를 마무리하는 날</br></br>\"너를 닮은 향수를 선물로 준비했어.\"</br>호감 상대가 감사의 선물을 주었다.</br>과연 어떤 향수일까?",
        "type": "P",
        "A": "그 자리에서 바로 선물을 개봉한다.",
        "B": "집에 가져가서 선물을 개봉한다.",
        "value": 0,
        "number": 12,
        "question_img": "images/mbti_question/mbti_12.jpg"
    }
};
var result = {
    "INFOU": {
        "mbti": "infou",
        "result_img": "images/mbti_result/result_INFOU.jpeg",
        "result_html": "./pages/result_INFOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INFOU.jpeg",
        "perfume": "르 라보 어나더13"
    },
    "INFOW": {
        "mbti": "infow",
        "result_img": "images/mbti_result/result_INFOW.jpeg",
        "result_html": "./pages/result_INFOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INFOW.jpeg",
        "perfume": "조 말론 우드세이지 앤 씨솔트"
    },
    "INFDU": {
        "mbti": "infdu",
        "result_img": "images/mbti_result/result_INFDU.jpeg",
        "result_html": "./pages/result_INFDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INFDU.jpeg",
        "perfume": "메종 프란시스 커정 우드 사틴 무드"
    },
    "INFDW": {
        "mbti": "infdw",
        "result_img": "images/mbti_result/result_INFDW.jpeg",
        "result_html": "./pages/result_INFDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INFDW.jpeg",
        "perfume": "바이레도 모하비 고스트"
    },
    "INTOU": {
        "mbti": "intou",
        "result_img": "images/mbti_result/result_INTOU.jpeg",
        "result_html": "./pages/result_INTOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INTOU.jpeg",
        "perfume": "프레데릭 말 뮤스크 라바줴"
    },
    "INTOW": {
        "mbti": "intow",
        "result_img": "images/mbti_result/result_INTOW.jpeg",
        "result_html": "./pages/result_INTOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INTOW.jpeg",
        "perfume": "이솝 테싯"
    },
    "INTDU": {
        "mbti": "intdu",
        "result_img": "images/mbti_result/result_INTDU.jpeg",
        "result_html": "./pages/result_INTDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INTDU.jpeg",
        "perfume": "톰 포드 오드 우드"
    },
    "INTDW": {
        "mbti": "intdw",
        "result_img": "images/mbti_result/result_INTDW.jpeg",
        "result_html": "./pages/result_INTDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_INTDW.jpeg",
        "perfume": "바이레도 로즈 오브 노 맨즈 랜드"
    },
    "ISFOU": {
        "mbti": "isfou",
        "result_img": "images/mbti_result/result_ISFOU.jpeg",
        "result_html": "./pages/result_ISFOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISFOU.jpeg",
        "perfume": "딥디크 플레르 드 뽀"
    },
    "ISFOW": {
        "mbti": "isfow",
        "result_img": "images/mbti_result/result_ISFOW.jpeg",
        "result_html": "./pages/result_ISFOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISFOW.jpeg",
        "perfume": "르 라보 암브레트 9"
    },
    "ISFDU": {
        "mbti": "isfdu",
        "result_img": "images/mbti_result/result_ISFDU.jpeg",
        "result_html": "./pages/result_ISFDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISFDU.jpeg",
        "perfume": "조 러브스 화이트 로즈 앤 레몬 리브스"
    },
    "ISFDW": {
        "mbti": "isfdw",
        "result_img": "images/mbti_result/result_ISFDW.jpeg",
        "result_html": "./pages/result_ISFDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISFDW.jpeg",
        "perfume": "조 말론 블랙베리 앤 베이"
    },
    "ISTOU": {
        "mbti": "istou",
        "result_img": "images/mbti_result/result_ISTOU.jpeg",
        "result_html": "./pages/result_ISTOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISTOU.jpeg",
        "perfume": ""
    },
    "ISTOW": {
        "mbti": "istow",
        "result_img": "images/mbti_result/result_ISTOW.jpeg",
        "result_html": "./pages/result_ISTOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISTOW.jpeg",
        "perfume": ""
    },
    "ISTDU": {
        "mbti": "istdu",
        "result_img": "images/mbti_result/result_ISTDU.jpeg",
        "result_html": "./pages/result_ISTDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISTDU.jpeg",
        "perfume": ""
    },
    "ISTDW": {
        "mbti": "istdw",
        "result_img": "images/mbti_result/result_ISTDW.jpeg",
        "result_html": "./pages/result_ISTDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ISTDW.jpeg",
        "perfume": ""
    },
    "ENFOU": {
        "mbti": "enfou",
        "result_img": "images/mbti_result/result_ENFOU.jpeg",
        "result_html": "./pages/result_ENFOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENFOU.jpeg",
        "perfume": ""
    },
    "ENFOW": {
        "mbti": "enfow",
        "result_img": "images/mbti_result/result_ENFOW.jpeg",
        "result_html": "./pages/result_ENFOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENFOW.jpeg",
        "perfume": ""
    },
    "ENFDU": {
        "mbti": "enfdu",
        "result_img": "images/mbti_result/result_ENFDU.jpeg",
        "result_html": "./pages/result_ENFDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENFDU.jpeg",
        "perfume": ""
    },
    "ENFDW": {
        "mbti": "enfdw",
        "result_img": "images/mbti_result/result_ENFDW.jpeg",
        "result_html": "./pages/result_ENFDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENFDW.jpeg",
        "perfume": ""
    },
    "ENTOU": {
        "mbti": "entou",
        "result_img": "images/mbti_result/result_ENTOU.jpeg",
        "result_html": "./pages/result_ENTOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENTOU.jpeg",
        "perfume": ""
    },
    "ENTOW": {
        "mbti": "entow",
        "result_img": "images/mbti_result/result_ENTOW.jpeg",
        "result_html": "./pages/result_ENTOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENTOW.jpeg",
        "perfume": ""
    },
    "ENTDU": {
        "mbti": "entdu",
        "result_img": "images/mbti_result/result_ENTDU.jpeg",
        "result_html": "./pages/result_ENTDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENTDU.jpeg",
        "perfume": ""
    },
    "ENTDW": {
        "mbti": "entdw",
        "result_img": "images/mbti_result/result_ENTDW.jpeg",
        "result_html": "./pages/result_ENTDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ENTDW.jpeg",
        "perfume": ""
    },
    "ESFOU": {
        "mbti": "esfou",
        "result_img": "images/mbti_result/result_ESFOU.jpeg",
        "result_html": "./pages/result_ESFOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESFOU.jpeg",
        "perfume": ""
    },
    "ESFOW": {
        "mbti": "esfow",
        "result_img": "images/mbti_result/result_ESFOW.jpeg",
        "result_html": "./pages/result_ESFOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESFOW.jpeg",
        "perfume": ""
    },
    "ESFDU": {
        "mbti": "enfdu",
        "result_img": "images/mbti_result/result_ESFDU.jpeg",
        "result_html": "./pages/result_ESFDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESFDU.jpeg",
        "perfume": ""
    },
    "ESFDW": {
        "mbti": "esfdw",
        "result_img": "images/mbti_result/result_ESFDW.jpeg",
        "result_html": "./pages/result_ESFDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESFDW.jpeg",
        "perfume": ""
    },
    "ESTOU": {
        "mbti": "estou",
        "result_img": "images/mbti_result/result_ESTOU.jpeg",
        "result_html": "./pages/result_ESTOU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESTOU.jpeg",
        "perfume": ""
    },
    "ESTOW": {
        "mbti": "estow",
        "result_img": "images/mbti_result/result_ESTOW.jpeg",
        "result_html": "./pages/result_ESTOW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESTOW.jpeg",
        "perfume": ""
    },
    "ESTDU": {
        "mbti": "estdu",
        "result_img": "images/mbti_result/result_ESTDU.jpeg",
        "result_html": "./pages/result_ESTDU.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESTDU.jpeg",
        "perfume": ""
    },
    "ESTDW": {
        "mbti": "estdw",
        "result_img": "images/mbti_result/result_ESTDW.jpeg",
        "result_html": "./pages/result_ESTDW.html",
        "result_thumbnail": "images/mbti_result/result_thumbnails/result_share_ESTDW.jpeg",
        "perfume": ""
    }
}

function start() {
    $(".start").hide();
    $(".question").show();
    $(".question").addClass("loading_block");
    $(".kakao_ad").addClass("show");
    $("#footer").hide();
    $("#footer").addClass("hide");
    var callQuestion = function () {
        $(".question").addClass("act");
    }
    setTimeout(callQuestion, 200);
    $("#email").css("color", "#ffffff");
    $("#copy").css("color", "#ffffff");
    next();
}
$("#select_A").click(function () {
    if (num == 13) {
        q[12]["value"] = 1;
        next();
    } else {
        q[num - 1]["value"] = 1;
        next();
    }
    $('html, body').animate({
        scrollTop: 0
    }, 300);
});
$("#select_B").click(function () {
    if (num == 13) {
        q[12]["value"] = 0;
        next();
    } else {
        q[num - 1]["value"] = 0;
        next();
    }
    $('html, body').animate({
        scrollTop: 0
    }, 300);
})
$("#return").click(function () {
    restart();
})
$("#prev").click(function () {
    prev();
});

function prev() {
    num--;
    if (num == 1) {
        num = 1;
        mbti = "";
        $(".question").hide();
        $(".question").removeClass("act");
        $(".question").removeClass("loading_block");
        $(".container").removeClass("c_act");
        $(".kakao_ad").removeClass("show");
        $(".result").hide();
        $(".start").show();
        $(".kakao_ad").show();
        $("#footer").show();
        $("#footer").removeClass("hide");
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    } else {
        $(".question_box").hide();
        $(".question_btn_wrap").hide();
        $(".prev_btn").hide();
        $(".question_box").css("opacity", "0");
        $(".question_btn_wrap").css("opacity", "0");
        $(".prev_btn").css("opacity", "0");
        var nonOpacity = function () {
            $(".question_box").show();
            $(".question_btn_wrap").show();
            $(".prev_btn").show();
            $(".question_box").css("opacity", "1");
            $(".question_btn_wrap").css("opacity", "1");
            $(".prev_btn").css("opacity", "1");
        }
        setTimeout(nonOpacity, 200);
        $(".question").css("background-image", " linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) ), url(" + q[num - 1]["question_img"] + ") ");
        $("#title").html(q[num - 1]["title"]);
        $("#type").val(q[num - 1]["type"]);
        $("#progress_num").html(num - 1 + " / 12");
        $("#select_A").html(q[num - 1]["A"]);
        $("#select_B").html(q[num - 1]["B"]);
    }
}

function next() {
    if (num == 13) {
        $(".question").hide();
        $(".loading").addClass("loading_flex");
        var showLoading = function () {
            $(".loading").addClass("act");
        }
        var loadingTime = function () {
            $(".result").show();
            $(".loading").removeClass("act");
            $(".loading").removeClass("loading_flex");
            $("#email").css("color", "#6F1742");
            $("#copy").css("color", "#6F1742");
            $(".kakao_ad").show();
            $(".kakao_ad").addClass("show");
            $("#footer").show();
            $("#footer").removeClass("hide");
            // location.href = result[mbti]["result_html"];         
        }
        setTimeout(showLoading, 200);
        setTimeout(loadingTime, 3500);
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let day = today.getDay();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();
        var selected = {
            Result: "",
            Date: year + '/' + month + '/' + date,
            Time: hours + ':' + minutes + ':' + seconds,
        }
        var eiarr = [1, 2, 3];
        var snarr = [4, 5, 6];
        var tfarr = [7, 8, 9];
        var eiPoint = 0;
        var snPoint = 0;
        var tfPoint = 0;
        var odPoint = q[10]["value"];
        var wuPoint = q[11]["value"];
        for (var i = 0; i < 3; i++) {
            eiPoint += q[eiarr[i]]["value"]
            snPoint += q[snarr[i]]["value"]
            tfPoint += q[tfarr[i]]["value"]
        };
        (eiPoint >= 2) ? mbti += "I": mbti += "E";
        (snPoint >= 2) ? mbti += "S": mbti += "N";
        (tfPoint >= 2) ? mbti += "T": mbti += "F";
        (odPoint == 1) ? mbti += "O": mbti += "D";
        (wuPoint == 1) ? mbti += "W": mbti += "U";
        for (var i = 1; i < 13; i++) {
            if (q[i]["value"] == 1) {
                selected[i] = "A";
            } else {
                selected[i] = "B";
            };
        };
        $("#resultMbti").val(mbti);
        $("#shareMbti").val(mbti);
        selected["Result"] = mbti;
        userData.add({
            selected
        });
        countData.doc("result_count").get().then((snapshot) => {
            var resultCount = snapshot.data()["count"];
            countData.doc("result_count").update({
                count: resultCount + 1
            });
        });
        $("#result_img").attr("src", result[mbti]["result_img"]);

    } else {
        $(".question_box").hide();
        $(".question_btn_wrap").hide();
        $(".prev_btn").hide();
        $(".question_box").css("opacity", "0");
        $(".question_btn_wrap").css("opacity", "0");
        $(".prev_btn").css("opacity", "0");
        var nonOpacity = function () {
            $(".question_box").show();
            $(".question_btn_wrap").show();
            $(".prev_btn").show();
            $(".question_box").css("opacity", "1");
            $(".question_btn_wrap").css("opacity", "1");
            $(".prev_btn").css("opacity", "1");
        }
        setTimeout(nonOpacity, 200);
        $(".question").css("background-image", " linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) ), url(" + q[num]["question_img"] + ") ");
        $("#title").html(q[num]["title"]);
        $("#type").val(q[num]["type"]);
        $("#progress_num").html(num + " / 12");
        $("#select_A").html(q[num]["A"]);
        $("#select_B").html(q[num]["B"]);
        num++;
    }
}

function restart() {
    num = 1;
    mbti = "";
    $(".question").hide();
    $(".question").removeClass("act");
    $(".question").removeClass("loading_block");
    $(".container").removeClass("c_act");
    $(".kakao_ad").removeClass("show");
    $(".result").hide();
    $(".start").show();
    $(".kakao_ad").show();
    $("#footer").show();
    $("#footer").removeClass("hide");
    $('html, body').animate({
        scrollTop: 0
    }, 300);
}