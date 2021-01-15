function customUnderline() {
    const sources = document.querySelectorAll('[data-cu-src-id]');

    for (const src of sources) {
        const srcId = src.dataset.cuSrcId;
        let output = '';
        let linesNode;
        const data = [];
        const specialChars = {
            '&amp;': '&',
            '&nbsp;': ' '
        };

        const replaceSpecialChars = line => line.replace(/&amp;|&nbsp;/g, matched => specialChars[matched]);

        if (src.querySelector('token-value') !== null) {
            linesNode = src.querySelector('token-value')
        } else {
            linesNode = src;
        }

        const lines = linesNode.innerHTML.split('<br>').map(replaceSpecialChars);

        for (const [index, line] of lines.entries()) {
            const words = line
                .split(/[!&,.:;"'?]+/g)
                .filter(word => word !== '')
                .map(word => word.replace(/ /g, '&nbsp;'));
            const punct = line.match(/[!&,.:;"'?]+/g);

            data.push({ words, punct });
        }

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