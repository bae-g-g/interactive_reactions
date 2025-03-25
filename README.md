

# 설명영상

- 작동설명영상 https://youtu.be/E_FbxULDR0k
- p5.js 코드설명영상 https://youtu.be/MEHkzC8REEA


# 과제 내용
- 4개 이상의 반응 버튼 혹은 반응 동작이 있어야 합니다  

-  칠판처럼 글자/그림을 작성할 수 있어야 합니다

- 작성한 글자/그림을 지울 수 있어야 합니다

-  이를 동작 후 Virtual Camera를 통해 카메라 디바이스로 인지할 수 있도록 합니다

-  생성한 Virtual Camera를 Zoom에서 동작시켜 활용함을 보입니다

---

# 작동 설명

- 모든 제스처는 오른손 손바닥인 상황에서 정상작동합니다.
  - 화면에 손이 두 개이상인 경우 인식을 하지 않습니다.
  - 왼손인 경우 비정상적인 동작 가능성이 있습니다.
  - 손이 틀어지면(검지~소지를 펼쳤을 때 화면에 수직이 되는 손바닥 모양이 아니면) 비정상적인 동작 가능성이 있습니다.

---

## 기본모드
최초실행시 기본모드에서 시작합니다.

기본모드는 두 가지의 기능(제스처)가 있습니다.

| ![Component 12](https://github.com/user-attachments/assets/67379bd2-ce86-4d95-8833-6025789546d3)| ![Component 11](https://github.com/user-attachments/assets/39dab07a-efe3-4e20-a8a9-9dd3e9b8fb2c)|
|-----|-----|
| 반응모드로 전환 | 그림모드로 전환 |

<img width="500" alt="스크린샷 2025-03-25 오후 3 27 25" src="https://github.com/user-attachments/assets/c85b16a3-9307-4ebf-a664-83bf8fe4297d" />



**위와 같이 제스처를 취하고 원이 채워지는 동안(2초간) 대기해야 전환됩니다.**


---
## 반응모드

반응모드로 변경시 손 위쪽으로 4개의 반응 버튼이 생깁니다.


| ![danger1](https://github.com/user-attachments/assets/96357cb7-fdf1-40b7-b328-1dabb6f82bad)| ![fight1](https://github.com/user-attachments/assets/f63073df-f88b-4098-b59d-62b64a269e27)| ![help1](https://github.com/user-attachments/assets/cb74e1c7-4399-4ff8-ab72-4a10a3e632a0) | ![why1](https://github.com/user-attachments/assets/dc09fa6f-1cd6-49eb-899e-b453f700d6fa) |
|------|----------|-------|----------|
|  위험해요! |  토론을 시작해요!  |  도와주세요!  |  왜 그랬어요? |



.





<img width="497" alt="스크린샷 2025-03-25 오후 3 30 08" src="https://github.com/user-attachments/assets/5841d595-079b-4aa1-954b-a192d863e901" />

반응모드로 전환하여 4개의 버튼이 생성됨

 

<img width="502" alt="스크린샷 2025-03-25 오후 3 30 35" src="https://github.com/user-attachments/assets/9d67c6c4-1ba6-4d9e-8f62-4d89bf12aa20" />

검지를 버튼에 0.5초간 위치시키면 기본모드로 전환되며 해당이미지가 그려집니다.


---
## 그림모드

그림모드에는 4개의 제스처가 있습니다.

| ![m2](https://github.com/user-attachments/assets/4d2010fe-89a2-4fe3-935e-1b9fae59363e)|  ![m3](https://github.com/user-attachments/assets/ff8d5272-4595-4854-bc97-03d74394ef79)| ![Component 12 (1)](https://github.com/user-attachments/assets/4d527d2c-89e6-4011-806f-76f93a1776b1) | ![Vector 10](https://github.com/user-attachments/assets/ab65a0a2-6f41-435c-b11e-dc2c167a4afd)|
|---|----|----|----|
| 그림그리기 | 부분 지우기 | 전체 지우기 | 기본모드 전환 | 



<img width="454" alt="스크린샷 2025-03-25 오후 4 09 43" src="https://github.com/user-attachments/assets/2a33fe31-c82e-49bd-ab65-1399748595ad" />

그림그리기 제스처를 취해 그릴 수 있습니다.

<img width="454" alt="스크린샷 2025-03-25 오후 4 09 57" src="https://github.com/user-attachments/assets/299bf135-0317-4f39-b21c-268d77c72b1c" />

부분지우기 제스처를 취해 부분을 지울 수 있습니다.

<img width="460" alt="스크린샷 2025-03-25 오후 4 10 07" src="https://github.com/user-attachments/assets/4f18dbbe-3e8f-4838-8b42-150adbbe578a" />

전체지우기 제스처를 취해 전체를 지울 수 있습니다.

<img width="456" alt="스크린샷 2025-03-25 오후 4 10 18" src="https://github.com/user-attachments/assets/5aa32c07-6813-4f22-a82f-c3bce0c49000" />

기본모드 전환 제스처로 2초간 유지하여 그림모드를 끝냅니다.


---
# 가상카메라 설정,사용

- 가상카메라를 사용하기 위해서 OBS 프로그램을 사용하였습니다. https://obsproject.com/
  
<img width="1153" alt="스크린샷 2025-03-25 오후 4 27 52" src="https://github.com/user-attachments/assets/e4584a27-5bed-4a67-8a9e-641f16e471d7" />

- OBS프로그램을 실행시켜서 설정에서 p5.js 설정한 비디오 크기에 맞춰 640x480으로 설정합니다.
- 

<img width="1086" alt="스크린샷 2025-03-25 오후 4 31 20" src="https://github.com/user-attachments/assets/ff782a2f-46c7-4fce-8cb0-58fe16a889d0" />

- 소스목록에서 + 버튼 눌러 화면캡쳐를 선택합니다.
- 





<img width="1084" alt="스크린샷 2025-03-25 오후 4 35 35" src="https://github.com/user-attachments/assets/496b3888-eeba-4eaf-a687-f74b339476fb" />


- 이름설정에서 확인을 누른 후 방법을 윈도우캡쳐로, 윈도우는 현재p5.js가 실행되는 웹으로 설정합니다.
- 

<img width="1440" alt="스크린샷 2025-03-25 오후 4 36 50" src="https://github.com/user-attachments/assets/59b01510-fa72-4986-a5a1-d41e940f3338" />

- OBS프로그램 화면에 현재 p5.js페이지가 표시된다면  크기 조절하여 화면에 맞추고 가상카메라시작을 클릭하여 가상카메라를 활성화합니다.
- 

<img width="963" alt="스크린샷 2025-03-25 오후 4 37 57" src="https://github.com/user-attachments/assets/040e804c-4fcc-41c3-887e-885de5a6a391" />

- 줌에서 회의를 시작하여 카메라 설정에서 OBS virtual camera를 선택합니다.
- 

<img width="792" alt="스크린샷 2025-03-25 오후 4 46 38" src="https://github.com/user-attachments/assets/1b624e88-1779-4128-993b-8f297a5e4031" />

- 반전이 되어 출력되는 경우 설정에서 내 비디오 미러링을 선택합니다.
