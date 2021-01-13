function customUnderline() {
    const inputs = document.querySelectorAll('[data-cu-hook="input"]');
    const outputDiv = document.querySelector('[data-cu-hook="output"]');

    for (const input of inputs) {
        const lines = input.querySelector('token-value').innerHTML.split('<br>');

        const data = [];

        for (const [index, line] of lines.entries()) {
            const words = line.split(/[,.:]+/g).map(word => word.trim()).filter(word => word !== '');
            const punct = line.match(/[,.:]+/g);

            data.push({ words, punct });
        }

        let output = '';

        for (const line of data) {
            const renderSegments = (word, index) => {
                const punctuation = line.punct === null ? '' : line.punct[index] !== undefined ? `${line.punct[index]}` : '';
                const puncSpacing = punctuation === '' ? '' : index === line.words.length - 1 ? '' : ' ';

                return `<span>${word}</span>${punctuation}${puncSpacing}`;
            };

            const lineHTML = `<div class="line">${line.words.map(renderSegments).join('')}</div>`;

            output += lineHTML;
        }

        outputDiv.innerHTML = output;
    }
}

customUnderline();