function customUnderline() {
    const sources = document.querySelectorAll('[data-cu-src-id]');

    for (const src of sources) {
        const srcId = src.dataset.cuSrcId;
        let lines;

        if (src.querySelector('token-value') !== null) {
            lines = src.querySelector('token-value').innerHTML.split('<br>');
        } else {
            lines = src.innerHTML.split('<br>');
        }

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

        document.querySelector(`[data-cu-output-id="${srcId}"]`).innerHTML = output;;
    }
}

customUnderline();