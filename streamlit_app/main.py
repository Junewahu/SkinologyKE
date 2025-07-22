import streamlit as st
import requests

st.title('SkinologyKE AI Skin Diagnosis')
st.write('Upload a clear photo and select your symptoms for instant analysis.')

uploaded_file = st.file_uploader('Upload skin photo', type=['jpg', 'jpeg', 'png'])
symptom_options = [
    'Itching or burning',
    'Redness or inflammation',
    'Dry or flaky skin',
    'Dark spots or discoloration',
    'Raised bumps or lesions',
    'Pain or tenderness',
    'Scaling or peeling',
    'Swelling'
]
symptoms = st.multiselect('Select symptoms', symptom_options)

if st.button('Analyze Skin Condition'):
    if uploaded_file and symptoms:
        files = {'image': uploaded_file}
        data = {'symptoms': symptoms}
        api_url = 'http://localhost:5000/diagnose'
        response = requests.post(api_url, files=files, data=data)
        if response.status_code == 200:
            result = response.json()
            st.success(f"Diagnosis: {result['diagnosis']} ({result['confidence']:.2f}%)")
            st.info(f"Suggested Routine: {result['routine']}")
        else:
            st.error('API error: ' + response.text)
    else:
        st.error('Please upload an image and select symptoms.')
