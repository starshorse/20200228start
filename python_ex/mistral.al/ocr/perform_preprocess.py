import os
import cv2
import shutil
import numpy as np
from PIL import Image, ImageEnhance
import re
import hashlib
from datetime import datetime

# 입력·출력 폴더 설정
INPUT_DIR = "input_folder"
OUTPUT_DIR = "images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 파일명 정규화 함수 추가
def sanitize_filename(filename):
    """
    한글 파일명을 안전한 영문 파일명으로 변환
    """
    # 파일명과 확장자 분리
    name, ext = os.path.splitext(filename)
    
    # 한글 및 특수문자가 포함된 경우 해시값으로 변환
    if re.search(r'[^\x00-\x7F]', name) or re.search(r'[<>:"/\\|?*]', name):
        # 원본 파일명의 해시값 생성 (처음 8자리만 사용)
        hash_object = hashlib.md5(name.encode('utf-8'))
        hash_hex = hash_object.hexdigest()[:8]
        
        # 타임스탬프 추가로 고유성 보장
        timestamp = datetime.now().strftime("%H%M%S")
        safe_name = f"img_{hash_hex}_{timestamp}"
        
        print(f"파일명 변환: {name} → {safe_name}")
        return f"{safe_name}{ext}"
    else:
        return filename

def safe_cv2_write(image, filepath):
    """
    OpenCV 이미지를 안전하게 저장 (한글 경로 지원)
    """
    try:
        # OpenCV로 직접 저장 시도
        success = cv2.imwrite(filepath, image)
        if not success:
            raise Exception("cv2.imwrite 실패")
        return True
    except:
        # OpenCV 저장 실패 시 numpy 배열을 통한 우회 저장
        try:
            # 임시 파일명으로 저장 후 이름 변경
            temp_path = filepath.replace(os.path.basename(filepath), 
                                       f"temp_{int(datetime.now().timestamp())}.jpg")
            
            # PIL을 통한 저장
            pil_image = Image.fromarray(image)
            pil_image.save(temp_path)
            
            # 최종 경로로 이동
            shutil.move(temp_path, filepath)
            return True
        except Exception as e:
            print(f"파일 저장 실패: {filepath}, 오류: {e}")
            return False

# 기존 전처리 함수들 (변경 없음)
def optimize_resolution(pil_img, target_dpi=300):
    """
    PIL 이미지의 해상도를 target_dpi로 조정
    """
    current_width, current_height = pil_img.size
    scale = target_dpi / 96
    new_size = (int(current_width * scale), int(current_height * scale))
    return pil_img.resize(new_size, Image.LANCZOS)

def correct_skew(cv_img):
    """
    HoughLinesP를 이용한 기울기 검출 및 보정
    """
    gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    lines = cv2.HoughLinesP(binary, 1, np.pi/180, threshold=100,
                            minLineLength=100, maxLineGap=10)
    if lines is None:
        return cv_img
    angles = [np.arctan2(y2-y1, x2-x1)*180/np.pi for x1,y1,x2,y2 in lines[:,0]]
    angle = np.median(angles)
    h, w = cv_img.shape[:2]
    M = cv2.getRotationMatrix2D((w/2,h/2), angle, 1.0)
    return cv2.warpAffine(cv_img, M, (w,h), flags=cv2.INTER_CUBIC, 
                          borderMode=cv2.BORDER_REPLICATE)

def remove_noise(gray_img):
    """
    양방향 필터로 경계 보존형 노이즈 제거
    """
    return cv2.bilateralFilter(gray_img, 9, 75, 75)

def enhance_contrast(gray_img):
    """
    CLAHE(Contrast Limited Adaptive Histogram Equalization) 적용
    """
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    return clahe.apply(gray_img)

def apply_binarization(gray_img):
    """
    Otsu 이진화로 배경·문자 대비 강화
    """
    _, binary = cv2.threshold(gray_img, 0, 255,
                              cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return binary

# 수정된 메인 처리 함수
def preprocess_and_move(file_path, output_dir=OUTPUT_DIR):
    """
    단일 이미지 전처리 수행 후 output_dir로 이동 (한글 파일명 지원)
    """
    try:
        # 1) PIL 로드 및 해상도 최적화
        pil = Image.open(file_path)
        pil = optimize_resolution(pil)
        
        # 2) OpenCV 포맷 변환
        cv_img = cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)
        
        # 3) 기울기 보정
        cv_img = correct_skew(cv_img)
        
        # 4) 그레이스케일 변환
        gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        
        # 5) 노이즈 제거
        denoised = remove_noise(gray)
        
        # 6) 대비 개선
        enhanced = enhance_contrast(denoised)
        
        # 7) 이진화
        result = apply_binarization(enhanced)
        
        # 8) 안전한 파일명 생성 및 저장
        base = os.path.basename(file_path)
        name, ext = os.path.splitext(base)
        
        # 한글 파일명 처리
        safe_filename = sanitize_filename(f"{name}_preprocessed{ext}")
        out_path = os.path.join(output_dir, safe_filename)
        
        # 안전한 저장
        if safe_cv2_write(result, out_path):
            print(f"[Done] {base} → {safe_filename}")
            
            # 원본-변환된 파일명 매핑 정보 저장 (선택적)
            mapping_file = os.path.join(output_dir, "filename_mapping.txt")
            with open(mapping_file, "a", encoding="utf-8") as f:
                f.write(f"{base} → {safe_filename}\n")
        else:
            print(f"[Error] 파일 저장 실패: {base}")
            
    except Exception as e:
        print(f"[Error] 처리 실패 - {os.path.basename(file_path)}: {str(e)}")

# 수정된 배치 처리 함수
def batch_process(input_dir=INPUT_DIR):
    """
    지정 폴더 내 이미지 파일을 전처리 후 images 폴더로 이동 (한글 지원)
    """
    if not os.path.exists(input_dir):
        print(f"[Error] 입력 폴더가 존재하지 않습니다: {input_dir}")
        return
    
    # 매핑 파일 초기화
    mapping_file = os.path.join(OUTPUT_DIR, "filename_mapping.txt")
    if os.path.exists(mapping_file):
        os.remove(mapping_file)
    
    processed_count = 0
    for fname in os.listdir(input_dir):
        if not fname.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        
        src = os.path.join(input_dir, fname)
        preprocess_and_move(src)
        processed_count += 1
    
    print(f"총 {processed_count}개 파일 처리 완료")
    
    # 매핑 정보 출력
    if os.path.exists(mapping_file):
        print(f"파일명 매핑 정보: {mapping_file}")

if __name__ == "__main__":
    batch_process()