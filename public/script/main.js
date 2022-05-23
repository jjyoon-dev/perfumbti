const db = firebase.firestore();
var testCount = db.collection('test_count');

//객체 정보 & 초기화
var mbti = "";
var num = 1;
var q = {
	1: {
		"title": "첫 수업이다!</br>OO강의동에 도착했는데</br>강의실을 찾기가 어렵다면?",
		"type": "EI",
		"A": "건물 안에 내부 지도가 있는지 찾아본다.(I)",
		"B": "\"안녕하세요, 혹시 516호는 어디로 가야하나요?\"</br>지나가는 사람에게 물어본다.(E)",
		"value": 0,
		"number": 1,
		"question_img": "images/mbti_question/mbti_1.jpg"
	},
	2: {
		"title": "다행히 강의 시작 전에 도착했다.</br>\'자리가 얼마 없는데 어디에 앉지?\'",
		"type": "EI",
		"A": "가운데 자리가 비어 있지만</br>뒷편에 있는 빈 자리에 앉는다.(I)",
		"B": "가장 가까운 가운데 빈 자리에 앉는다.(E)",
		"value": 0,
		"number": 2,
		"question_img": "images/mbti_question/mbti_2.jpg"
	},
	3: {
		"title": "첫눈에 호감이 가는 상대가</br>옆자리에 와서 앉았다.</br>이 때 나는",
		"type": "EI",
		"A": "상대방이 어떤 사람인지 파악하기 위해</br>지켜본다.(I)",
		"B": "\"저기...\" 상대방에게 아무 말이라도 건네본다.(E)",
		"value": 0,
		"number": 3,
		"question_img": "images/mbti_question/mbti_3.jpg"
	},
	4: {
		"title": "수업 중 고흐의 명화를 감상했다.</br>이걸 보고 드는 나의 생각은?",
		"type": "SN",
		"A": "#밤하늘 #별 #야경 #호수</br>#가격 #색감 #질감(S)",
		"B": "#왜 이걸 그렸을까? #그리는데 오래 걸렸겠지?</br>#밤산책 나가고 싶다.(N)",
		"value": 0,
		"number": 4,
		"question_img": "images/mbti_question/mbti_4.jpg"
	},
	5: {
		"title": "수업이 끝난 뒤 친구들과의 술자리,</br>한 친구가 호감 상대를 데리고 왔다.</br>이 때 드는 생각은...</br>",
		"type": "SN",
		"A": "\'오! 이런 우연이?\'</br>호감 상대와 친해질 수 있는</br>기회라고 생각한다.(S)",
		"B": "\'헐. 이건 운명인가?\'</br>호감 상대와 잘 되어가는 미래를 상상한다.(N)",
		"value": 0,
		"number": 5,
		"question_img": "images/mbti_question/mbti_5.jpg"
	},
	6: {
		"title": "친구들과 대화 중에</br>이상형 이야기가 나왔다.</br>나에게 어떤 사람을</br>좋아하는지 물어보는데...",
		"type": "SN",
		"A": "\"나는 OOO 같은 스타일이 좋아\"</br>구체적인 생김새나 연예인을 예시로 든다.(S)",
		"B": "\"나는 대화가 잘 통하고</br>같은 관심사를 가진 사람이 좋아\"</br>정신적인 교류를 할 수 있는 사람이 좋다.(N)",
		"value": 0,
		"number": 6,
		"question_img": "images/mbti_question/mbti_6.jpg"
	},
	7: {
		"title": "친구가 전공 프로젝트를 준비하는데</br>잘 안된다고 이야기한다.</br>친구의 고민에 대한 나의 반응은?",
		"type": "TF",
		"A": "\"이번 프로젝트가 어렵긴 하지,</br>이 웹사이트 한 번 들어가볼래?\"</br>도움이 될만한 정보들을 알려준다.(T)",
		"B": "\"맞아...나도 어떻게 준비해야할지 막막하더라.</br>그래도 너는 잘 할 수 있을거야\"</br>공감과 격려의 말을 건네준다.(F)",
		"value": 0,
		"number": 7,
		"question_img": "images/mbti_question/mbti_7.jpg"
	},
	8: {
		"title": "시험 성적이 잘 나온 나에게</br>친구가 이렇게 말한다.</br>\"넌 공부를 별로 안하는 것 같더니</br>성적이 잘 나오는 비결이 뭐야?\"",
		"type": "TF",
		"A": "\'내가 머리가 좀 좋은 듯?\'</br>친구의 말에 으쓱해진다.(T)",
		"B": "\'내가 공부를 안한다고?\'</br>친구의 말에 기분이 언짢다.(F)",
		"value": 0,
		"number": 8,
		"question_img": "images/mbti_question/mbti_8.jpg"
	},
	9: {
		"title": "호감 상대가 내게 프로젝트 파트너로</br>함께 하자고 제안했다.</br>이에 대한 나의 반응은?",
		"type": "TF",
		"A": "\"그래! 혹시 생각해 둔 주제가 있어?\"</br>효율적인 진행을 위해 자세히 물어본다.(T)",
		"B": "\"당연하지! 언제 보는게 좋을까?\"</br>상대와 최대한 시간을 맞추려고 한다.(F)",
		"value": 0,
		"number": 9,
		"question_img": "images/mbti_question/mbti_9.jpg"
	},
	10: {
		"title": "프로젝트 미팅 첫날</br>어떻게 옷을 입고 갈까?.",
		"type": "OD",
		"A": "평소에 내가 입던 스타일로 편하게 입는다.(O)",
		"B": "평소보다는 좀 더 신경써서 차려 입는다.(D)",
		"value": 0,
		"number": 10,
		"question_img": "images/mbti_question/mbti_10.jpg"
	},
	11: {
		"title": "외출 하기 전 마지막으로</br>향수를 뿌리려고 하는데,</br>내가 뿌릴 향수는...",
		"type": "WU",
		"A": "대중적으로 알려진 호불호 적은 향수(W)",
		"B": "비교적 생소하지만 개성 있는 향수(U)",
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
		"explain": "당신의 MBTI는 ISTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INFOU.jpeg"
	},
	"INFOW": {
		"mbti": "infow",
		"explain": "당신의 MBTI는 ISFJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INFOW.jpeg"
	},
	"INFDU": {
		"mbti": "infdu",
		"explain": "당신의 MBTI는 INFJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INFDU.jpeg"
	},
	"INFDW": {
		"mbti": "infdw",
		"explain": "당신의 MBTI는 INTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_IFNDW.jpeg"
	},
	"INTOU": {
		"mbti": "intou",
		"explain": "당신의 MBTI는 ISTP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INTOU.jpeg"
	},
	"INTOW": {
		"mbti": "intow",
		"explain": "당신의 MBTI는 ISFP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INTOW.jpeg"
	},
	"INTDU": {
		"mbti": "intdu",
		"explain": "당신의 MBTI는 INFP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INTDU.jpeg"
	},
	"INTDW": {
		"mbti": "intdw",
		"explain": "당신의 MBTI는 INTP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_INTDW.jpeg"
	},
	"ISFOU": {
		"mbti": "isfou",
		"explain": "당신의 MBTI는 ESTP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISFOU.jpeg"
	},
	"ISFOW": {
		"mbti": "isfow",
		"explain": "당신의 MBTI는 ESFP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISFOW.jpeg"
	},
	"ISFDU": {
		"mbti": "isfdu",
		"explain": "당신의 MBTI는 ENFP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISFDU.jpeg"
	},
	"ISFDW": {
		"mbti": "isfdw",
		"explain": "당신의 MBTI는 ENFP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISFDW.jpeg"
	},
	"ISTOU": {
		"mbti": "istou",
		"explain": "당신의 MBTI는 ENTP입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISTOU.jpeg"
	},
	"ISTOW": {
		"mbti": "istow",
		"explain": "당신의 MBTI는 ESTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISTOW.jpeg"
	},
	"ISTDU": {
		"mbti": "istdu",
		"explain": "당신의 MBTI는 ESFJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISTDU.jpeg"
	},
	"ISTDW": {
		"mbti": "istdw",
		"explain": "당신의 MBTI는 ENFJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ISTDW.jpeg"
	},
	"ENFOU": {
		"mbti": "enfou",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENFOU.jpeg"
	},
	"ENFOW": {
		"mbti": "enfow",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENFOW.jpeg"
	},
	"ENFDU": {
		"mbti": "enfdu",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENFDU.jpeg"
	},
	"ENFDW": {
		"mbti": "enfdw",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENFDW.jpeg"
	},
	"ENTOU": {
		"mbti": "entou",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENTOU.jpeg"
	},
	"ENTOW": {
		"mbti": "entow",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENTOW.jpeg"
	},
	"ENTDU": {
		"mbti": "entdu",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENTDU.jpeg"
	},
	"ENTDW": {
		"mbti": "entdw",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ENTDW.jpeg"
	},
	"ESFOU": {
		"mbti": "esfou",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESFOU.jpeg"
	},
	"ESFOW": {
		"mbti": "esfow",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESFOW.jpeg"
	},
	"ESFDU": {
		"mbti": "enfdu",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESFDU.jpeg"
	},
	"ESFDW": {
		"mbti": "esfdw",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESFDW.jpeg"
	},
	"ESTOU": {
		"mbti": "estou",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESTOU.jpeg"
	},
	"ESTOW": {
		"mbti": "estow",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESTOW.jpeg"
	},
	"ESTDU": {
		"mbti": "estdu",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESTDU.jpeg"
	},
	"ESTDW": {
		"mbti": "estdw",
		"explain": "당신의 MBTI는 ENTJ입니다.</br></br>아직 개발중인 단계입니다.</br>테스트에 참여해주셔서 감사합니다.",
		"result_img": "images/mbti_result/result_ESTDW.jpeg"
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


$("#select_A").click(
	function () {
		if (num == 13) {
			q[12]["value"] = $("input:radio[name='question_option']:checked").attr("data-value");			
			next();
		} else {
			q[num - 1]["value"] = $("input:radio[name='question_option']:checked").attr("data-value");		
			next();
		}
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	}
);



$("#select_B").click(
	function () {
		if (num == 13) {
			q[12]["value"] = $("input:radio[name='question_option']:checked").attr("data-value");			
			console.log(q);
			next();
		} else {
			q[num - 1]["value"] = $("input:radio[name='question_option']:checked").attr("data-value");		
			next();
		}
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	}
)



$("#return").click(
	function () {
		restart();
	}
)

$("#prev").click(
	function () {
		prev();
	}
);


function next() {
	if (num == 13) {
		$(".question").hide();

		// 결과창 로딩
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
		}

		setTimeout(showLoading, 200);
		setTimeout(loadingTime, 3500);


		// 날짜 계산
		let today = new Date();

		let year = today.getFullYear(); // 년도
		let month = today.getMonth() + 1; // 월
		let date = today.getDate(); // 날짜
		let day = today.getDay(); // 요일
		let hours = today.getHours(); // 시
		let minutes = today.getMinutes(); // 분
		let seconds = today.getSeconds(); // 초


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


		// 선택 정보를 객체에 저장
		for (var i = 1; i < 13; i++) {
			if (q[i]["value"] == 1) {
				selected[i] = "A";
			} else {
				selected[i] = "B";
			};
		};

		selected["Result"] = mbti;
		db.collection('data').add({
			selected
		});

		// 테스트 결과를 본 횟수 누적
		testCount.get().then(snapshot => {
			snapshot.forEach(doc => {
				var totalCount = doc.data()["count"];
				testCount.doc('total').update({
					count: totalCount + 1
				});
			});
		}).catch(err => {
			console.log('Error getting documents', err);
		})




		// 결과 화면 출력
		$("#result_img").attr("src", result[mbti]["result_img"]);




	} else {
		// $(".progress-bar").attr('style', 'width: calc(100/11*' + num + '%)');
		// $("#question_img").attr("src", q[num]["question_img"]);

		$(".question_box").hide()
		$(".question_btn_wrap").hide()
		$(".question_box").css("opacity", "0");
		$(".question_btn_wrap").css("opacity", "0");

		var nonOpacity = function () {
			// setTimeout(function () {
				$(".question_box").show()
				$(".question_btn_wrap").show()
				$(".question_box").css("opacity", "1");
				$(".question_btn_wrap").css("opacity", "1");
			// }, 150)
		}
		setTimeout(nonOpacity, 200);

		$(".question").css("background-image", " linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) ), url(" + q[num]["question_img"] + ") ");
		$("#title").html(q[num]["title"]);
		$("#type").val(q[num]["type"]);
		$("#progress_num").html(num + " / 12");
		$("#label_A").html(q[num]["A"]);
		$("#label_B").html(q[num]["B"]);

		// console.log($("input:radio[name='question_option']:checked").attr("data-value"));

		num++;
	}
}


// 홈으로 돌아가기 & 다시하기
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
