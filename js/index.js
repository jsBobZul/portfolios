window.onload = function () {
  const mainInner = document.querySelector(".main_inner");
  const navBtn = document.querySelector(".nav_button");
  const navBtnSpan = document.querySelector(".nav_button span");
  const header = document.querySelector("header");
  const mainBtn = document.querySelector(".slide_button");
  const mainBtnInner = document.querySelector(".slide_button span");
  const wrapping = document.querySelector(".wrapping");
  const firstProject = wrapping.firstElementChild;
  const lastProject = wrapping.lastElementChild; //loop 시 사용
  let projects = document.querySelectorAll(".project");
  let globalBtn = document.querySelectorAll("header button");

  // grobal Nav 이벤트
  navBtn.addEventListener("click", function () {
    mainInner.classList.toggle("on");
    header.classList.toggle("on");
    navBtnSpan.classList.toggle("on");
  });

  // 메인 슬라이드 구현
  let index = 1; //loop 시 1, 아닐 시 0
  let rotate = 360 / projects.length;
  const x = 360 / projects.length;
  // let numReg = RegExp(/[^0-9]/g);
  wrapping.ondragstart = function () {
    //다른 요소 드래그 방지
    return false;
  };

  // const LOOPFLAG = true;
  //=======================loop 시 사용========================
  const screenTime = 0.5; //화면전환속도 초 단위 설정
  const screenSpeedType = `ease-in-out`;
  const cloenTime = screenTime * 1000;
  let firstClone = firstProject.cloneNode(true);
  let lastClone = lastProject.cloneNode(true);
  wrapping.appendChild(firstClone);
  wrapping.insertBefore(lastClone, firstProject);
  projects = document.querySelectorAll(".project");

  // wrapping.style.width = `${projects.length}00%`;
  // wrapping.style.top = `-100%`;
  // wrapping.style.transition = `none`;
  // for (let i = 0; i < projects.length; i++) {
  //     projects[i].style.width = `${100 / projects.length}%`;
  //   };

  const screenSpeed = () => wrapping.style.transition = `top ${screenTime}s ${screenSpeedType}`;
  screenSpeed();

  const slideDownEvent = () => { //slideRightEvent
    screenSpeed();
    rotate = index * x;
    mainBtnInner.style.transform = `rotate(${rotate}deg)`;
    index++;
    wrapping.style.top = `-${index}00%`;
    if (index > projects.length - 2) {
      setTimeout(() => {
        wrapping.style.transition = `none`;
        wrapping.style.top = `-100%`;
        index = 1;
      }, cloenTime);
    }
  };

  const slideTopEvent = () => { //slideLeftEvent
    screenSpeed();
    index--;
    wrapping.style.top = `-${index}00%`;
    rotate = index * x - x;
    if (index <= 0) {
      setTimeout(() => {
        wrapping.style.transition = `none`;
        wrapping.style.top = `-${projects.length - 2}00%`;
        index = projects.length - 2;
      }, cloenTime);
    };
    mainBtnInner.style.transform = `rotate(${rotate}deg)`;
  };
  //=======================/loop 시 사용===========================
  //=======================loop 해제 시 사용========================
  // let slideDownEvent = function () {
  //     index++;
  //     if (index === projects.length) {
  //             index = projects.length-1;
  //         };
  //     wrapping.style.left = `-${index*100}%`;
  //     mainBtnInner.style.transform = `rotate(${index*x}deg)`;
  //     rotate = index * x;
  //     };

  // let slideTopEvent = function () {
  //     let wrappingLeft = window.getComputedStyle(wrapping).left;
  //     let projectWidth = window.getComputedStyle(firstProject).width;
  //     let wLeft = wrappingLeft.replace(numReg, ""); //숫자 변환
  //     let pWidth = projectWidth.replace(numReg, ""); //숫자 변환
  //     let responeSlide = (wLeft / pWidth - 1) * 100;
  //     if (responeSlide >= 0) {
  //         rotate = rotate - x;
  //         wrapping.style.left = `${-responeSlide}%`;
  //         mainBtnInner.style.transform = `rotate(${rotate}deg)`;
  //         index--;
  //     };
  //};
  //=======================/loop 해제 시 사용========================
  let RCnum = 0;
  const rightClick = () =>{
    RCnum++;
    if(RCnum == 1){
      slideTopEvent();
      setTimeout(() => {
        RCnum = 0;
      }, cloenTime);
    };
  };

  mainBtn.addEventListener("click", slideDownEvent); // 메인 버튼 클릭 시 슬라이드 동작
  mainBtn.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    rightClick();
  });

  let moveSlide; // 슬라이드 이벤트
  wrapping.addEventListener("mousedown", function (e) {
    moveSlide = e.offsetX;
  });
  wrapping.addEventListener("mouseup", function (e) {
    let moveEvent = moveSlide - e.offsetX;
    if (moveEvent > 0) {
      slideDownEvent();
    } else if (moveEvent < 0) {
      slideTopEvent();
    }
  });
  let moveSlide2; // 태블릿 슬라이드 이벤트
  wrapping.addEventListener("touchstart", function (e) {
    moveSlide2 = e.targetTouches[0].clientX;
  });
  wrapping.addEventListener("touchend", function (e) {
    let moveEvent = moveSlide2 - e.changedTouches[0].clientX;
    if (moveEvent > 0) {
      slideDownEvent();
    } else if (moveEvent < 0) {
      slideTopEvent();
    }
  });
  wrapping.addEventListener("mousemove", function (event) {
    //글자 드래그 막기
    event.preventDefault();
  });

  // 글로벌 네비게이션 슬라이드 동기화
  function move(el) {
    scroll(0, el);
  }
  let globalBtnNum;
  for (let i = 0; i < globalBtn.length; i++) {
    globalBtn[i].addEventListener("click", function () {
      if (globalBtnNum <= projects.length) {
        globalBtnNum = i + 1;
      } else {
        globalBtnNum = projects.length - 1;
      }
      if (window.innerWidth >= 768) {
        wrapping.style.left = `-${globalBtnNum * 100}%`;
        mainBtnInner.style.transform = `rotate(${i * 90}deg)`;
      } else {
        alert("띵동! 이동되었습니다.");
        move(projects[globalBtnNum].offsetTop);
      }
    });
  }
};