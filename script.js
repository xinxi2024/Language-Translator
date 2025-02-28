document.getElementById('translateBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    
    if (!inputText) {
        alert('请输入要翻译的文字');
        return;
    }

    const translateBtn = document.getElementById('translateBtn');
    translateBtn.disabled = true;
    translateBtn.textContent = '翻译中...';

    try {
        // 使用 MyMemory Translation API
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            document.getElementById('outputText').value = data.responseData.translatedText;
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        alert('翻译失败，请稍后重试');
        console.error('Translation error:', error);
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = '翻译';
    }
}); 