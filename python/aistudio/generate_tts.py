# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import mimetypes
import os
import re
import struct
from google import genai
from google.genai import types


def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()
    print(f"File saved to to: {file_name}")


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-2.5-pro-preview-tts"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""🪞SNS 시대의 인간 소외와 유동성
― 지그문트 바우만의 『액체 근대』를 중심으로 ―
1. 유동하는 인간의 초상
지금 우리의 삶은 흐른다.
그것은 한 방향으로 흘러가며 진보한다기보다,
끊임없이 형태를 바꾸며 스스로를 증발시킨다.
지그문트 바우만은 『액체 근대』에서 이러한 시대를
“더 이상 고체적 구조가 우리를 지탱하지 못하는 세계”로 묘사했다.
근대의 견고한 사회 제도 — 가족, 노동, 신념, 국가 — 는 녹아내렸고
이제 인간은 그 잔해 위에서 자기 자신을 유동적으로 재구성하는 존재가 되었다.
우리는 더 이상 하나의 정체성으로 살지 않는다.
하루에도 여러 번, 다른 인격을 꺼내어 SNS의 프로필에 걸고,
다른 세계에서 다른 이름으로 대화한다.
그 속에서 “나는 누구인가?”라는 고전적 질문은
“오늘의 나는 어떤 이미지로 존재할 것인가?”로 바뀌었다.
바우만이 말한 ‘액체 근대의 인간’은 바로 이 질문 위에서 살아간다 —
끊임없이 변해야만 존재할 수 있는, 불안정한 자아의 순례자로서.
2. 견고함의 해체와 ‘속도의 윤리’
근대적 인간은 견고했다.
그는 직업을 가졌고, 신념을 가졌으며, 일생을 하나의 목적을 위해 바쳤다.
하지만 이제 속도가 윤리가 된 시대,
‘멈추지 않는 것’이 ‘유능한 것’으로 여겨지는 시대가 되었다.
SNS의 타임라인은 우리의 ‘현재’를 분 단위로 갱신하라 요구한다.
한 장의 게시물, 한 줄의 트윗, 한 번의 좋아요가
마치 존재의 증명처럼 작동한다.
그러나 속도는 관계를 희미하게 만든다.
사람은 더 많이 연결될수록 더 얕게 관계한다.
친밀함은 즉각적 교환의 대상이 되었고,
우정은 대화의 지속이 아니라
‘읽음’과 ‘답장’의 리듬으로 평가받는다.
바우만은 이것을 “느슨한 연결(loose connection)”이라 불렀다.
끈끈한 유대가 사라진 자리에는
끊어지기 쉬운 관계의 유동성만이 남는다.
3. 자유의 역설 — 선택의 강박
근대는 자유를 꿈꾸었다.
그러나 액체 근대의 자유는 선택의 강박으로 변했다.
“무엇을 소비할 것인가, 무엇을 사랑할 것인가,
어떤 이미지를 보여줄 것인가.”
선택의 폭이 넓어질수록 인간은 더 불안해진다.
선택하지 않는 자는 뒤처지고,
잘못 선택한 자는 스스로를 탓해야 한다.
바우만은 이것을 “책임의 개인화”라고 불렀다.
시스템의 실패는 개인의 실패로 치환되고,
삶의 불안은 구조가 아니라 개인의 결함으로 해석된다.
결국 현대인은 자유를 잃지 않기 위해 자신을 끊임없이 관리해야 하는 존재가 되었다.
헬스장에서의 몸 관리,
프로필의 이미지 관리,
감정의 표현조차도 전략적으로 제어된다.
그리하여 ‘진정성’은 상품이 되고,
‘솔직함’은 팔릴 수 있는 콘텐츠가 된다.
자유는 더 이상 해방이 아니라 끊임없는 수행의 명령이 된 것이다.
4. 연결되어 있으나 고립된 존재
바우만은 이렇게 말한다.
우리는 언제나 연결되어 있다.
그러나 그 연결은 고독의 부재이지, 소속의 실현이 아니다.
메시지를 주고받고, 피드를 확인하고,
밤늦게까지 화면 속에서 ‘타인의 삶’을 스크롤하며,
자신이 여전히 ‘속해 있다’는 착각에 빠진다.
그러나 화면을 닫는 순간,
우리는 여전히 혼자이며, 미결된 존재임을 깨닫는다.
이 고립은 단순한 인간관계의 문제를 넘어선다.
그것은 현대적 존재 방식의 본질이다.
끊임없이 접속하지만, 결코 닿지 못하는 존재.
이것이 바로 액체 근대의 인간이다.
5. 바우만 이후의 질문
지금, 우리는 다시 물어야 한다.
유동성은 진보인가, 혹은 퇴행인가?
유연함은 억압의 해체를 가져왔지만,
그 대가로 공동체의 해체와 불안을 낳았다.
모든 것이 가능해졌지만,
그만큼 아무것도 지속되지 못한다.
그리하여 현대인은 ‘영원한 시작’ 속에 갇혀 있다.
새로운 프로젝트, 새로운 연애, 새로운 자아의 갱신 —
“외로움으로부터 도망치는 바로 그 길 위에서,
너는 고독을 느낄 기회를 잃어버린다.”
모든 것은 시작되지만,
끝나지 않는다.
바우만의 사유는 우리에게 이렇게 속삭인다.
6. 결론 ― 액체적 인간의 구원은 어디에 있는가
바우만의 진단은 절망적이지만,
그의 철학은 체념이 아니다.
그는 도덕의 가능성, 책임의 복원을 강조했다.
액체 근대에서도 여전히 ‘타인의 고통에 응답할 수 있는 인간’을 상정했기 때문이다.
고체 근대의 도덕이 제도 속에 있었다면,
액체 근대의 도덕은 개인의 선택적 윤리 속에서 태어난다.
즉, 유동성의 시대에도 도덕적 상상력만큼은
견고하게 지켜야 한다는 것이다.
SNS 속에서 타인의 슬픔을 본다.
‘좋아요’ 하나로 마음을 표현하지만,
진정한 연대는 그 클릭 너머에 있다.
바우만은 이 작은 ‘느낌표’에서
인류의 미래를 본 듯하다.
액체 근대의 인간이 구원받는 길은,
다시금 타인을 향해 느리게 손을 내미는 일,
그 단순한 연대의 회복에서 시작될 것이다.
🪞요약
액체 근대는 구조가 해체된 세계에서 유동적 자아가 살아가는 시대.
자유는 해방이 아닌 불안의 근원으로 변했다.
관계는 느슨하고, 시간은 즉각적이며, 도덕은 개인화되었다.
구원은 느림과 사유, 그리고 타인에 대한 윤리적 상상력의 회복에 있다.
“흐름 속에서 살아가되,
그 흐름에 잠기지 말라.”
유동적 세계를 비판한다는 것은
다시 견고함으로 돌아가자는 뜻이 아니다.
오히려 흐름 속에서도 인간적인 깊이를 지키는 법,
빠름 속에서도 사유의 느림을 회복하는 법을 찾자는 요청이다."""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        response_modalities=[
            "audio",
        ],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                    voice_name="Zephyr"
                )
            )
        ),
    )

    file_index = 0
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if (
            chunk.candidates is None
            or chunk.candidates[0].content is None
            or chunk.candidates[0].content.parts is None
        ):
            continue
        if chunk.candidates[0].content.parts[0].inline_data and chunk.candidates[0].content.parts[0].inline_data.data:
            file_name = f"ENTER_FILE_NAME_{file_index}"
            file_index += 1
            inline_data = chunk.candidates[0].content.parts[0].inline_data
            data_buffer = inline_data.data
            file_extension = mimetypes.guess_extension(inline_data.mime_type)
            if file_extension is None:
                file_extension = ".wav"
                data_buffer = convert_to_wav(inline_data.data, inline_data.mime_type)
            save_binary_file(f"{file_name}{file_extension}", data_buffer)
        else:
            print(chunk.text)

def convert_to_wav(audio_data: bytes, mime_type: str) -> bytes:
    """Generates a WAV file header for the given audio data and parameters.

    Args:
        audio_data: The raw audio data as a bytes object.
        mime_type: Mime type of the audio data.

    Returns:
        A bytes object representing the WAV file header.
    """
    parameters = parse_audio_mime_type(mime_type)
    bits_per_sample = parameters["bits_per_sample"]
    sample_rate = parameters["rate"]
    num_channels = 1
    data_size = len(audio_data)
    bytes_per_sample = bits_per_sample // 8
    block_align = num_channels * bytes_per_sample
    byte_rate = sample_rate * block_align
    chunk_size = 36 + data_size  # 36 bytes for header fields before data chunk size

    # http://soundfile.sapp.org/doc/WaveFormat/

    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",          # ChunkID
        chunk_size,       # ChunkSize (total file size - 8 bytes)
        b"WAVE",          # Format
        b"fmt ",          # Subchunk1ID
        16,               # Subchunk1Size (16 for PCM)
        1,                # AudioFormat (1 for PCM)
        num_channels,     # NumChannels
        sample_rate,      # SampleRate
        byte_rate,        # ByteRate
        block_align,      # BlockAlign
        bits_per_sample,  # BitsPerSample
        b"data",          # Subchunk2ID
        data_size         # Subchunk2Size (size of audio data)
    )
    return header + audio_data

def parse_audio_mime_type(mime_type: str) -> dict[str, int | None]:
    """Parses bits per sample and rate from an audio MIME type string.

    Assumes bits per sample is encoded like "L16" and rate as "rate=xxxxx".

    Args:
        mime_type: The audio MIME type string (e.g., "audio/L16;rate=24000").

    Returns:
        A dictionary with "bits_per_sample" and "rate" keys. Values will be
        integers if found, otherwise None.
    """
    bits_per_sample = 16
    rate = 24000

    # Extract rate from parameters
    parts = mime_type.split(";")
    for param in parts: # Skip the main type part
        param = param.strip()
        if param.lower().startswith("rate="):
            try:
                rate_str = param.split("=", 1)[1]
                rate = int(rate_str)
            except (ValueError, IndexError):
                # Handle cases like "rate=" with no value or non-integer value
                pass # Keep rate as default
        elif param.startswith("audio/L"):
            try:
                bits_per_sample = int(param.split("L", 1)[1])
            except (ValueError, IndexError):
                pass # Keep bits_per_sample as default if conversion fails

    return {"bits_per_sample": bits_per_sample, "rate": rate}


if __name__ == "__main__":
    generate()

