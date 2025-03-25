let handPose; // ml5의 handPose 모델을 불러올 변수
let video; // 비디오 스트림을 저장할 변수
let hands = [] // 인식된 손의 정보를 저장하는 변수


let mode_timer = [];  //각 모드(그림,반응)로 변경되기 위해 대기하는 시간을 저장하는 변수
let mode_state; // 현재 모드를 저장하는 변수


let cur_pinger_num; // 현재 펴진 손가락을 저장하는 변수
let cur_pinger_state = [ ]; //각 인덱스0(엄지),1,2,3,4(소지)가 펴져있는지를 0,1로 저장하는 변수


let draw_state; // 그림이 그려지는 상태를 나타냅니다.
let pen = []; // 그림을 그리기 위해 손가락의 좌표값을 저장하는 변수입니다.  
let pen_stroke_num; // 그려진 그림을 획으로 구분하기 위한 인덱스 변수입니다. 


let reaction_image = []; // 반응모드를 통해 나타낼 이미지를 저장하는 변수입니다.
let reaction_menu_x; // 이미지가 나타날 위치의  x좌표를 저장하는 변수입니다.
let reaction_menu_y; // 이미지가 나타날 위치의 y좌표를 저장하는 변수입니다.
let reaction_state = []; // 각 이미지를 나타내기 위해 대기하는 시간을 저장하는 변수입니다.
let reaction_timer = []; //각 이미지가 나타나서 화면에 대기하는 시간을 저장하는 변수입니다.




function preload() {

    //// // 각 반응의 이미지를 로드합니다.
    reaction_image[0] = loadImage('./image/danger.webp'); 
    reaction_image[1] = loadImage('./image/fight.webp');
    reaction_image[2] = loadImage('./image/help.webp');
    reaction_image[3] = loadImage('./image/why.webp');

    handPose = ml5.handPose(); //  손 모양을 인식하는 모델을 초기화합니다.
}





function setup() {
  createCanvas(640, 480); // 640,480 사이즈의 캔버스를 생성합니다.
  
  video = createCapture(VIDEO, {flipped:true}); //사용가능한 카메라(노트북 내장카메라)를 활성화해서  좌우 반전된 상태로 캡쳐합니다. 
   
  video.size(640, 480); // 비디오 사이즈를 640,480으로 설정합니다.
  video.hide(); // 기본으로 표시되는 캡쳐화면을 숨김니다.
  handPose.detectStart(video, gotHands); // ml5.handPose()모델을 video를 통해 인식해서 인식에 성공하면 gothands를 호출합니다.
  

  ////최초 실행에서 mode_timer의 값들을 초기화 합니다.
  mode_timer[0] = 0;
  mode_timer[1] = 0;
  mode_timer[2] = 0;

  // 반응 모드에서 사용 될 값들을 초기화 합니다
  for(let i = 0; i<4; i++){
    reaction_timer[i] = 0; 
    reaction_state[i] = 0; 
  }
  mode_state = 2; // 최초 시작시 모드는 2 detect_mode로 설정합니다.


  pen_stroke_num = -1;  // 최초 시작시 획은 없음으로 -1; 
 
}




function draw() {
   
  image(video, 0, 0, 640, 480); // video가 캡쳐한 화면을 610,0의 좌표에 640,480사이즈로 나타냅니다. 

  
  if(hands.length == 1 && hands[0].keypoints[2].x > hands[0].keypoints[17].x ){ //오른손 손바닥이 인식되는 경우만 각 모드를 실행합니다.

    if( mode_state == 0){
      reaction_mode() // 반응 모드 실행
    }
    else if(mode_state == 1){
      draw_mode(); // 그림 모드를 실행합니다.
    }
    else{
      mode_detect(); //모드를 인식합니다.
    }
   
  }

  show_draw();//그림 모드에서 그려진 그림을 나타냅니다.
  show_reaction();// 반응 모드에서 선택된 이미지를 나타냅니다.
}





function gotHands(results) { 
  hands = results;  // hands에 인식된 결과( 손의 좌표값과 같은 정보)를 저장합니다.
}



//////// 손가락들이 펴져있는지 인식합니다.
function finger_detect(){


  // 이전에 저장했던 정보를 초기화 합니다.
  cur_pinger_num = 0; 
  for(let i = 0 ; i<5; i++) cur_pinger_state[i] = 0;
  


    if(hands[0].keypoints[3].x < hands[0].keypoints[4].x){ // 엄지의 손가락 끝이 두번째 마디보다 왼쪽에 있는경우 펴져있다고 판단
      cur_pinger_num++; // 펴진 손가락 갯수 + 1
      cur_pinger_state[0] = 1; // 펴진 상태로 저장
    }
    else{
      cur_pinger_state[0] = 0; // 아닌 경우 접혀있는 상태로 저장
    }

    
    if(hands[0].keypoints[5].y > hands[0].keypoints[6].y && hands[0].keypoints[6].y > hands[0].keypoints[7].y &&  hands[0].keypoints[7].y > hands[0].keypoints[8].y){
      // 검지의 세번째 마디보다 두번째 마디가, 두번째 마디보다 첫번째 가,  첫번째 마디보다 손가락끝이 위에 있으면 펴져있다고 판단   
      cur_pinger_num++; // 펴진 손가락 갯수 + 1
      cur_pinger_state[1] = 1;// 펴진 상태로 저장
    }
    else{
      cur_pinger_state[1] = 0;// 아닌 경우 접혀있는 상태로 저장
    }
    

    if(hands[0].keypoints[9].y > hands[0].keypoints[10].y && hands[0].keypoints[10].y > hands[0].keypoints[11].y &&  hands[0].keypoints[11].y > hands[0].keypoints[12].y){
      //// 중지의 세번째 마디보다 두번째 마디가, 두번째 마디보다 첫번째 가,  첫번째 마디보다 손가락끝이 위에 있으면 펴져있다고 판단
      cur_pinger_num++; // 펴진 손가락 갯수 + 1
      cur_pinger_state[2] = 1;// 펴진 상태로 저장
    }
    else{
      cur_pinger_state[2] = 0;// 아닌 경우 접혀있는 상태로 저장
    }
    

    if(hands[0].keypoints[13].y > hands[0].keypoints[14].y && hands[0].keypoints[14].y > hands[0].keypoints[15].y &&  hands[0].keypoints[15].y > hands[0].keypoints[16].y){
      // 약지의 세번째 마디보다 두번째 마디가, 두번째 마디보다 첫번째 가,  첫번째 마디보다 손가락끝이 위에 있으면 펴져있다고 판단
      cur_pinger_num++; // 펴진 손가락 개수 + 1
      cur_pinger_state[3] = 1;// 펴진 상태로 저장
    }
    else{
      cur_pinger_state[3] = 0;// 아닌 경우 접혀있는 상태로 저장
    }
    

    if(hands[0].keypoints[17].y > hands[0].keypoints[18].y && hands[0].keypoints[18].y > hands[0].keypoints[19].y &&  hands[0].keypoints[19].y > hands[0].keypoints[20].y){
      // 소지의 세번째 마디보다 두번째 마디가, 두번째 마디보다 첫번째 가,  첫번째 마디보다 손가락끝이 위에 있으면 펴져있다고 판단
      cur_pinger_num++; // 펴진 손가락 갯수 + 1
      cur_pinger_state[4] = 1;// 펴진 상태로 저장
    }
    else{
      cur_pinger_state[4] = 0;// 아닌 경우 접혀있는 상태로 저장
    }

}




////// 모드를 변경할때 대기하는 시간을 처리합니다.
function  mode_change(target_state,_r,_g,_b,){
  
  mode_timer[target_state]++; //타이머를 증가시킵니다.
  
  if( mode_timer[target_state]>120){ //타이머가 120 이상 즉, 1초당 60프레임이므로, 2초가 지나면 실행
    
    //모드 변경을 위한 타이머들을 초기화 시킵니다.
    mode_timer[0] = 0; 
    mode_timer[1] = 0;
    mode_timer[2] = 0;

    
    mode_state = target_state;//모드의 상태를 인자로 입력받은 상태로 변경합니다.
  

    if(target_state == 0){ //만약 반응모드로 변경될 경우 이미지의 좌표를 지정
      reaction_menu_x = 640 - hands[0].keypoints[8].x // x좌표
      reaction_menu_y = hands[0].keypoints[8].y-70 // y좌표
    }

  }

    
  fill(_r,_g,_b,mode_timer[target_state]) // 투명도로 타이머의 진행정도를 나타냄
  circle(640 - hands[0].keypoints[8].x,hands[0].keypoints[8].y,mode_timer[target_state]/2 ); //원의 크기로 타이머의 진행 정도를 타나냄
  noFill()
  stroke(4,150);
  circle(640 - hands[0].keypoints[8].x,hands[0].keypoints[8].y,60); //타이머의 최종 도달 범위를 나타냄

}




/////펴져있는 손가락 갯수를 통해서 반응모드,그림모드로 전환합니다.
function mode_detect(){
  
  
  finger_detect(); //손가락 갯수를 계산합니다.
  
  if(cur_pinger_num == 0){ //주먹을 쥔 상태인경우 
   
      mode_change(0,0,0,255)  // 0번째 모드(반응 모드)로 120fram이후 변경합니다. 대기시간을 나타내는 원을 fill(0,0,255)로 나타냅니다. 
  }
  else if(cur_pinger_num == 1 && cur_pinger_state[1] == 1 ){

    mode_change(1,255,255,0) // 1번째 모드(그림모드)로 120fram이후 변경합니다. 대기시간을 나타내는 원을 fill(255,255,0)로 나타냅니다.
  }
  
}




/////제스처를 통해 그림을 그리거나,지웁니다.

function draw_mode(){
  
  finger_detect(); //손가락을 인식합니다.
  

  if( cur_pinger_num == 2 && cur_pinger_state[1] == 1 && cur_pinger_state[2] == 1 ){
    //두 개의 손가락이 펴져있고, 검지와 중지인 경우
    
    draw_pen(); //그림을 그리는 함수를 호출합니다.

  }
  else if( cur_pinger_num == 3 && cur_pinger_state[1] == 1 && cur_pinger_state[2] == 1 && cur_pinger_state[3] == 1  ){ //부분 지우개
    // 세 개의 손가락이 펴져있고 검지,중지,약지인경우
    draw_erase();
  }
  else if(cur_pinger_num == 0){ // 전체 지우기
    //주먹을 쥔 경우

    pen = []; // 저장된 좌표값들을 모두 초기화 시킵니다.
    pen_stroke_num = -1; // 획의 인덱스를 초기화 시킵니다.
    draw_state  = 1; //이후  그림을 그릴 때 새로운 획부터 시작하도록 합니다.
  }
  else if( cur_pinger_num == 5 ){ // 모드선택으로 돌아가기 
     //손이 다 펴진 경우
      
    mode_change(2,255,255,255) // 4 (= 기본 모드 = mode_detect )로 변경합니다. 대기시간을 나타내는 원을 fill(255,255,255)로 설정합니다.

    draw_state  = 1; //이후  그림을 그릴 때 새로운 획부터 시작하도록 합니다.
      
  }
  else{ //아무런 제스쳐도 아닌 경우
      
    push();
    fill(255,150); 
    circle(640-hands[0].keypoints[8].x,hands[0].keypoints[8].y,5);// 그림이 그려지는 검지의 좌표를 표시해줍니다.
    pop();
      
    draw_state  = 1; //이후  그림을 그릴 때 새로운 획부터 시작하도록 합니다.
  }
  

}





////////그림을 그려질 좌표를 저장하는 함수입니다.
function draw_pen(){

  if( draw_state == 1 || draw_state %30 == 0 ){ // draw_state가 변경되거나,30frame마다 획을 구분함
    pen_stroke_num++; // 다음 획으로 넘어감
    pen[pen_stroke_num] = []; //좌표들을 저장하기 위해 배열로 선언
  }

  draw_state++; //30frame마다 획을 변경하기 위해 1씩 증가 시킵니다.

  pen[pen_stroke_num].push(  {x:640-hands[0].keypoints[8].x , y:hands[0].keypoints[8].y} )  // show_draw에서 그려질 라인의 좌표를 저장합니다.
  
}
//그려진 그림을 삭제하는 함수입니다.
function draw_erase(){
  push();
  fill(0,0,0,50);
  circle(640 - hands[0].keypoints[12].x, hands[0].keypoints[12].y,30); //지우개의 영역을 표시합니다. 
  pop();

  for(let i = 0; i<pen.length ; i++){ // 그려진 그림의 획 만큼 반복합니다.
    for(let j = 0; j<pen[i].length; j++){ // 각 획에 저장된 좌표 갯수만큼 반복합니다.


      if(  ( pen[i][j].x -(640-hands[0].keypoints[12].x) )**2  + ( pen[i][j].y -(hands[0].keypoints[12].y) )**2 < 225    ){
        //현재 중지손가락 끝과 그림그려진 좌표사이의 거리가 15보다 작은경우
        //현재 좌표가 저장된 획을 전부 지웁니다.
        pen[i] = [];
      }
      
    }
  }
  draw_state  = 1; //그림을 그릴 경우 새로운 획을 시작하기 위해 1로 설정합니다. 

}




///// 검지손가락을 통해서 원하는 이미지를 선택합니다.
function reaction_mode(){
  push();
  fill(0,0,255,50);
  circle(640 - hands[0].keypoints[8].x,hands[0].keypoints[8].y,5); // 현재 검지의 좌표를 나타냅니다.
  pop();
  
  for(let i =0; i<4; i++){ // 4개의 이미지가 설정되었음으로 이미지의 수 만큼 반복합니다.

    //각 40*40의 크기의 이미지를를 50의 간격으로 보여줍니다.
    image(reaction_image[i],reaction_menu_x -70 + i*50 ,reaction_menu_y,40,40);
    
    if(  (reaction_menu_x -50 + i*50  - (640 - hands[0].keypoints[8].x))**2 + ( reaction_menu_y  -  hands[0].keypoints[8].y)**2    < 1600      ){
      //각 이미지와 검지의 좌표의 거리차가 40이내인경우
      reaction_state[i]++; // 해당하는 이미지의 상태값을 증가시킵니다.

      if( reaction_state[i] > 60){ // 이미지가 60프레임이상 선택되어있어다면

        mode_state = 2; // 다시 기본모드(mode_detect)로 설정합니다.
        
        // 이후 다시 반응 모드로 진입했을때를 위해 초기화 합니다.
        reaction_state[0] = 0; 
        reaction_state[1] = 0;
        reaction_state[2] = 0;
        reaction_state[3] = 0;

        reaction_timer[i] = 180 // 해당 이미지가 화면에 떠 있는 시간을 180frame으로 설정합니다.
      }
    }
  }


}



//draw에서 지속적으로 호출되며 pen변수에 저장된 좌표로 라인을 그려줍니다.
function show_draw(){
    
  push()

  stroke(255,255,0); //라인을 노란색으로 지정합니다.
  strokeWeight(3); // 라인의 굵기를 3으로 지정합니다.
  
  for(let i = 0; i<pen.length ; i++){ // 획의 갯수 만큼 반복합니다.
    for(let j = 1; j<pen[i].length; j++){ // 현재 획의 저장된 좌표의 갯수-1만큼 저장합니다.
      line( pen[i][j-1].x, pen[i][j-1].y,  pen[i][j].x,  pen[i][j].y  );//저장된 좌표를 그립니다.
    }
  }

  pop();
}

//draw에서 지속적으로 호출되며 reaction_timer변수에 저장된 frame의 수만큼 이미지를 보여줍니다.
function show_reaction(){

  push();

  for(let i = 0; i<4; i++){ // 4개의 이미지에 대해서
    if(reaction_timer[i]>0){ // reaction_timer변수에 시간이 있다면
      tint(255,reaction_timer[i]+40); // 투명도를 현재 남은 시간만큼으로 설정하여 점점사라지는 효과를 줍니다.
      image(reaction_image[i],reaction_menu_x,reaction_menu_y,120,120);//120*120의 이미지를 보여줍니다.
      reaction_timer[i]--; //   reaction_timer가 0이 될때까지 반복할 수 있도록 1 감소시킵니다.
    }
  }
  pop();

}
